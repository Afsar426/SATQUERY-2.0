// ============================================================
// SATQUERY AI — TEAM PAGE
// Rule 31: Shows ONLY the 6 team members with LinkedIn links.
// No roles, bios, descriptions, photos, or extra information.
// Links open in a new tab.
// ============================================================

export function renderTeam() {
  const teamMembers = [
    { name: "Lalita Jhapate", url: "https://www.linkedin.com/in/lalita-jhapate/" },
    { name: "Afsar Azam", url: "https://www.linkedin.com/in/afsar-azam/" },
    { name: "Abhi Jain", url: "https://www.linkedin.com/in/abhi-jain/" },
    { name: "Ayush Singh", url: "https://www.linkedin.com/in/ayush-singh/" },
    { name: "Shivam Kumar", url: "https://www.linkedin.com/in/shivam-kumar/" },
    { name: "Abhinav Saini", url: "https://www.linkedin.com/in/abhinav-saini/" },
  ];

  return `
    <div class="team-page-wrapper">
      
      <!-- BREADCRUMBS & HEADER -->
      <div class="page-header-row">
        <div>
          <nav class="breadcrumbs" aria-label="Breadcrumb">
            <a href="/" data-nav="/">Home</a>
            <span>&gt;</span>
            <span class="current">Team</span>
          </nav>
          <h1 class="page-title">SatQuery Team</h1>
          <p class="page-subtitle">
            Core contributors to the SatQuery Earth Observation Intelligence research and engineering project.
          </p>
        </div>

        <div class="header-status-card">
          <div class="status-badge">
            <span class="status-dot"></span>
            <span>Contributors</span>
          </div>
          <div class="status-sub">6 Core Engineers</div>
          <div class="status-time">Research Group</div>
        </div>
      </div>

      <!-- TEAM LIST: Rule 31 strictly enforced -->
      <div class="content-card-section">
        <div class="team-grid">
          ${teamMembers.map(member => `
            <div class="team-card">
              <span class="team-name">${member.name}</span>
              <a 
                href="${member.url}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="team-linkedin-link"
                title="Open LinkedIn profile for ${member.name}"
              >
                <!-- LinkedIn Icon -->
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}
