// ============================================================
// SATQUERY AI — LANDING / HERO PAGE
// Matches reference screenshot media_1789388364356.jpg
// ============================================================

export function renderHome() {
  return `
    <div class="hero-section">
      
      <!-- HERO LEFT: Headline, Description & Scenarios -->
      <div class="hero-left">
        <div class="hero-eyebrow">
          OBSERVE &nbsp;|&nbsp; UNDERSTAND &nbsp;|&nbsp; ACT
        </div>

        <h1 class="hero-headline">
          A Clearer View<br>
          for a <em>Better Tomorrow.</em>
        </h1>

        <p class="hero-description">
          SatQuery transforms natural-language queries into evidence-based insights 
          from satellite imagery using remote-sensing models, GeoAI tools, and multi-agent coordination.
        </p>

        <div class="hero-cta-row">
          <a href="/analysis" class="btn-primary-hero" data-nav="/analysis">
            Launch SatQuery &rarr;
          </a>
        </div>

        <div class="hero-tagline-footer">
          POWERED BY SPACE. DRIVEN BY PEOPLE.
        </div>
      </div>

      <!-- HERO RIGHT: Earth + Satellite Visual with Subtle Rotation Effect -->
      <div class="hero-visual-wrapper">
        <!-- Layer 1: Ambient Atmosphere Glow -->
        <div class="hero-ambient-glow"></div>

        <!-- Layer 2: Masked Earth Artwork (Feathers seamlessly into background grid) -->
        <div class="hero-earth-container earth-animated">
          <img 
            src="/assets/images/hero-earth.jpg" 
            alt="SatQuery Earth Observation and Satellite Analysis" 
            class="hero-earth-img"
            loading="eager"
          />

          <!-- Layer 3: Subtle GPU-friendly Animated Orbital SVG Ring -->
          <svg class="orbital-ring-overlay" viewBox="0 0 500 500" preserveAspectRatio="none">
            <ellipse cx="245" cy="255" rx="215" ry="175" transform="rotate(-24 245 255)" class="orbital-path" />
          </svg>

          <!-- Layer 4: Floating satellite telemetry pulse -->
          <div class="satellite-beacon" title="Orbital Sat-1 Telemetry Active"></div>
        </div>
      </div>

    </div>

    <!-- CAPABILITIES SECTION: Clean scientific cards matching design -->
    <section class="capabilities-section">
      <div class="section-eyebrow">CORE ARCHITECTURE & CAPABILITIES</div>
      <h2 class="section-heading">Operational Earth Observation Intelligence</h2>

      <div class="capabilities-grid">
        
        <div class="capability-card">
          <div class="capability-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m10 15 5-3-5-3v6Z"/></svg>
          </div>
          <h3 class="capability-title">Single-Image Remote-Sensing VQA</h3>
          <p class="capability-desc">
            Direct visual question answering over complex satellite imagery without manual prompt templates.
          </p>
        </div>

        <div class="capability-card">
          <div class="capability-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
          <h3 class="capability-title">GeoTIFF, TIFF &amp; PNG Ingestion (Max 50 MB)</h3>
          <p class="capability-desc">
            Native support for GeoTIFF, TIFF, and PNG rasters up to 50 MB with streaming validation.
          </p>
        </div>

        <div class="capability-card">
          <div class="capability-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <h3 class="capability-title">InternVL3-1B Backbone + VQA-10K LoRA</h3>
          <p class="capability-desc">
            Fine-tuned parameter-efficient adapter (192 layers) trained over 10,000 remote sensing image-question pairs.
          </p>
        </div>

        <div class="capability-card">
          <div class="capability-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h3 class="capability-title">User-Defined Natural-Language Queries</h3>
          <p class="capability-desc">
            Strictly user-driven query console with no artificial question suggestions or pre-scripted chips.
          </p>
        </div>

        <div class="capability-card">
          <div class="capability-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h3 class="capability-title">Calibrated Confidence Scoring</h3>
          <p class="capability-desc">
            Platt-scaled empirical confidence mapping consistent multi-sample predictions to true posterior answer probabilities.
          </p>
        </div>

        <div class="capability-card">
          <div class="capability-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <h3 class="capability-title">Model Training &amp; Evaluation Evidence</h3>
          <p class="capability-desc">
            Complete empirical validation records, training logs, loss curves (0.7384), and multi-benchmark test results.
          </p>
        </div>

      </div>
    </section>
  `;
}
