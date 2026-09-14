// ============================================================
// SATQUERY AI — SPA APPLICATION ROUTER & STATE CONTROLLER
// Page-Based Navigation (Rule 48)
// Zero external libraries
// ============================================================

import { renderHome } from './pages/home.js';
import { renderAnalysis, initAnalysisEvents } from './pages/analysis.js';
import { renderDocumentation } from './pages/documentation.js';
import { renderTeam } from './pages/team.js';
import { renderRoadmap } from './pages/roadmap.js';
import { renderEvidence, initEvidenceEvents } from './pages/evidence.js';

const routes = {
  '/': { render: renderHome, title: 'SatQuery — Earth Observation Intelligence' },
  '/analysis': { render: renderAnalysis, init: initAnalysisEvents, title: 'Analyze Geographical Imagery — SatQuery' },
  '/documentation': { render: renderDocumentation, title: 'Documentation & Use Cases — SatQuery' },
  '/team': { render: renderTeam, title: 'SatQuery Team — Core Contributors' },
  '/roadmap': { render: renderRoadmap, title: 'Engineering Roadmap — SatQuery' },
  '/evidence': { render: renderEvidence, init: initEvidenceEvents, title: 'Model Training & Evidence — SatQuery' },
};

function normalizePath(pathname) {
  if (!pathname || pathname === '') return '/';
  // Strip trailing slash except root
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function navigateTo(urlStr) {
  const parsed = new URL(urlStr, window.location.origin);
  const targetPath = normalizePath(parsed.pathname);

  if (window.location.pathname !== targetPath || window.location.search !== parsed.search) {
    window.history.pushState({}, '', parsed.pathname + parsed.search);
  }
  renderCurrentRoute();
}

// Make navigateTo globally accessible
window.navigateTo = navigateTo;

function renderCurrentRoute() {
  const currentPath = normalizePath(window.location.pathname);
  const route = routes[currentPath] || routes['/'];

  // Update Page Document Title
  document.title = route.title || 'SatQuery — Earth Observation Intelligence';

  // Mount View
  const appRoot = document.getElementById('app-root');
  if (appRoot) {
    appRoot.innerHTML = route.render();
    if (typeof route.init === 'function') {
      route.init();
    }
  }

  // Update Active Navigation Item
  updateActiveNavigation(currentPath);

  // Update Header Action Button
  updateHeaderAction(currentPath);

  // Scroll to top
  window.scrollTo(0, 0);
}

function updateActiveNavigation(currentPath) {
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  navLinks.forEach((link) => {
    const linkPath = normalizePath(link.getAttribute('data-nav') || link.getAttribute('href'));
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function updateHeaderAction(currentPath) {
  const container = document.getElementById('nav-action-container');
  if (!container) return;

  if (currentPath === '/analysis') {
    container.innerHTML = `
      <div class="badge-workspace-live">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 12h3l3-8 4 16 3-8h3"></path>
        </svg>
        <span>Workspace Live</span>
      </div>
    `;
  } else {
    container.innerHTML = `
      <a href="/analysis" class="btn-launch-nav" data-nav="/analysis">
        Launch Analysis &rarr;
      </a>
    `;
  }
}

// Global Toast Alert Helper
export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-alert ${type === 'error' ? 'toast-error' : ''}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

window.showToast = showToast;

// Global Event Delegation for Links with data-nav or matching internal routes
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;

  const href = link.getAttribute('href');
  const target = link.getAttribute('target');

  // Allow external links or blank targets
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || target === '_blank') {
    return;
  }

  // Handle local SPA routes
  if (href.startsWith('/')) {
    e.preventDefault();
    navigateTo(href);
  }
});

// Popstate event for browser back/forward buttons
window.addEventListener('popstate', () => {
  renderCurrentRoute();
});

// Initial boot
window.addEventListener('DOMContentLoaded', () => {
  renderCurrentRoute();
});

// Run once immediately in case DOM is already ready
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  renderCurrentRoute();
}
