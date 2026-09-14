// ============================================================
// SATQUERY AI - FRONTEND APPLICATION SERVER
// Serves Static Files, Handles SPA Page Routing & API Proxy
// Port: 3000
// ============================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = parseInt(process.env.PORT || '3000', 10);
const BACKEND_HOST = process.env.BACKEND_HOST || '127.0.0.1';
const BACKEND_PORT = parseInt(process.env.BACKEND_PORT || '8000', 10);
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.tif': 'image/tiff',
  '.tiff': 'image/tiff',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=UTF-8',
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // Set permissive CORS headers for development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ----------------------------------------------------------
  // API PROXY -> Backend (http://127.0.0.1:8000)
  // Supports streaming up to 50 MB uploads
  // ----------------------------------------------------------
  if (pathname.startsWith('/api/') || pathname === '/health') {
    const proxyHeaders = { ...req.headers };
    proxyHeaders.host = `${BACKEND_HOST}:${BACKEND_PORT}`;

    const proxyReq = http.request(
      {
        host: BACKEND_HOST,
        port: BACKEND_PORT,
        path: req.url,
        method: req.method,
        headers: proxyHeaders,
      },
      (proxyRes) => {
        if (!res.headersSent) {
          res.writeHead(proxyRes.statusCode, proxyRes.headers);
        }
        proxyRes.pipe(res);
      }
    );

    proxyReq.on('error', (err) => {
      console.warn(`[Proxy Warning] Backend offline at ${BACKEND_HOST}:${BACKEND_PORT}:`, err.message);
      if (!res.headersSent) {
        res.writeHead(503, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            success: false,
            error: 'SatQuery backend service is not reachable on port 8000.',
            detail: err.message,
            suggestion: 'Start the backend using: cd Backend && python3 main.py',
          })
        );
      }
    });

    req.on('error', (err) => {
      console.warn('[Proxy Warning] Request stream error:', err.message);
      proxyReq.destroy();
    });

    req.pipe(proxyReq);
    return;
  }

  // ----------------------------------------------------------
  // STATIC ASSET SERVING
  // ----------------------------------------------------------
  let filePath = path.join(PUBLIC_DIR, pathname);

  // Prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600',
      });
      const stream = fs.createReadStream(filePath);
      stream.on('error', (streamErr) => {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Error streaming file');
        }
      });
      stream.pipe(res);
      return;
    }

    // --------------------------------------------------------
    // SPA ROUTING FALLBACK -> /public/index.html
    // For /, /analysis, /documentation, /team, /roadmap, /evidence
    // --------------------------------------------------------
    const indexPath = path.join(PUBLIC_DIR, 'index.html');
    fs.readFile(indexPath, (readErr, content) => {
      if (readErr) {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Internal Server Error: index.html not found');
        }
        return;
      }
      if (!res.headersSent) {
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=UTF-8',
          'Cache-Control': 'no-cache',
        });
        res.end(content);
      }
    });
  });
});

process.on('uncaughtException', (err) => {
  console.error('[Server Uncaught Exception]', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('[Server Unhandled Rejection]', reason);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`============================================================`);
  console.log(`✓ SatQuery AI Frontend running at: http://localhost:${PORT}`);
  console.log(`✓ Proxying API requests to: http://${BACKEND_HOST}:${BACKEND_PORT}`);
  console.log(`============================================================`);
});
