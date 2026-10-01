from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


CELL_WIDTH = 192
CELL_HEIGHT = 208
COLUMNS = 8
SOURCE_ROWS = (0, 3, 7, 8)  # idle, waving, running, review
OUTPUT_SCALE = 0.75


def main() -> None:
    parser = argparse.ArgumentParser(description="Export the four web assistant states from Kiki Pup.")
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    with Image.open(args.source) as source:
        source = source.convert("RGBA")
        expected = (CELL_WIDTH * COLUMNS, CELL_HEIGHT * 11)
        if source.size != expected:
            raise ValueError(f"Expected {expected[0]}x{expected[1]}, got {source.size[0]}x{source.size[1]}")

        output_width = round(CELL_WIDTH * COLUMNS * OUTPUT_SCALE)
        output_row_height = round(CELL_HEIGHT * OUTPUT_SCALE)
        output = Image.new("RGBA", (output_width, output_row_height * len(SOURCE_ROWS)))

        for output_row, source_row in enumerate(SOURCE_ROWS):
            top = source_row * CELL_HEIGHT
            strip = source.crop((0, top, CELL_WIDTH * COLUMNS, top + CELL_HEIGHT))
            strip = strip.resize((output_width, output_row_height), Image.Resampling.LANCZOS)
            output.alpha_composite(strip, (0, output_row * output_row_height))

        args.output.parent.mkdir(parents=True, exist_ok=True)
        output.save(args.output, format="WEBP", quality=82, method=6, exact=True)
        print(f"exported={args.output} size={output.size[0]}x{output.size[1]}")


if __name__ == "__main__":
    main()

