# ============================================================
# SATQUERY AI - VQA INFERENCE SERVICE
# VQA-10K LoRA + CALIBRATED CONFIDENCE
# ============================================================

import re
import json
import math
from pathlib import Path

import torch
from PIL import Image

from transformers import AutoTokenizer, AutoModel
from peft import PeftModel
from torchvision import transforms
from torchvision.transforms import InterpolationMode


# ============================================================
# CONFIG
# ============================================================

PROJECT_ROOT = Path(__file__).resolve().parents[1]

BASE_MODEL = "OpenGVLab/InternVL3-1B"

# FINAL TRAINED VQA CHECKPOINT
LORA_PATH = (
    PROJECT_ROOT
    / "checkpoints"
    / "vqa_10k"
)

# CALIBRATION FILE CREATED BY:
# src\calibrate_confidence.py
CALIBRATION_PATH = (
    PROJECT_ROOT
    / "calibration"
    / "confidence_calibrator.json"
)

DEVICE = (
    "cuda:0"
    if torch.cuda.is_available()
    else "cpu"
)

MODEL_DTYPE = (
    torch.bfloat16
    if DEVICE.startswith("cuda")
    else torch.float32
)

IMAGE_SIZE = 448

# Generate 5 answers total:
# 1 deterministic + 4 sampled
CONFIDENCE_SAMPLES = 5

MAX_NEW_TOKENS = 32

SAMPLE_TEMPERATURE = 0.20
SAMPLE_TOP_P = 0.90


# ============================================================
# IMAGE PREPROCESSING
# ============================================================

transform = transforms.Compose([
    transforms.Lambda(
        lambda img: img.convert("RGB")
    ),

    transforms.Resize(
        (IMAGE_SIZE, IMAGE_SIZE),
        interpolation=InterpolationMode.BICUBIC
    ),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=(0.485, 0.456, 0.406),
        std=(0.229, 0.224, 0.225)
    )
])


# ============================================================
# ANSWER NORMALIZATION
# ============================================================

def normalize_answer(text: str) -> str:

    if text is None:
        return ""

    text = str(text).lower().strip()

    text = re.sub(
        r"[^\w\s.%\-]",
        " ",
        text
    )

    text = re.sub(
        r"\s+",
        " ",
        text
    )

    return text.strip()


# ============================================================
# ANSWER DISPLAY FORMATTER
# ============================================================

def format_answer_for_display(raw_answer: str) -> str:
    """Format short VQA answers for a natural UI display.

    This does NOT change the raw model output or validation metric.
    """

    if not raw_answer:
        return "No answer generated."

    answer = str(raw_answer).strip()
    clean = answer.rstrip(" .,!?:;")

    if not clean:
        return "No answer generated."

    lower = clean.lower()

    if lower == "yes":
        return "Yes, the described object or feature is visible in the image."

    if lower == "no":
        return "No, the described object or feature is not visible in the image."

    if lower in {"none", "nothing", "neither"}:
        return "No such feature or object is visible in the image."

    if lower in {"unknown", "unclear", "uncertain"}:
        return "The feature is unclear or indistinguishable in the image."

    if re.fullmatch(r"\d+(?:\.\d+)?", clean):
        return f"The observed count is {clean}."

    if re.fullmatch(r"\d+(?:\.\d+)?%", clean):
        return f"The observed estimate is {clean}."

    if re.match(r"^\d+\s+\w+", clean):
        return f"{clean} are visible in the image."

    colors = {
        "red", "green", "blue", "yellow",
        "black", "white", "gray", "grey",
        "brown", "orange", "pink", "purple"
    }

    if lower in colors:
        return f"The observed color is {clean}."

    directions = {
        "left", "right", "top", "bottom",
        "north", "south", "east", "west",
        "center", "centre", "middle"
    }

    if lower in directions:
        return f"The object is located on the {clean}."

    if len(clean.split()) >= 4:
        return clean + "."

    if lower.startswith(("a ", "an ", "the ")):
        return f"{clean[0].upper() + clean[1:]} is visible in the image."

    first_word = clean.split()[0]
    article = "An" if first_word[0].lower() in "aeiou" else "A"

    return f"{article} {clean} is visible in the image."


# ============================================================
# FALLBACK CONFIDENCE LABEL
# ============================================================

def confidence_label(confidence: float) -> str:

    if confidence >= 0.80:
        return "High"

    if confidence >= 0.60:
        return "Medium"

    return "Low"


# ============================================================
# VQA SERVICE
# ============================================================

class VQAService:

    def __init__(self):

        self.model = None
        self.tokenizer = None

        self.loaded = False

        # Calibration state
        self.calibrator = None
        self.calibration_loaded = False


    # ========================================================
    # LOAD CALIBRATOR
    # ========================================================

    def _load_calibrator(self):

        print()
        print("[CALIBRATION] Loading confidence calibrator...")

        if not CALIBRATION_PATH.exists():

            print(
                "⚠ Calibration file not found:"
            )

            print(
                f"  {CALIBRATION_PATH}"
            )

            print(
                "⚠ Using fallback confidence."
            )

            self.calibrator = None
            self.calibration_loaded = False

            return

        try:

            with open(
                CALIBRATION_PATH,
                "r",
                encoding="utf-8"
            ) as f:

                data = json.load(f)

            calibrator = data.get(
                "calibrator"
            )

            if not calibrator:

                raise ValueError(
                    "Missing 'calibrator' section."
                )

            required_keys = [
                "weight",
                "bias",
                "x_mean",
                "x_std"
            ]

            for key in required_keys:

                if key not in calibrator:

                    raise ValueError(
                        f"Missing calibrator key: {key}"
                    )

            if float(calibrator["x_std"]) == 0:

                raise ValueError(
                    "Invalid x_std = 0."
                )

            self.calibrator = calibrator

            self.calibration_loaded = True

            print("✓ Confidence calibrator loaded")

            print(
                f"  Method      : "
                f"{data.get('method', 'unknown')}"
            )

            print(
                f"  Validation  : "
                f"{data.get('validation_samples', 'unknown')}"
            )

            print(
                f"  ECE         : "
                f"{data.get('metrics', {}).get('expected_calibration_error', 'unknown')}"
            )

        except Exception as e:

            print(
                f"⚠ Failed to load calibrator: {e}"
            )

            print(
                "⚠ Using fallback confidence."
            )

            self.calibrator = None
            self.calibration_loaded = False


    # ========================================================
    # LOAD MODEL
    # ========================================================

    def load(self):

        if self.loaded:
            return

        print("=" * 70)
        print("SATQUERY AI - VQA SERVICE")
        print("=" * 70)

        print(f"[DEVICE] {DEVICE}")
        print(f"[MODEL]  {BASE_MODEL}")
        print(f"[LORA]   {LORA_PATH}")

        if DEVICE.startswith("cuda"):

            print(
                f"[GPU] "
                f"{torch.cuda.get_device_name(0)}"
            )

        # ----------------------------------------------------
        # CHECK CHECKPOINT
        # ----------------------------------------------------

        if not LORA_PATH.exists():

            raise FileNotFoundError(
                f"VQA LoRA checkpoint not found:\n"
                f"{LORA_PATH}"
            )

        # ----------------------------------------------------
        # TOKENIZER
        # ----------------------------------------------------

        print()
        print("[1/4] Loading tokenizer...")

        self.tokenizer = (
            AutoTokenizer.from_pretrained(
                BASE_MODEL,
                trust_remote_code=True,
                use_fast=False
            )
        )

        print("✓ Tokenizer loaded")

        # ----------------------------------------------------
        # BASE MODEL
        # ----------------------------------------------------

        print()
        print("[2/4] Loading InternVL3-1B...")

        self.model = AutoModel.from_pretrained(
            BASE_MODEL,
            torch_dtype=MODEL_DTYPE,
            low_cpu_mem_usage=True,
            trust_remote_code=True
        )

        if DEVICE.startswith("cuda"):

            self.model = self.model.cuda()

        self.model.eval()

        # ----------------------------------------------------
        # IMAGE CONTEXT TOKEN
        # ----------------------------------------------------

        self.model.img_context_token_id = (
            self.tokenizer.convert_tokens_to_ids(
                "<IMG_CONTEXT>"
            )
        )

        print(
            "✓ InternVL3-1B loaded"
        )

        # ----------------------------------------------------
        # VQA LoRA
        # ----------------------------------------------------

        print()
        print("[3/4] Loading VQA-10K LoRA...")

        self.model.language_model = (
            PeftModel.from_pretrained(
                self.model.language_model,
                LORA_PATH,
                is_trainable=False
            )
        )

        # Freeze everything
        for param in self.model.parameters():

            param.requires_grad = False

        self.model.eval()

        print(
            "✓ VQA-10K LoRA loaded"
        )

        # ----------------------------------------------------
        # CONFIDENCE CALIBRATOR
        # ----------------------------------------------------

        print()
        print("[4/4] Loading calibrated confidence...")

        self._load_calibrator()

        # ----------------------------------------------------
        # READY
        # ----------------------------------------------------

        self.loaded = True

        print()
        print("✓ VQA SERVICE READY")
        print("=" * 70)


    # ========================================================
    # SINGLE GENERATION
    # ========================================================

    @torch.inference_mode()
    def _generate_once(
        self,
        pixel_values,
        question: str,
        sample: bool
    ) -> str:

        prompt = (
            "<image>\n"
            + question.strip()
            + "\nAnswer briefly."
        )

        generation_config = {
            "max_new_tokens": MAX_NEW_TOKENS,
            "do_sample": sample,
            "num_beams": 1,
        }

        if sample:

            generation_config.update({
                "temperature": SAMPLE_TEMPERATURE,
                "top_p": SAMPLE_TOP_P,
            })

        answer = self.model.chat(
            self.tokenizer,
            pixel_values,
            prompt,
            generation_config
        )

        if answer is None:
            return ""

        return str(answer).strip()


    # ========================================================
    # CALIBRATED CONFIDENCE
    # ========================================================

    def _calibrate_confidence(
        self,
        consistency: float
    ) -> float:

        # ----------------------------------------------------
        # If calibration file is unavailable:
        # fallback to consistency.
        # ----------------------------------------------------

        if (
            not self.calibration_loaded
            or self.calibrator is None
        ):

            return max(
                0.0,
                min(
                    1.0,
                    float(consistency)
                )
            )

        weight = float(
            self.calibrator["weight"]
        )

        bias = float(
            self.calibrator["bias"]
        )

        x_mean = float(
            self.calibrator["x_mean"]
        )

        x_std = float(
            self.calibrator["x_std"]
        )

        if abs(x_std) < 1e-8:

            x_std = 1.0

        # Standardize consistency
        x = (
            consistency - x_mean
        ) / x_std

        # Logistic model
        z = (
            weight * x
            + bias
        )

        # Numerically stable sigmoid
        if z >= 0:

            exp_neg = math.exp(-z)

            probability = (
                1.0
                / (1.0 + exp_neg)
            )

        else:

            exp_pos = math.exp(z)

            probability = (
                exp_pos
                / (1.0 + exp_pos)
            )

        return max(
            0.0,
            min(
                1.0,
                probability
            )
        )


    # ========================================================
    # ASK QUESTION
    # ========================================================

    @torch.inference_mode()
    def ask(
        self,
        image_path,
        question: str
    ):

        if not self.loaded:

            self.load()

        # ----------------------------------------------------
        # VALIDATION
        # ----------------------------------------------------

        image_path = Path(
            image_path
        )

        if not image_path.exists():

            raise FileNotFoundError(
                f"Image not found:\n"
                f"{image_path}"
            )

        if (
            not question
            or not question.strip()
        ):

            raise ValueError(
                "Question cannot be empty."
            )

        # ----------------------------------------------------
        # IMAGE
        # ----------------------------------------------------

        image = Image.open(
            image_path
        ).convert("RGB")

        pixel_values = transform(
            image
        ).unsqueeze(0)

        pixel_values = pixel_values.to(
            device=DEVICE,
            dtype=MODEL_DTYPE
        )

        # ----------------------------------------------------
        # PRIMARY ANSWER
        # ----------------------------------------------------
        #
        # Deterministic answer remains the answer shown
        # to the user.
        # ----------------------------------------------------

        primary_answer = (
            self._generate_once(
                pixel_values,
                question,
                sample=False
            )
        )

        if not primary_answer:

            raise RuntimeError(
                "VQA model returned an empty answer."
            )

        # ----------------------------------------------------
        # UI DISPLAY ANSWER
        # ----------------------------------------------------
        # Keep the original model answer unchanged.
        # Only format a separate answer for frontend display.
        display_answer = format_answer_for_display(
            primary_answer
        )

        # ----------------------------------------------------
        # ADDITIONAL SAMPLES
        # ----------------------------------------------------

        sampled_answers = []

        for _ in range(
            CONFIDENCE_SAMPLES - 1
        ):

            answer = (
                self._generate_once(
                    pixel_values,
                    question,
                    sample=True
                )
            )

            if answer:

                sampled_answers.append(
                    answer
                )

        # ----------------------------------------------------
        # ALL ANSWERS
        # ----------------------------------------------------

        all_answers = (
            [primary_answer]
            + sampled_answers
        )

        # ----------------------------------------------------
        # NORMALIZE FOR COMPARISON
        # ----------------------------------------------------

        normalized_answers = [
            normalize_answer(answer)
            for answer in all_answers
        ]

        normalized_answers = [
            answer
            for answer in normalized_answers
            if answer
        ]

        # ----------------------------------------------------
        # CONSISTENCY
        # ----------------------------------------------------

        if normalized_answers:

            # Count how often each answer appears.
            counts = {}

            for answer in normalized_answers:

                counts[answer] = (
                    counts.get(answer, 0)
                    + 1
                )

            majority_answer = max(
                counts,
                key=counts.get
            )

            majority_count = counts[
                majority_answer
            ]

            consistency = (
                majority_count
                / len(normalized_answers)
            )

        else:

            consistency = 0.0

        # ----------------------------------------------------
        # CALIBRATED CONFIDENCE
        # ----------------------------------------------------

        calibrated_confidence = (
            self._calibrate_confidence(
                consistency
            )
        )

        # ----------------------------------------------------
        # CONFIDENCE LABEL
        # ----------------------------------------------------

        label = confidence_label(
            calibrated_confidence
        )

        # ----------------------------------------------------
        # RESPONSE
        # ----------------------------------------------------

        return {

            # Natural sentence for frontend display.
            "answer":
                display_answer,

            # Original model output for trace/debugging.
            "raw_answer":
                primary_answer,

            "confidence":
                round(
                    float(
                        calibrated_confidence
                    ),
                    2
                ),

            "confidence_percent":
                round(
                    float(
                        calibrated_confidence
                    ) * 100,
                    1
                ),

            "confidence_label":
                label,

            "samples_used":
                len(all_answers),

            # Useful for debugging/evaluation.
            # Frontend does not have to display these.
            "consistency":
                round(
                    float(consistency),
                    2
                ),

            "confidence_calibrated":
                bool(
                    self.calibration_loaded
                )
        }


# ============================================================
# SINGLETON
# ============================================================

vqa_service = VQAService()