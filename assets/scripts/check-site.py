#!/usr/bin/env python3
"""
check-site.py

Checks every live page for broken links, missing images, relative paths,
placeholder links and leftover template placeholders.

USAGE
    python3 assets/scripts/check-site.py

Exit code 0 means everything passed. Exit code 1 means do not publish.

The /templates/ folder is skipped on purpose. Templates are meant to
contain placeholders, and they are blocked from search engines.
"""

import os
import re
import sys

SKIP_DIRS = {"app", "templates", ".git", "node_modules"}
CHECK_EXTENSIONS = (".html", ".css", ".xml", ".webmanifest")
EXTERNAL = re.compile(r"^(https?:|mailto:|tel:|data:|//)")
ATTR = re.compile(r"\b(href|src)\s*=\s*([\"'])([^\"']*)\2")
CSS_URL = re.compile(r"url\(([\"']?)([^\"')]+)\1\)")
PLACEHOLDER_TEXT = re.compile(r"\[[A-Z][A-Z0-9 _\-]{2,}\]")


def repo_root():
    here = os.path.dirname(os.path.abspath(__file__))
    return os.path.abspath(os.path.join(here, "..", ".."))


def main():
    root = repo_root()
    os.chdir(root)

    problems = []
    pages = 0

    for folder, dirs, files in os.walk("."):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for name in files:
            if not name.endswith(CHECK_EXTENSIONS):
                continue
            path = os.path.join(folder, name).replace("\\", "/").lstrip("./")
            if name.startswith("google") and name.endswith(".html"):
                continue  # Google site verification file, not a page
            if path.endswith(".html"):
                pages += 1
            text = open(path, encoding="utf-8", errors="ignore").read()

            for match in ATTR.finditer(text):
                value = match.group(3).strip()
                if not value or EXTERNAL.match(value) or value.startswith("#"):
                    if value in ("#", "javascript:void(0)"):
                        problems.append("{0}: placeholder link {1}".format(path, value))
                    continue
                if not value.startswith("/"):
                    problems.append("{0}: relative path {1}".format(path, value))
                    continue
                target = value.split("?")[0].split("#")[0]
                if target == "/":
                    if not os.path.isfile("index.html"):
                        problems.append("{0}: homepage missing".format(path))
                    continue
                if target == "/index.html":
                    problems.append("{0}: links to /index.html, use / instead".format(path))
                if not os.path.exists(target.lstrip("/")):
                    problems.append("{0}: missing file {1}".format(path, value))

            for match in CSS_URL.finditer(text):
                value = match.group(2)
                if EXTERNAL.match(value):
                    continue
                if value.startswith("/") and not os.path.exists(value.split("?")[0].lstrip("/")):
                    problems.append("{0}: missing file in CSS {1}".format(path, value))

            if path.endswith(".html"):
                if len(re.findall(r"<h1", text)) != 1:
                    problems.append(
                        "{0}: has {1} h1 headings, must have exactly 1".format(
                            path, len(re.findall(r"<h1", text))
                        )
                    )
                for leftover in set(PLACEHOLDER_TEXT.findall(text)):
                    problems.append("{0}: unfinished placeholder {1}".format(path, leftover))

    # Images must be reachable, and filenames must be lowercase.
    for folder, dirs, files in os.walk("assets/images"):
        for name in files:
            if name.startswith("."):
                continue
            if name != name.lower():
                problems.append(
                    "assets: {0}/{1} has capital letters. Servers are case sensitive.".format(folder, name)
                )

    print("Checked {0} pages.".format(pages))
    if problems:
        print("")
        print("FAILED. {0} problem(s) found. Do not publish:".format(len(problems)))
        for item in problems:
            print("  - " + item)
        sys.exit(1)

    print("PASSED. No broken links, no missing images, no placeholders.")
    sys.exit(0)


if __name__ == "__main__":
    main()
