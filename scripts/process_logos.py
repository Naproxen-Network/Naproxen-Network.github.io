#!/usr/bin/env python3
"""Remove logo backgrounds; keep only red emblem pixels (transparent PNG)."""

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "images"


def remove_white_keep_red(src: Path, dst: Path, white_thresh: int = 235) -> None:
    arr = np.array(Image.open(src).convert("RGBA")).astype(np.float32)
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]
    redness = r - np.maximum(g, b)
    is_white = (r >= white_thresh) & (g >= white_thresh) & (b >= white_thresh)

    is_red = (r >= 70) & (redness >= 25) & (r > g) & (r > b)
    is_deep = (r >= 40) & (r <= 200) & (redness >= 18) & (g < 120) & (b < 120) & (r > g + 10)
    keep = is_red | is_deep

    alpha = np.where(keep, 255.0, 0.0)
    edge = (~is_white) & (~keep) & (redness > 8) & (r > 100)
    alpha[edge] = np.maximum(alpha[edge], np.clip((redness[edge] - 8) / 40 * 255, 0, 200))
    alpha[is_white] = 0
    pale = (alpha > 0) & (r > 200) & (g > 180) & (b > 180) & (redness < 40)
    alpha[pale] = 0
    alpha = np.minimum(alpha, np.where(a > 0, a, 255))

    out = arr.copy()
    out[:, :, 3] = alpha
    out[alpha < 20, 0:3] = 0
    Image.fromarray(out.astype(np.uint8)).save(dst, optimize=True)
    print(f"wrote {dst}")


def keep_red_from_any_bg(src: Path, dst: Path) -> None:
    arr = np.array(Image.open(src).convert("RGBA")).astype(np.float32)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    redness = r - np.maximum(g, b)

    has = (r > 40) & (redness > 8) & (r > g) & (r > b)
    strength = np.clip((redness - 8) / 50.0, 0, 1) * np.clip((r - 30) / 80.0, 0, 1)
    alpha = np.where(has, np.clip(strength * 255, 0, 255), 0.0)
    strong = has & (redness >= 25) & (r >= 90)
    alpha[strong] = np.maximum(alpha[strong], 230)

    out = arr.copy()
    out[:, :, 3] = alpha
    out[alpha < 12, 0:3] = 0
    Image.fromarray(out.astype(np.uint8)).save(dst, optimize=True)
    print(f"wrote {dst}")


def main() -> None:
    remove_white_keep_red(ROOT / "nbu_logo2.png", ROOT / "nbu_logo2.png")
    keep_red_from_any_bg(ROOT / "nbu_logo.png", ROOT / "nbu_logo.png")


if __name__ == "__main__":
    main()
