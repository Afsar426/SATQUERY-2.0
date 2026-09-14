// ============================================================
// SATQUERY AI — DOCUMENTATION & USE CASES PAGE
// Rule 29: Merged Use Cases + How It Works + Technical Docs
// Strictly NO example questions
// ============================================================

export function renderDocumentation() {
  return `
    <div class="doc-page-wrapper">
      
      <!-- BREADCRUMBS & HEADER -->
      <div class="page-header-row">
        <div>
          <nav class="breadcrumbs" aria-label="Breadcrumb">
            <a href="/" data-nav="/">Home</a>
            <span>&gt;</span>
            <span class="current">Documentation &amp; Use Cases</span>
          </nav>
          <h1 class="page-title">Documentation &amp; Use Cases</h1>
          <p class="page-subtitle">
            Operational mission profiles, technical architecture guidelines, and step-by-step usage procedures for SatQuery Earth Observation Intelligence.
          </p>
        </div>

        <div class="header-status-card">
          <div class="status-badge">
            <span class="status-dot"></span>
            <span>Documentation v1.2</span>
          </div>
          <div class="status-sub">InternVL3-1B Reference</div>
          <div class="status-time">PEFT LoRA Validated</div>
        </div>
      </div>

      <!-- SECTION 1: OPERATIONAL USE CASES -->
      <div class="content-card-section">
        <h2 class="content-card-title">Operational Use Cases</h2>
        
        <div class="capabilities-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
          
          <div class="capability-card">
            <div class="capability-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h3 class="capability-title">Disaster Monitoring</h3>
            <p class="capability-desc">
              Rapid situational assessment following natural hazards. Detect flood extents, landslide debris paths, structural collapsed zones, and wildfire progression across affected municipal sectors.
            </p>
          </div>

          <div class="capability-card">
            <div class="capability-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 0-8 16l8 4 8-4a10 10 0 0 0-8-16zm0 18-6-3a8 8 0 1 1 12 0l-6 3z"/></svg>
            </div>
            <h3 class="capability-title">Agriculture &amp; Food Security</h3>
            <p class="capability-desc">
              Analyze crop vegetation indices, irrigation anomalies, field boundaries, and crop health conditions across commercial agricultural basins and rural smallholder plots.
            </p>
          </div>

          <div class="capability-card">
            <div class="capability-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l8-4v18M19 21v-8l-6-4"/></svg>
            </div>
            <h3 class="capability-title">Urban Monitoring</h3>
            <p class="capability-desc">
              Track building footprint expansion, residential development density, transportation networks, informal settlement growth, and zoning compliance over dense urban centers.
            </p>
          </div>

          <div class="capability-card">
            <div class="capability-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
            </div>
            <h3 class="capability-title">Environmental Monitoring</h3>
            <p class="capability-desc">
              Observe wetland ecological degradation, deforestation frontiers in tropical canopies, coastline sediment movement, and reservoir surface water shrinkage.
            </p>
          </div>

          <div class="capability-card">
            <div class="capability-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <h3 class="capability-title">Infrastructure Analysis</h3>
            <p class="capability-desc">
              Inspect critical supply-chain nodes, maritime ports, vessel berthing facilities, solar and wind installations, highway construction corridors, and industrial yards.
            </p>
          </div>

        </div>
      </div>

      <!-- SECTION 2: HOW IT WORKS (USER WORKFLOW) -->
      <div class="content-card-section">
        <h2 class="content-card-title">How It Works — Step-by-Step Workflow</h2>
        
        <div class="workflow-steps-list">
          
          <div class="workflow-step-item">
            <div class="step-number">1</div>
            <div class="step-details">
              <div class="step-title">Upload Satellite Image</div>
              <div class="step-desc">
                Drag and drop or browse to select your satellite raster tile. Supports GeoTIFF and TIFF images only with payloads up to 50 MB.
              </div>
            </div>
          </div>

          <div class="workflow-step-item">
            <div class="step-number">2</div>
            <div class="step-details">
              <div class="step-title">Write Your Own Question</div>
              <div class="step-desc">
                Type your specific question in plain language directly into the empty query console. Queries can be written in English or multilingual phrasing.
              </div>
            </div>
          </div>

          <div class="workflow-step-item">
            <div class="step-number">3</div>
            <div class="step-details">
              <div class="step-title">Click Analyze</div>
              <div class="step-desc">
                Initiate the inference job. The image is spooled and projected into the InternVL3-1B vision backbone and evaluated with the VQA-10K LoRA adapter.
              </div>
            </div>
          </div>

          <div class="workflow-step-item">
            <div class="step-number">4</div>
            <div class="step-details">
              <div class="step-title">Review AI Answer</div>
              <div class="step-desc">
                Examine the primary predicted answer generated by the model, displayed in the high-contrast callout card.
              </div>
            </div>
          </div>

          <div class="workflow-step-item">
            <div class="step-number">5</div>
            <div class="step-details">
              <div class="step-title">Review Key Insights</div>
              <div class="step-desc">
                Inspect synthesized observations detailing spatial feature localization, feature absence or presence verification, and candidate agreement.
              </div>
            </div>
          </div>

          <div class="workflow-step-item">
            <div class="step-number">6</div>
            <div class="step-details">
              <div class="step-title">Review Calibrated Metrics</div>
              <div class="step-desc">
                Evaluate empirical confidence percentages, calibrated confidence tier (High/Medium/Low), inference duration, and candidate sample count.
              </div>
            </div>
          </div>

          <div class="workflow-step-item">
            <div class="step-number">7</div>
            <div class="step-details">
              <div class="step-title">Open Execution Trace (Optional)</div>
              <div class="step-desc">
                Expand the collapsible trace accordion to review exact timestamped milestones for image preprocessing, feature encoding, LoRA decoding, and Platt calibration.
              </div>
            </div>
          </div>

          <div class="workflow-step-item">
            <div class="step-number">8</div>
            <div class="step-details">
              <div class="step-title">Download Analysis Report</div>
              <div class="step-desc">
                Export an official printable analysis dossier containing complete query records, visual previews, calibrated confidence scores, and model provenance.
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- SECTION 3: MODEL TRAINING & EVIDENCE -->
      <div class="content-card-section">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-muted); padding-bottom: 10px; margin-bottom: 16px;">
          <h2 style="font-size: 18px; font-weight: 700; color: var(--navy-primary);">Model Training &amp; Evidence</h2>
          <a href="/evidence" class="btn-browse" data-nav="/evidence" style="text-decoration: none;">
            View Complete Evidence Dossier &rarr;
          </a>
        </div>
        
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
          SatQuery AI is built upon rigorous empirical experimentation. Rather than relying on uncalibrated claims, all model performance is backed by training logs, LoRA verification tests, and a 1,000-sample validation benchmark.
        </p>

        <div class="capabilities-grid" style="grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));">
          <div class="capability-card">
            <h4 style="font-size: 11px; color: var(--text-dim); text-transform: uppercase;">Training Convergence</h4>
            <div style="font-size: 18px; font-weight: 700; color: var(--navy-primary); font-family: var(--font-mono);">0.7384 Loss</div>
            <p class="capability-desc">Average loss achieved across 10,000 satellite VQA training samples.</p>
          </div>
          <div class="capability-card">
            <h4 style="font-size: 11px; color: var(--text-dim); text-transform: uppercase;">LoRA Weight Verification</h4>
            <div style="font-size: 18px; font-weight: 700; color: var(--navy-primary); font-family: var(--font-mono);">192 / 0 Tensors</div>
            <p class="capability-desc">192 parameter matrices verified modified with 0 unchanged tensors.</p>
          </div>
          <div class="capability-card">
            <h4 style="font-size: 11px; color: var(--text-dim); text-transform: uppercase;">Benchmark Accuracy</h4>
            <div style="font-size: 18px; font-weight: 700; color: var(--navy-primary); font-family: var(--font-mono);">61.60% (616/1000)</div>
            <p class="capability-desc">RSVQA: 67.80% (339/500) &bull; VRSBench: 55.40% (277/500).</p>
          </div>
          <div class="capability-card">
            <h4 style="font-size: 11px; color: var(--text-dim); text-transform: uppercase;">Calibration Quality</h4>
            <div style="font-size: 18px; font-weight: 700; color: var(--navy-primary); font-family: var(--font-mono);">ECE: 0.0336</div>
            <p class="capability-desc">Platt logistic scaling mapping multi-sample consensus to true accuracy.</p>
          </div>
        </div>
      </div>

    </div>
  `;
}
