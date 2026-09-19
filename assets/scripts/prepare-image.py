#!/usr/bin/env python3
"""
prepare-image.py

Converts ANY image into the exact format, size, name and folder this
website requires. Every AI and every person must use this script instead
of converting images by hand.

USAGE
    python3 assets/scripts/prepare-image.py <input-file> <type> <name> [DDMM]

TYPES
    blog     Blog article image.  -> /assets/images/blog/<name>-<DDMM>.jpg
    matt     Photograph of Matt.  -> /assets/images/matt/<name>.webp
    page     Page graphic.        -> /assets/images/pages/<name>.webp

EXAMPLES
    python3 assets/scripts/prepare-image.py ~/Desktop/photo.PNG blog online-singing-lessons-vocal-practice 1004
    python3 assets/scripts/prepare-image.py ~/Desktop/matt.jpeg matt matt-thompson-headshot-primary

The script prints the exact HTML to paste. If it prints FAILED, nothing
was written and nothing on the site has changed.
"""

import os
import re
import subprocess
import sys

SPECS = {
    # type: (folder, extension, max width, quality)
    "blog": ("assets/images/blog", "jpg", 1200, 82),
    "matt": ("assets/images/matt", "webp", 1200, 82),
    "page": ("assets/images/pages", "webp", 1600, 82),
}

MAX_KB = {"blog": 150, "matt": 200, "page": 250}


def fail(message):
    print("FAILED: " + message)
    sys.exit(1)


def clean_name(raw):
    """Lowercase, hyphens only. Case sensitive servers punish anything else."""
    name = raw.lower().strip()
    name = name.replace("\u2013", "-").replace("\u2014", "-")
    name = re.sub(r"[^a-z0-9]+", "-", name)
    name = re.sub(r"-+", "-", name).strip("-")
    if not name:
        fail("the name became empty after cleaning. Use letters and numbers.")
    return name


def repo_root():
    here = os.path.dirname(os.path.abspath(__file__))
    return os.path.abspath(os.path.join(here, "..", ".."))


def convert_with_pillow(src, dst, ext, max_width, quality):
    from PIL import Image

    im = Image.open(src)
    im = im.convert("RGB")
    if im.width > max_width:
        height = round(im.height * max_width / im.width)
        im = im.resize((max_width, height), Image.LANCZOS)
    if ext == "jpg":
        im.save(dst, "JPEG", quality=quality, optimize=True, progressive=True)
    else:
        im.save(dst, "WEBP", quality=quality, method=6)
    return im.size


def convert_with_sips(src, dst, ext, max_width):
    """macOS fallback. sips ships with every Mac."""
    fmt = "jpeg" if ext == "jpg" else "webp"
    subprocess.run(
        ["sips", "-s", "format", fmt, "-Z", str(max_width), src, "--out", dst],
        check=True,
        capture_output=True,
    )
    out = subprocess.run(
        ["sips", "-g", "pixelWidth", "-g", "pixelHeight", dst],
        check=True,
        capture_output=True,
        text=True,
    ).stdout
    w = re.search(r"pixelWidth:\s*(\d+)", out)
    h = re.search(r"pixelHeight:\s*(\d+)", out)
    return (int(w.group(1)), int(h.group(1))) if w and h else (0, 0)


def convert_with_imagemagick(src, dst, max_width, quality):
    binary = "magick" if which("magick") else "convert"
    subprocess.run(
        [binary, src, "-resize", "{0}>".format(max_width), "-quality", str(quality), dst],
        check=True,
        capture_output=True,
    )
    return (0, 0)


def which(binary):
    for path in os.environ.get("PATH", "").split(os.pathsep):
        candidate = os.path.join(path, binary)
        if os.path.isfile(candidate) and os.access(candidate, os.X_OK):
            return candidate
    return None


def main():
    args = sys.argv[1:]
    if len(args) < 3:
        print(__doc__)
        sys.exit(1)

    src, kind, raw_name = args[0], args[1].lower(), args[2]
    ddmm = args[3] if len(args) > 3 else None

    if kind not in SPECS:
        fail("type must be one of: blog, matt, page")
    if not os.path.isfile(src):
        fail("input file not found: " + src)

    folder, ext, max_width, quality = SPECS[kind]
    name = clean_name(raw_name)

    if kind == "blog":
        if not ddmm:
            fail("blog images need a date. Add DDMM, for example 1004 for 10 April.")
        if not re.fullmatch(r"\d{4}", ddmm):
            fail("the date must be four digits, DDMM, for example 2404.")
        name = "{0}-{1}".format(name, ddmm)

    root = repo_root()
    out_dir = os.path.join(root, folder)
    if not os.path.isdir(out_dir):
        fail("folder missing: " + folder + ". Run this from inside the repository.")

    filename = "{0}.{1}".format(name, ext)
    dst = os.path.join(out_dir, filename)

    if os.path.exists(dst):
        print("NOTE: overwriting existing file " + filename)

    size = (0, 0)
    method = ""
    try:
        size = convert_with_pillow(src, dst, ext, max_width, quality)
        method = "Pillow"
    except ImportError:
        if which("sips"):
            size = convert_with_sips(src, dst, ext, max_width)
            method = "sips"
        elif which("magick") or which("convert"):
            size = convert_with_imagemagick(src, dst, max_width, quality)
            method = "ImageMagick"
        else:
            fail(
                "no image tool available. Install Pillow with: python3 -m pip install Pillow"
            )
    except Exception as error:  # noqa: BLE001
        fail("conversion error: {0}".format(error))

    # Verification. Nothing is reported as done until the file is proven to exist.
    if not os.path.isfile(dst):
        fail("the output file was not created. Nothing has been changed.")
    kb = round(os.path.getsize(dst) / 1024)
    if kb == 0:
        os.remove(dst)
        fail("the output file was empty and has been deleted.")

    web_path = "/{0}/{1}".format(folder, filename)

    print("OK")
    print("  converted with : {0}".format(method))
    print("  written to     : {0}".format(web_path))
    print("  dimensions     : {0} x {1}".format(size[0], size[1]) if size[0] else "  dimensions     : see file")
    print("  file size      : {0} KB".format(kb))
    if kb > MAX_KB[kind]:
        print("  WARNING        : larger than {0} KB. Consider a smaller source image.".format(MAX_KB[kind]))
    print("")
    print("Paste this into the HTML, and write real alt text:")
    print('  <img src="{0}" alt="[DESCRIBE THE IMAGE]" loading="lazy">'.format(web_path))
    print("")
    print("Now run: python3 assets/scripts/check-site.py")


if __name__ == "__main__":
    main()
