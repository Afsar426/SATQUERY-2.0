#  SatQuery AI 2.0

###  Earth Observation Intelligence • Remote-Sensing VQA • Evidence-Driven Analysis

[![Project](https://img.shields.io/badge/Project-SatQuery%20AI-0B3B60?style=for-the-badge&logo=satellite&logoColor=white)](#-satquery-ai-20)
[![Domain](https://img.shields.io/badge/Domain-Earth%20Observation-0E7490?style=for-the-badge)](#-overview)
[![AI](https://img.shields.io/badge/AI-Vision--Language-2563EB?style=for-the-badge&logo=openai&logoColor=white)](#-model-stack)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](#-system-architecture)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](#-installation)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.5.1-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](#-model-stack)
[![License](https://img.shields.io/badge/License-ISC-111827?style=for-the-badge)](#-license)

> **SatQuery AI 2.0** is an advanced remote-sensing Vision-Language Question Answering platform that lets users upload satellite imagery and ask questions in natural language. The current repository provides a deployed **single-image GeoTIFF/TIFF VQA baseline** powered by **OpenGVLab/InternVL3-1B + a VQA-10K LoRA adapter**, with post-hoc confidence calibration, evidence-oriented reporting, and a FastAPI + lightweight Node.js frontend stack.

---

## Table of Contents

- [ Overview](#-overview)
- [ Problem](#-problem)
- [ Solution](#-solution)
- [ Current Capabilities](#-current-capabilities)
- [ Model Stack](#-model-stack)
- [ System Architecture](#️-system-architecture)
- [ Inference Workflow](#-inference-workflow)
- [ Confidence & Calibration](#-confidence--calibration)
- [ Evaluation Evidence](#-evaluation-evidence)
- [ Remote-Sensing Research](#️-remote-sensing-research)
- [ Frontend](#️-frontend)
- [ Backend & API](#️-backend--api)
- [ Repository Structure](#-repository-structure)
- [ Hardware & Software Requirements](#-hardware--software-requirements)
- [ Installation](#️-installation)
- [ Running the Application](#️-running-the-application)
- [ API Reference](#-api-reference)
- [ Validation & Evidence](#-validation--evidence)
- [ Roadmap](#️-roadmap)
- [ Current Scope & Limitations](#️-current-scope--limitations)
- [ Security Notes](#-security-notes)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Team](#-team)

---

##  Overview

SatQuery AI is designed around a simple interaction model:

```text
             🛰️ SATELLITE IMAGE
                     │
                     ▼
            📤 Upload GeoTIFF/TIFF
                     │
                     ▼
             💬 Natural-Language
                 Question
                     │
                     ▼
          👁️ InternVL3-1B Backbone
                     │
                     ▼
              🧩 VQA-10K LoRA
                     │
                     ▼
           🧠 Answer Generation
                     │
             ┌───────┴────────┐
             ▼                ▼
        🎯 Confidence      📋 Evidence
          Calibration       / Metrics
             │                │
             └───────┬────────┘
                     ▼
              🌍 AI Insight
```

The repository currently focuses on the **Phase 1 operational baseline: single-image remote-sensing VQA**. Broader capabilities such as grounding, bi-temporal change analysis, optical-SAR fusion, agentic orchestration, and GeoAI are represented as research/roadmap work rather than as the currently deployed backend feature set.

---

##  Problem

Traditional remote-sensing analysis often requires:

-  Specialized GIS and image-analysis workflows
-  Domain-specific technical knowledge
-  Multiple tools for different analytical tasks
-  Careful handling of geospatial raster data
-  Manual interpretation of satellite scenes
-  Reliable evaluation rather than unsupported AI answers

Generic vision-language systems can describe an image, but remote-sensing imagery introduces additional challenges such as scale, spatial context, sensor-specific information, and scientific interpretation.

**SatQuery AI aims to reduce the interaction barrier by allowing users to communicate with satellite imagery using natural language.**

---

##  Solution

SatQuery provides an interactive workflow:

1.  Upload a supported satellite raster.
2.  Enter a natural-language question.
3.  Run the adapted remote-sensing VQA model.
4.  Generate a concise answer.
5.  Estimate confidence from multi-sample answer consistency.
6.  Apply post-hoc confidence calibration.
7.  Expose model/evaluation evidence through the application.

The current backend accepts **GeoTIFF/TIFF inputs up to 50 MB** and exposes a dedicated `/api/vqa` endpoint.

---

##  Current Capabilities

| Capability | Status |
|---|---|
|  GeoTIFF/TIFF upload | ✅ Available |
|  Drag & drop upload | ✅ Available |
|  Natural-language VQA | ✅ Available |
|  Multilingual query UI | ✅ UI-supported |
|  InternVL3-1B backbone | ✅ Integrated |
|  VQA-10K LoRA adapter | ✅ Integrated |
|  Confidence estimation | ✅ Integrated |
|  Confidence calibration | ✅ Integrated |
|  Training/evaluation evidence | ✅ Integrated |
|  Analysis report workflow | ✅ Implemented in UI |
|  Spatial grounding | 🟡 Planned |
|  Dense captioning | 🟡 Planned |
|  Bi-temporal change analysis | 🟡 Planned |
|  Optical + SAR fusion | 🟡 Experimental / Planned |
|  Agentic orchestration | 🟡 Planned |
|  GeoAI / OSM integration | 🟡 Planned |

> **Important:** The repository's current backend explicitly exposes VQA as available, while the other capabilities are marked as `coming_soon` or planned in the frontend roadmap.

---

#  Model Stack

##  Vision-Language Backbone

**OpenGVLab/InternVL3-1B**

The deployed VQA service loads the InternVL3-1B base model and attaches the trained VQA LoRA adapter.

### Configuration

```text
Base Model       : OpenGVLab/InternVL3-1B
Adapter          : VQA-10K LoRA
Visual Resolution: 448 × 448
CUDA Precision   : bfloat16
CPU Fallback     : float32
Max New Tokens   : 32
```

---

##  Parameter-Efficient Adaptation

Instead of modifying the complete base model, the repository uses **PEFT/LoRA**.

Configured LoRA evidence includes:

```text
Target Modules : q_proj, k_proj, v_proj, o_proj
Rank (r)       : 8
Alpha          : 32
Dropout        : 0.10
Bias           : none
```

This makes the adaptation substantially lighter than full-model fine-tuning.

---

##  Training Cohort

The repository documents a **10,000-sample remote-sensing VQA cohort**, including:

- 2,500 additional RSVQA samples
- 2,500 additional VRSBench samples
- Previous VQA-5K checkpoint continuation
- Final combined cohort: **10,000 samples**

Training evidence records an optimization loss of approximately **0.738394**.

---

#  System Architecture

```text
┌──────────────────────────────────────────────────────────┐
│                      USER INTERFACE                   │
│                                                          │
│   Image Upload  +   Natural-Language Question        │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                  NODE.JS FRONTEND SERVER                │
│                                                          │
│  Static Assets • SPA Routing • API Proxy • Port 3000     │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                     FASTAPI BACKEND                     │
│                         Port 8000                         │
│                                                          │
│  Validation • Upload Handling • VQA API • Health API     │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                      VQA SERVICE                       │
│                                                          │
│  InternVL3-1B → VQA-10K LoRA → Answer Generation         │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│               CONFIDENCE & CALIBRATION                 │
│                                                          │
│  Multi-sample consistency → Logistic calibration         │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                      RESULT                            │
│                                                          │
│  Answer • Confidence • Confidence Tier • Metadata        │
└──────────────────────────────────────────────────────────┘
```

---

#  Inference Workflow

### 01 —  Upload

The frontend accepts:

- `.tif`
- `.tiff`
- `.geotiff`

with a **50 MB maximum upload size**.

### 02 —  Validation

The backend validates:

- Empty question
- File extension
- File size
- Temporary file creation
- Model response validity

### 03 —  Preprocessing

The current VQA service:

- Converts the image to RGB
- Resizes it to `448 × 448`
- Applies bicubic interpolation
- Converts it to a tensor
- Normalizes using ImageNet-style mean/std
- Moves it to CUDA when available

### 04 —  Inference

The image and question are passed to InternVL3-1B with the trained VQA-10K LoRA adapter.

### 05 —  Multi-Sample Consistency

The service generates:

```text
1 × deterministic answer
+
4 × sampled answers
=
5 total candidates
```

The answers are normalized and compared.

### 06 —  Confidence

The system calculates a consistency score based on the majority answer.

### 07 —  Calibration

If the calibration artifact exists, the consistency score is transformed using the stored logistic calibration parameters.

### 08 —  API Response

The final response includes:

```json
{
  "success": true,
  "feature": "vqa",
  "question": "...",
  "answer": "...",
  "confidence": 0.85,
  "confidence_percent": 85.0,
  "confidence_label": "High",
  "samples_used": 5,
  "image_metadata": {
    "filename": "...",
    "size_mb": 12.4,
    "width": 1024,
    "height": 1024
  }
}
```

---

#  Confidence & Calibration

SatQuery does **not simply display an arbitrary confidence number**.

The current implementation follows:

```text
          5 Generated Answers
                  │
                  ▼
         Answer Normalization
                  │
                  ▼
       Majority-Answer Analysis
                  │
                  ▼
       Consistency Score ∈ [0, 1]
                  │
                  ▼
       Logistic Calibration Model
                  │
                  ▼
        Calibrated Probability
                  │
          ┌───────┼────────┐
          ▼       ▼        ▼
        🔴 Low  🟡 Medium  🟢 High
```

### Confidence tiers

```text
🟢 High   : confidence >= 0.80
🟡 Medium : confidence >= 0.60
🔴 Low    : confidence < 0.60
```

### Calibration

The repository uses **post-hoc logistic / Platt-style scaling** over validation evidence.

Reported calibration metric:

```text
Expected Calibration Error (ECE): 0.0336
```

A calibration artifact is loaded from:

```text
Backend/calibration/confidence_calibrator.json
```

If that artifact is unavailable or invalid, the implementation falls back to the raw consistency score.

---

# 📈 Evaluation Evidence

The repository documents a 1,000-sample validation cohort.

| Evaluation Suite | Samples | Correct | Accuracy |
|---|---:|---:|---:|
|  RSVQA | 500 | 339 | **67.80%** |
|  VRSBench | 500 | 277 | **55.40%** |
|  Overall | 1,000 | 616 | **61.60%** |

### Training Evidence

```text
 Average / reported training loss : 0.7384
 LoRA changed tensors             : 192
 LoRA unchanged tensors           : 0
 Overall validation accuracy      : 61.60%
 ECE                              : 0.0336
```

> These figures are repository-documented evidence and should be treated as benchmark/reporting results for the current VQA baseline, not as a universal claim of accuracy on every satellite-image distribution.

---

#  Remote-Sensing Research

The repository also documents experimental work beyond the current VQA deployment.

##  Optical + SAR

The research documentation describes:

- Sentinel-1 C-band VV/VH SAR
- Sentinel-2 multispectral imagery
- Speckle-noise considerations
- Spatial co-registration/parallax challenges
- Cross-attention projection experiments

### Status

```text
🧪 Experimental / Research Prototype
🚧 Not the current deployed VQA baseline
```

This distinction is intentionally preserved in the project architecture and roadmap.

---

# 🖥️ Frontend

The frontend is a lightweight custom web application rather than a large framework-based SPA.

### Core technologies

```text
HTML5
CSS3
Vanilla JavaScript / ES Modules
Node.js HTTP Server
```

### UI capabilities

-  Earth-observation themed interface
-  Drag-and-drop image upload
-  Image preview
-  Natural-language query box
-  Ctrl/Cmd + Enter shortcut
-  Result hierarchy
-  Confidence visualization
-  Evidence-oriented pages
-  Documentation and roadmap views
-  Team / project pages
-  Analysis reporting workflow

### Frontend routes

```text
/
├── /analysis
├── /documentation
├── /team
├── /roadmap
└── /evidence
```

The application uses a client-side page router and serves the SPA through `frontend/server.js`.

---

# ⚙️ Backend & API

The backend is implemented using:

-  Python 3.11
-  FastAPI
-  Uvicorn
-  PyTorch
-  Transformers
-  PEFT
-  Pillow
-  Rasterio
-  NumPy / SciPy
-  scikit-learn

### Backend responsibilities

```text
 Receive Upload
      ↓
 Validate Request
      ↓
 Temporary Storage
      ↓
 Image Preprocessing
      ↓
 VQA Inference
      ↓
 Confidence
      ↓
 Calibration
      ↓
 JSON Response
      ↓
 Temporary Cleanup
```

---

#  API Reference

## `GET /`

Returns basic project/service information.

Example:

```json
{
  "project": "SatQuery AI",
  "status": "running",
  "version": "1.2.0",
  "features": ["VQA"]
}
```

---

## `GET /health`

Health check.

Example:

```json
{
  "status": "healthy",
  "vqa_loaded": true
}
```

---

## `GET /api/features`

Returns the currently exposed feature status.

The repository currently reports:

```text
VQA                  → available
Captioning           → coming_soon
Grounding            → coming_soon
Change VQA           → coming_soon
Optical-SAR Fusion   → coming_soon
```

---

## `POST /api/vqa`

### Input

`multipart/form-data`

```text
image    → GeoTIFF/TIFF file
question → text
```

### Constraints

```text
Maximum file size : 50 MB
Supported formats: .tif, .tiff, .geotiff
```

### Output

```json
{
  "success": true,
  "feature": "vqa",
  "question": "What is visible in this image?",
  "answer": "....",
  "confidence": 0.85,
  "confidence_percent": 85.0,
  "confidence_label": "High",
  "samples_used": 5,
  "image_metadata": {
    "filename": "scene.tif",
    "size_mb": 8.4,
    "width": 1024,
    "height": 1024
  }
}
```

---

#  Repository Structure

```text
SATQUERY-2.0/
│
├──  Backend/
│   ├──  calibration/
│   │   └── confidence_calibrator.json
│   │
│   ├──  checkpoints/
│   │   └── vqa_10k/
│   │
│   ├──  main.py
│   ├──  satquery_requirements_exact.txt
│   │
│   └──  services/
│       └── vqa_service.py
│
├──  frontend/
│   ├──  package.json
│   ├──  server.js
│   │
│   └── public/
│       ├──  index.html
│       ├── assets/
│       ├── js/
│       │   ├── app.js
│       │   └── pages/
│       │       ├── home.js
│       │       ├── analysis.js
│       │       ├── documentation.js
│       │       ├── evidence.js
│       │       ├── roadmap.js
│       │       └── team.js
│       │
│       └── styles/
│           └── satquery.css
│
├──  hero-earth.jpg
├──  README.md
└──  .gitignore
```

---

#  Hardware & Software Requirements

The repository's exact GPU environment targets:

```text
Operating System : Windows Server 2016
Python           : 3.11.x
GPU              : NVIDIA RTX A6000
CUDA Runtime     : 12.1
PyTorch          : 2.5.1
```

### Important environment notes

The repository intentionally does **not** include:

```text
 flash-attn
 bitsandbytes
```

The documented reason is Windows compatibility / controlled introduction of quantization tooling.

---

#  Installation

## 1️ Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd SATQUERY-2.0
```

## 2️ Create the Python environment

### Windows

```powershell
py -3.11 -m venv satquery_env
.\satquery_env\Scripts\activate
```

### Upgrade pip

```bash
python -m pip install --upgrade pip
```

## 3️ Install backend dependencies

```bash
pip install -r Backend/satquery_requirements_exact.txt
```

> The requirements file pins the PyTorch CUDA 12.1 stack and the major ML/API dependencies used by the repository.

---

#  Running the Application

##  Start Backend

```bash
cd Backend
python main.py
```

Backend:

```text
http://localhost:8000
```

Health:

```text
http://localhost:8000/health
```

---

##  Start Frontend

Open another terminal:

```bash
cd frontend
npm start
```

Frontend:

```text
http://localhost:3000
```

The Node server proxies `/api/*` and `/health` requests to the FastAPI backend on port `8000`.

---

#  Runtime Architecture

```text
Browser
  │
  │ HTTP :3000
  ▼
┌──────────────────────┐
│  Node.js Server    │
│ Static + SPA + Proxy │
└──────────┬───────────┘
           │
           │ /api/*
           ▼
┌──────────────────────┐
│  FastAPI :8000      │
│ Validation + VQA API │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  VQAService        │
│ InternVL3-1B + LoRA  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Calibration       │
│ Consistency → Score  │
└──────────┬───────────┘
           │
           ▼
       JSON Result
```

---

#  Validation & Evidence

SatQuery includes an explicit evidence-oriented design rather than presenting the model as an unexplained black box.

The UI documents:

###  Model Evidence

- Base model
- LoRA configuration
- Training cohort
- Training loss
- Checkpoint information

###  Evaluation Evidence

- RSVQA validation
- VRSBench validation
- Overall validation cohort

###  Calibration Evidence

- Multi-sample consistency
- Logistic calibration
- ECE measurement
- Confidence tiers

###  Inference Evidence

- Query
- Answer
- Confidence
- Number of samples
- Image metadata
- Execution/inference information exposed by the application

---

#  Roadmap

The repository defines a staged expansion strategy.

```text
✅ Phase 1
Single-Image Remote-Sensing VQA
│
├── GeoTIFF/TIFF
├── InternVL3-1B
├── VQA-10K LoRA
├── Confidence calibration
└── Evidence/reporting
        │
        ▼
🟡 Phase 2
Captioning + Spatial Grounding
        │
        ▼
🟡 Phase 3
Bi-Temporal Change Analysis
        │
        ▼
🟡 Phase 4
Optical + SAR Fusion
        │
        ▼
🟡 Phase 5
Agentic Orchestration
        │
        ▼
🟡 Phase 6
Geospatial Intelligence / GeoAI
        │
        ▼
🌍 Phase 7
Complete SatQuery Ecosystem
```

### Phase 2 —  Grounding + Captioning

Spatial localization and dense scene interpretation.

### Phase 3 —  Bi-Temporal Analysis

Compare T1/T2 imagery for changes such as:

- Urban expansion
- Flood damage
- Deforestation
- Other temporal scene changes

### Phase 4 —  Optical + SAR

Combine optical multispectral information with radar observations.

### Phase 5 —  Agentic Orchestration

Connect VQA models, GIS tools such as GDAL/Rasterio, and external geospatial data sources.

### Phase 6 —  GeoAI

Introduce:

- Coordinate-aware outputs
- Bounding polygons
- Geocoding
- OpenStreetMap integration

### Phase 7 —  Full Ecosystem

Long-term vision for a conversational Earth-observation intelligence platform for:

- Enterprise geospatial analysts
- NGOs
- Civil-defense organizations
- Large-scale EO workflows

---

#  Current Scope & Limitations

SatQuery 2.0 should currently be understood as a **VQA-first system**.

### Current limitations

-  Current backend exposes VQA as the production/available capability.
-  Grounding is not yet exposed as a backend endpoint.
-  Bi-temporal change detection is planned.
-  Optical-SAR fusion is experimental/planned.
-  Full agentic model routing is planned.
-  Full geospatial intelligence integration is planned.
-  Benchmark performance can vary substantially across datasets and sensor distributions.
-  VQA should not be treated as an exact object-counting or measurement engine without a dedicated specialist model.
-  The current development CORS configuration is permissive and should be hardened before production deployment.

---

#  Security Notes

Before production deployment, consider:

-  Authentication and authorization
-  Restricting CORS origins
-  Upload MIME/content validation
-  Strict temporary-file lifecycle management
-  Server-side payload limits
-  Rate limiting
-  Structured request logging
-  Avoiding sensitive data in logs
-  HTTPS/TLS
-  Dependency vulnerability scanning
-  Production-grade process management

The current repository is best treated as an **engineering prototype / research deployment baseline**, not a hardened public production service.

---

#  Design Philosophy

SatQuery follows four principles:

### 1.  Natural Language First

Users interact with satellite imagery through questions rather than complex command pipelines.

### 2.  Parameter-Efficient Adaptation

LoRA/PEFT adapts a pretrained VLM instead of requiring full-model retraining.

### 3.  Confidence-Aware Answers

The system exposes calibrated confidence rather than presenting every prediction with equal certainty.

### 4. 🔬 Evidence-Oriented Engineering

Training, evaluation, calibration, and inference information are surfaced as first-class project artifacts.

---

#  Why SatQuery?

```text
Traditional EO Workflow
────────────────────────────────────────────
Satellite Data
     ↓
GIS Software
     ↓
Manual Preprocessing
     ↓
Specialized Model
     ↓
Expert Interpretation
     ↓
Final Insight

SatQuery
────────────────────────────────────────────
Satellite Image
     ↓
Natural-Language Question
     ↓
Vision-Language Model
     ↓
Confidence + Evidence
     ↓
Actionable Insight
```

The long-term goal is not to replace remote-sensing experts.

> **The goal is to reduce the technical overhead required to extract useful information from Earth-observation imagery.**

---

#  Contributing

Contributions are welcome.

Suggested workflow:

```bash
git checkout -b feature/your-feature
```

Make your changes, validate locally, then open a pull request with:

-  Problem statement
-  Proposed change
-  Validation performed
-  Relevant metrics
-  UI screenshots when applicable
-  Known limitations

---

#  License

This repository currently declares the **ISC License** in `frontend/package.json`.

For any redistribution or deployment, review the repository's licensing files and the licenses of all third-party models, datasets, and dependencies used by your deployment.

---

#  Team : vision x

###  SatQuery 

Building an intelligent interface for Earth Observation and remote-sensing analysis.

> **Ask the Earth. Get Answers.** 

---

##  Project Snapshot

| Layer | Technology |
|---|---|
|  Frontend | HTML5 + CSS3 + JavaScript |
|  Frontend Server | Node.js |
|  Backend API | FastAPI |
|  VLM | InternVL3-1B |
|  Adaptation | VQA-10K LoRA / PEFT |
|  ML Runtime | PyTorch |
|  Image Processing | Pillow / tifffile |
|  EO Raster Support | Rasterio |
|  Evaluation | RSVQA + VRSBench |
|  Calibration | Logistic / Platt-style scaling |
|  Reporting | Analysis/evidence workflow |
|  Future | Grounding + Change + SAR + Agentic GeoAI |

---

##  Final Architecture Vision

```text
                          SATQUERY AI
                              │
                    Natural-Language Query
                              │
                              ▼
                     Intelligent Agent
                              │
             ┌────────────────┼────────────────┐
             ▼                ▼                ▼
           VQA          Grounding          Change
             │                │                │
             └────────────────┼────────────────┘
                              │
                          SAR + Optical
                              │
                              ▼
                     Result Coordination
                              │
                     Confidence + Evidence
                              │
                              ▼
                      Verified Insight
```

> **From satellite pixels to understandable intelligence. **
