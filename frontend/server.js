const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = parseInt(process.env.PORT || '3000', 10);
const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000';
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
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

const backend = new URL(BACKEND_URL);

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (pathname.startsWith('/api/') || pathname === '/health') {
    const proxyHeaders = { ...req.headers };
    delete proxyHeaders.host;

    const transport = backend.protocol === 'https:' ? https : http;

    const proxyReq = transport.request(
      {
        protocol: backend.protocol,
        hostname: backend.hostname,
        port: backend.port || (backend.protocol === 'https:' ? 443 : 80),
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
      console.warn(`[Proxy Warning] Backend unavailable at ${BACKEND_URL}:`, err.message);

      if (!res.headersSent) {
        res.writeHead(503, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'SatQuery backend service is not reachable.',
          detail: err.message,
        }));
      }
    });

    req.on('error', (err) => {
      console.warn('[Proxy Warning] Request stream error:', err.message);
      proxyReq.destroy();
    });

    req.pipe(proxyReq);
    return;
  }

  let filePath = path.join(PUBLIC_DIR, pathname);

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
      stream.on('error', () => {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Error streaming file');
        }
      });
      stream.pipe(res);
      return;
    }

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
  console.log(`✓ SatQuery frontend listening on port ${PORT}`);
  console.log(`✓ Backend API: ${BACKEND_URL}`);
});
