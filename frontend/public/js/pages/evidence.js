// ============================================================
// SATQUERY AI — MODEL TRAINING & EVIDENCE PAGE
// Sections 25-29: Dedicated scientific evidence from
// model adaptation, training, validation, evaluation & inference
// ============================================================

export function renderEvidence() {
  return `
    <div class="evidence-page-wrapper">
      
      <!-- BREADCRUMBS & HEADER -->
      <div class="page-header-row">
        <div>
          <nav class="breadcrumbs" aria-label="Breadcrumb">
            <a href="/" data-nav="/">Home</a>
            <span>&gt;</span>
            <span class="current">Evidence</span>
          </nav>
          <h1 class="page-title">Model Training &amp; Evidence</h1>
          <p class="page-subtitle">
            Experimental evidence from model adaptation, training, validation, evaluation, and inference across the SatQuery remote-sensing intelligence pipeline.
          </p>
        </div>

        <div class="header-status-card">
          <div class="status-badge">
            <span class="status-dot"></span>
            <span>Empirical Validation</span>
          </div>
          <div class="status-sub">VQA-10K Verified</div>
          <div class="status-time">Accuracy: 61.60%</div>
        </div>
      </div>

      <!-- KEY METRICS BANNER -->
      <div class="evidence-stats-grid">
        <div class="evidence-stat-card">
          <span class="evidence-stat-val">0.7384</span>
          <span class="evidence-stat-label">Average Training Loss</span>
        </div>
        <div class="evidence-stat-card">
          <span class="evidence-stat-val">192 / 0</span>
          <span class="evidence-stat-label">LoRA Changed / Unchanged</span>
        </div>
        <div class="evidence-stat-card">
          <span class="evidence-stat-val">61.60%</span>
          <span class="evidence-stat-label">VQA-10K Overall Accuracy</span>
        </div>
        <div class="evidence-stat-card">
          <span class="evidence-stat-val">67.80%</span>
          <span class="evidence-stat-label">RSVQA Benchmark (339/500)</span>
        </div>
        <div class="evidence-stat-card">
          <span class="evidence-stat-val">55.40%</span>
          <span class="evidence-stat-label">VRSBench Benchmark (277/500)</span>
        </div>
        <div class="evidence-stat-card">
          <span class="evidence-stat-val">0.0336</span>
          <span class="evidence-stat-label">Expected Calibration Error</span>
        </div>
      </div>

      <!-- 01 — MODEL & TRAINING SETUP -->
      <div class="content-card-section">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h2 style="font-size: 16px; font-weight: 700; color: var(--navy-primary);">
            01 &mdash; MODEL &amp; TRAINING SETUP
          </h2>
          <span class="metric-badge badge-high" style="font-size: 10px; text-transform: uppercase;">
            TRAINING EVIDENCE
          </span>
        </div>

        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">
          The team initialized the vision-language architecture using the OpenGVLab/InternVL3-1B backbone, configuring task-specific tokenizers, 448&times;448 bicubic visual patch encoders, and LoRA adapters.
        </p>

        <div style="background-color: #F8FAFC; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px 18px; font-family: var(--font-mono); font-size: 11px; line-height: 1.7; color: var(--text-secondary);">
          <div>[SETUP LOG] SATQUERY AI - VQA INITIALIZATION &amp; SERVICE BOOTSTRAP</div>
          <div>----------------------------------------------------------------------</div>
          <div>✓ Base Vision Backbone : OpenGVLab/InternVL3-1B (causal LM + dynamic patch encoder)</div>
          <div>✓ Vocab Size           : 151,645 tokens (added remote-sensing spatial tokens)</div>
          <div>✓ Target Modules       : ["q_proj", "k_proj", "v_proj", "o_proj"]</div>
          <div>✓ Rank &amp; Alpha         : r=8, alpha=32, dropout=0.10, bias=none</div>
          <div>✓ Precision            : bfloat16 (CUDA) / float32 fallback (CPU)</div>
          <div>✓ Visual Resolution    : 448 × 448 px (Bicubic Interpolation Mode)</div>
          <div>✓ Data Pipeline        : 10,000 paired remote-sensing question-image samples</div>
        </div>
      </div>

      <!-- 02 — REMOTE-SENSING MODEL TRAINING -->
      <div class="content-card-section">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h2 style="font-size: 16px; font-weight: 700; color: var(--navy-primary);">
            02 &mdash; REMOTE-SENSING MODEL TRAINING
          </h2>
          <span class="metric-badge badge-high" style="font-size: 10px; text-transform: uppercase;">
            TRAINING EVIDENCE
          </span>
        </div>

        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">
          The team adapted the vision-language model for remote-sensing visual question answering using high-resolution satellite imagery and task-specific training data. Training was executed as a staged continuation to ensure optimization stability.
        </p>

        <div style="background-color: #F8FAFC; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px 18px; font-family: var(--font-mono); font-size: 11px; line-height: 1.7; color: var(--text-secondary);">
          <div>[RUN REPORT] SATQUERY AI - VQA 10K CONTINUATION TRAINING</div>
          <div>============================================================</div>
          <div>Previous Checkpoint     : vqa_5k (Seed: 42)</div>
          <div>Continuation Seed       : 123</div>
          <div>New RSVQA Samples       : 2,500</div>
          <div>New VRSBench Samples    : 2,500</div>
          <div>Total Combined Cohort   : 10,000 samples</div>
          <div>Optimization Loss       : 0.738394 (Converged)</div>
          <div>Learning Rate Schedule  : 0.0001 (Cosine Decay with Warmup)</div>
          <div>Trained Checkpoint Path : Backend/checkpoints/vqa_10k/adapter_model.safetensors</div>
        </div>
      </div>

      <!-- 03 — MULTI-SENSOR / SAR + OPTICAL WORK -->
      <div class="content-card-section" style="border-left: 3px solid #D97706;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h2 style="font-size: 16px; font-weight: 700; color: var(--navy-primary);">
            03 &mdash; MULTI-SENSOR / SAR + OPTICAL WORK
          </h2>
          <span class="metric-badge badge-medium" style="font-size: 10px; text-transform: uppercase;">
            EXPERIMENTAL / RESEARCH EVIDENCE
          </span>
        </div>

        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">
          This evidence represents the SatQuery team's experimental research into remote-sensing multi-sensor data preparation and joint optical-radar representation learning.
        </p>

        <div style="background-color: #FFFBEB; border: 1px solid #FDE68A; border-radius: var(--radius-md); padding: 12px 16px; font-size: 12px; color: #92400E; margin-bottom: 14px;">
          <strong>Research Note:</strong> Synthetic Aperture Radar (SAR) and optical fusion represents ongoing Phase 4 research work. It is documented here as engineering evidence of dataset preparation and prototype alignment, and is distinct from the currently deployed single-image optical VQA production baseline.
        </div>

        <div style="background-color: #F8FAFC; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px 18px; font-family: var(--font-mono); font-size: 11px; line-height: 1.7; color: var(--text-secondary);">
          <div>[LAB SPECIFICATION] SAR + OPTICAL MULTI-SENSOR EMBEDDING EXPERIMENT</div>
          <div>----------------------------------------------------------------------</div>
          <div>Status               : Experimental / Research Prototype (Planned Phase 4)</div>
          <div>Modality Pairing     : Sentinel-1 (C-Band VV/VH SAR) + Sentinel-2 (B2-B4-B8 Multispectral)</div>
          <div>Core Challenge       : Speckle noise suppression &amp; spatial parallax co-registration</div>
          <div>Interim Status       : Cross-attention projection layers validated in offline sandbox</div>
        </div>
      </div>

      <!-- 04 — MODEL EVALUATION -->
      <div class="content-card-section">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h2 style="font-size: 16px; font-weight: 700; color: var(--navy-primary);">
            04 &mdash; MODEL EVALUATION BENCHMARK RESULTS
          </h2>
          <span class="metric-badge badge-high" style="font-size: 10px; text-transform: uppercase;">
            EVALUATION EVIDENCE
          </span>
        </div>

        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">
          Empirical evaluation conducted on a 1,000-sample balanced validation cohort composed of 500 samples from the RSVQA benchmark and 500 samples from the VRSBench benchmark.
        </p>

        <div style="overflow-x: auto; margin-bottom: 16px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <thead>
              <tr style="background-color: #F8FAFC; border-bottom: 1.5px solid var(--border-color); text-align: left;">
                <th style="padding: 10px 14px; font-weight: 700;">Evaluation Suite</th>
                <th style="padding: 10px 14px; font-weight: 700;">Sample Size</th>
                <th style="padding: 10px 14px; font-weight: 700;">Correct Predictions</th>
                <th style="padding: 10px 14px; font-weight: 700;">Normalized Accuracy</th>
                <th style="padding: 10px 14px; font-weight: 700;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-muted);">
                <td style="padding: 10px 14px; font-weight: 600;">RSVQA (Remote Sensing VQA)</td>
                <td style="padding: 10px 14px; font-family: var(--font-mono);">500</td>
                <td style="padding: 10px 14px; font-family: var(--font-mono);">339</td>
                <td style="padding: 10px 14px; font-weight: 700; color: var(--navy-primary);">67.80%</td>
                <td style="padding: 10px 14px;"><span class="metric-badge badge-high">Verified</span></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-muted);">
                <td style="padding: 10px 14px; font-weight: 600;">VRSBench (Fine-Grained EO)</td>
                <td style="padding: 10px 14px; font-family: var(--font-mono);">500</td>
                <td style="padding: 10px 14px; font-family: var(--font-mono);">277</td>
                <td style="padding: 10px 14px; font-weight: 700; color: var(--navy-primary);">55.40%</td>
                <td style="padding: 10px 14px;"><span class="metric-badge badge-high">Verified</span></td>
              </tr>
              <tr style="background-color: #F8FAFC; font-weight: 700;">
                <td style="padding: 12px 14px; color: var(--navy-primary);">Overall VQA-10K Validation</td>
                <td style="padding: 12px 14px; font-family: var(--font-mono);">1,000</td>
                <td style="padding: 12px 14px; font-family: var(--font-mono);">616</td>
                <td style="padding: 12px 14px; font-size: 15px; color: var(--navy-primary);">61.60%</td>
                <td style="padding: 12px 14px;"><span class="metric-badge badge-high">Validated</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 05 — TRAINING METRICS & CALIBRATION GROUPS -->
      <div class="content-card-section">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h2 style="font-size: 16px; font-weight: 700; color: var(--navy-primary);">
            05 &mdash; TRAINING METRICS &amp; LOGISTIC CALIBRATION
          </h2>
          <span class="metric-badge badge-high" style="font-size: 10px; text-transform: uppercase;">
            TRAINING EVIDENCE
          </span>
        </div>

        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">
          Model confidence is calibrated via post-hoc logistic Platt scaling over the validation benchmark to eliminate overconfident predictions:
        </p>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
            <thead>
              <tr style="background-color: #F8FAFC; border-bottom: 1.5px solid var(--border-color);">
                <th style="padding: 8px 12px; font-weight: 700;">Consistency Group</th>
                <th style="padding: 8px 12px; font-weight: 700;">Samples</th>
                <th style="padding: 8px 12px; font-weight: 700;">Correct</th>
                <th style="padding: 8px 12px; font-weight: 700;">Empirical Accuracy</th>
                <th style="padding: 8px 12px; font-weight: 700;">Calibrated Score</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-muted);">
                <td style="padding: 8px 12px; font-family: var(--font-mono); font-weight: 600;">1.0 (5/5 Consensus)</td>
                <td style="padding: 8px 12px;">596</td>
                <td style="padding: 8px 12px;">501</td>
                <td style="padding: 8px 12px; font-weight: 600; color: var(--green-status);">84.1%</td>
                <td style="padding: 8px 12px; font-weight: 700; color: var(--navy-primary);">85.0% (High)</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-muted);">
                <td style="padding: 8px 12px; font-family: var(--font-mono); font-weight: 600;">0.8 (4/5 Consensus)</td>
                <td style="padding: 8px 12px;">118</td>
                <td style="padding: 8px 12px;">59</td>
                <td style="padding: 8px 12px; font-weight: 600; color: var(--amber-status);">50.0%</td>
                <td style="padding: 8px 12px; font-weight: 700; color: var(--navy-primary);">67.0% (Medium)</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-muted);">
                <td style="padding: 8px 12px; font-family: var(--font-mono); font-weight: 600;">0.6 (3/5 Consensus)</td>
                <td style="padding: 8px 12px;">116</td>
                <td style="padding: 8px 12px;">42</td>
                <td style="padding: 8px 12px; font-weight: 600; color: var(--amber-status);">36.2%</td>
                <td style="padding: 8px 12px; font-weight: 700; color: var(--navy-primary);">44.0% (Low)</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-muted);">
                <td style="padding: 8px 12px; font-family: var(--font-mono); font-weight: 600;">0.4 (2/5 Consensus)</td>
                <td style="padding: 8px 12px;">83</td>
                <td style="padding: 8px 12px;">18</td>
                <td style="padding: 8px 12px; color: var(--text-dim);">21.7%</td>
                <td style="padding: 8px 12px; font-weight: 700; color: var(--navy-primary);">24.0% (Low)</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; font-family: var(--font-mono); font-weight: 600;">0.2 (1/5 Consensus)</td>
                <td style="padding: 8px 12px;">87</td>
                <td style="padding: 8px 12px;">9</td>
                <td style="padding: 8px 12px; color: var(--text-dim);">10.3%</td>
                <td style="padding: 8px 12px; font-weight: 700; color: var(--navy-primary);">11.0% (Low)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 06 — MODEL ADAPTATION -->
      <div class="content-card-section">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h2 style="font-size: 16px; font-weight: 700; color: var(--navy-primary);">
            06 &mdash; MODEL ADAPTATION SPECIFICATION
          </h2>
          <span class="metric-badge badge-high" style="font-size: 10px; text-transform: uppercase;">
            TRAINING EVIDENCE
          </span>
        </div>

        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
          The base vision-language foundation model (InternVL3-1B) was adapted for remote-sensing visual question answering using task-specific LoRA fine-tuning. Parameter efficiency was preserved by training low-rank decomposition matrices while keeping the core foundation weights frozen.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-top: 14px;">
          <div class="metric-item">
            <span class="metric-label">LoRA Rank (r)</span>
            <span class="metric-value">8</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">LoRA Alpha (&alpha;)</span>
            <span class="metric-value">32</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">LoRA Dropout</span>
            <span class="metric-value">0.10</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Changed Tensors</span>
            <span class="metric-value">192 Layers</span>
          </div>
        </div>
      </div>

      <!-- 07 — INFERENCE EVIDENCE -->
      <div class="content-card-section">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h2 style="font-size: 16px; font-weight: 700; color: var(--navy-primary);">
            07 &mdash; ACTUAL INFERENCE EXECUTION EVIDENCE
          </h2>
          <span class="metric-badge badge-high" style="font-size: 10px; text-transform: uppercase;">
            INFERENCE EVIDENCE
          </span>
        </div>

        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
          Direct execution evidence captured from the running SatQuery inference cluster. Displays the exact question query, high-resolution tile input, synthesized model response, and calibrated confidence metrics.
        </p>

        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; background-color: #F8FAFC;">
          <img 
            src="/assets/images/inference-evidence.jpg" 
            alt="SatQuery Actual Inference Evidence" 
            style="width: 100%; display: block; cursor: pointer;"
            id="evidence-inference-img"
            title="Click to view full-resolution evidence screenshot"
          />
          <div style="padding: 12px 16px; background-color: #FFFFFF; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <div style="font-size: 12px; color: var(--text-muted);">
              <strong>Inference Evidence:</strong> User Query: <em>"any boat is visible in this image"</em> &bull; Predicted Output: <em>"no boat is visible in this image"</em> &bull; Confidence: 91% (High)
            </div>
            <button type="button" class="btn-browse" id="btn-zoom-evidence" style="font-size: 11px;">
              Zoom Screenshot &rarr;
            </button>
          </div>
        </div>
      </div>

      <!-- Screenshot Zoom Modal -->
      <div id="evidence-modal" style="display: none; position: fixed; inset: 0; z-index: 1000; background-color: rgba(15, 23, 42, 0.85); backdrop-filter: blur(6px); align-items: center; justify-content: center; padding: 20px;">
        <div style="position: relative; max-width: 95vw; max-height: 95vh; background: #FFFFFF; border-radius: var(--radius-lg); overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; border-bottom: 1px solid var(--border-color); background: #F8FAFC;">
            <span style="font-size: 13px; font-weight: 700; color: var(--navy-primary);">SatQuery Actual Inference Execution Evidence</span>
            <button type="button" id="btn-close-modal" style="background: none; border: none; font-size: 18px; cursor: pointer; color: var(--text-dim);">&times;</button>
          </div>
          <div style="padding: 10px; max-height: calc(95vh - 60px); overflow: auto;">
            <img src="/assets/images/inference-evidence.jpg" alt="Inference Evidence Zoom" style="width: 100%; height: auto; display: block;">
          </div>
        </div>
      </div>

    </div>
  `;
}

export function initEvidenceEvents() {
  const modal = document.getElementById('evidence-modal');
  const img = document.getElementById('evidence-inference-img');
  const btnZoom = document.getElementById('btn-zoom-evidence');
  const btnClose = document.getElementById('btn-close-modal');

  if (modal && img) {
    const openModal = () => { modal.style.display = 'flex'; };
    const closeModal = () => { modal.style.display = 'none'; };

    img.addEventListener('click', openModal);
    if (btnZoom) btnZoom.addEventListener('click', openModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}
