// ============================================================
// SATQUERY AI — ROADMAP PAGE
// Rule 32: Phase 1 Current vs. Phases 2-7 Planned
// Future features remain clearly marked as Planned.
// ============================================================

export function renderRoadmap() {
  return `
    <div class="roadmap-page-wrapper">
      
      <!-- BREADCRUMBS & HEADER -->
      <div class="page-header-row">
        <div>
          <nav class="breadcrumbs" aria-label="Breadcrumb">
            <a href="/" data-nav="/">Home</a>
            <span>&gt;</span>
            <span class="current">Roadmap</span>
          </nav>
          <h1 class="page-title">Engineering Roadmap</h1>
          <p class="page-subtitle">
            Progressive release roadmap for the SatQuery multimodal Earth Observation intelligence platform.
          </p>
        </div>

        <div class="header-status-card">
          <div class="status-badge">
            <span class="status-dot"></span>
            <span>Phase 1 Active</span>
          </div>
          <div class="status-sub">Single-Image VQA Deployed</div>
          <div class="status-time">Production Baseline</div>
        </div>
      </div>

      <!-- ROADMAP PHASES -->
      <div class="roadmap-timeline">
        
        <!-- PHASE 1: CURRENT ✓ -->
        <div class="roadmap-card current">
          <div class="roadmap-phase-header">
            <div class="roadmap-phase-title" style="display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--green-status);">&#10003;</span>
              <span>Phase 1 — Current Operational Baseline</span>
            </div>
            <span class="roadmap-badge badge-current">Current &bull; Live</span>
          </div>
          <div style="font-size: 14px; font-weight: 600; color: var(--navy-primary); margin-top: 4px;">
            Single-Image Remote-Sensing VQA
          </div>
          <ul style="list-style: none; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 8px; margin-top: 10px; font-size: 13px; color: var(--text-secondary);">
            <li>&bull; GeoTIFF / TIFF Image Upload (Max 50 MB)</li>
            <li>&bull; High-Resolution Image Preview</li>
            <li>&bull; User-Defined Natural-Language Query</li>
            <li>&bull; InternVL3-1B Vision Backbone</li>
            <li>&bull; VQA-10K LoRA Parameter-Efficient Adapter</li>
            <li>&bull; AI Answer Synthesis</li>
            <li>&bull; Calibrated Confidence (Platt Logistic Scaling)</li>
            <li>&bull; PDF &amp; HTML Analysis Report Generation</li>
            <li>&bull; Training &amp; Evaluation Evidence Dossiers</li>
          </ul>
        </div>

        <!-- PHASE 2: PLANNED -->
        <div class="roadmap-card">
          <div class="roadmap-phase-header">
            <div class="roadmap-phase-title">Phase 2 — Captioning + Grounding</div>
            <span class="roadmap-badge badge-planned">Planned</span>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            Dense satellite scene captioning and bounding-box spatial grounding of detected objects and land cover features directly on the tile.
          </p>
        </div>

        <!-- PHASE 3: PLANNED -->
        <div class="roadmap-card">
          <div class="roadmap-phase-header">
            <div class="roadmap-phase-title">Phase 3 — Bi-Temporal Analysis</div>
            <span class="roadmap-badge badge-planned">Planned</span>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            Comparative dual-tile temporal difference detection (T1 vs. T2) to quantify urban expansion, flood damage, or deforestation over time.
          </p>
        </div>

        <!-- PHASE 4: PLANNED -->
        <div class="roadmap-card">
          <div class="roadmap-phase-header">
            <div class="roadmap-phase-title">Phase 4 — Optical + SAR Fusion</div>
            <span class="roadmap-badge badge-planned">Planned</span>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            Cross-modal fusion of multispectral optical imagery with Synthetic Aperture Radar (SAR) data for all-weather, day-and-night observation.
          </p>
        </div>

        <!-- PHASE 5: PLANNED -->
        <div class="roadmap-card">
          <div class="roadmap-phase-header">
            <div class="roadmap-phase-title">Phase 5 — Agentic Orchestration</div>
            <span class="roadmap-badge badge-planned">Planned</span>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            Multi-agent autonomous coordination linking VQA models, Python GIS tools (GDAL/Rasterio), and external vector data repositories.
          </p>
        </div>

        <!-- PHASE 6: PLANNED -->
        <div class="roadmap-card">
          <div class="roadmap-phase-header">
            <div class="roadmap-phase-title">Phase 6 — Geospatial Intelligence (GeoAI)</div>
            <span class="roadmap-badge badge-planned">Planned</span>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            Coordinate-referenced geocoding, automated bounding polygon extraction, and integration with dynamic OpenStreetMap layers.
          </p>
        </div>

        <!-- PHASE 7: PLANNED -->
        <div class="roadmap-card">
          <div class="roadmap-phase-header">
            <div class="roadmap-phase-title">Phase 7 — Complete SatQuery Ecosystem</div>
            <span class="roadmap-badge badge-planned">Long-Term Vision</span>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            End-to-end planetary-scale conversational Earth observation platform serving enterprise geospatial analysts, NGOs, and civil defense agencies.
          </p>
        </div>

      </div>

    </div>
  `;
}
