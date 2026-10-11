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

RETIRED_FORM = "261603325649357"
BOOKING_FORM = "262622799830063"
COMMUNITY_FORM = "261037482331047"
PROGRAMME_URL = "https://singtheeasyway.com/development-programme.html"
PROGRAMME_IMAGE = "assets/images/matt/matt-thompson-online-vocal-coaching-session.webp"
STALE_STRINGS = (RETIRED_FORM, "feedback2.js", "JotformFeedback", "widget.open")
# data-booking-option is the only allowed data-booking-* attribute.
STALE_ATTR = re.compile(r"data-booking(?!-option)|data-enquiry")
BOOKING_LINK = re.compile(r"pci\.jotform\.com/form/(\d+)")
EMBED_LINK = re.compile(r"(?<!pci\.)form\.jotform\.com/(\d+)")
JOTFORM_ID = re.compile(r"(?:JotFormIFrame-|(?:pci\.)?form\.jotform\.com/(?:form/)?)(\d+)")


def repo_root():
    here = os.path.dirname(os.path.abspath(__file__))
    return os.path.abspath(os.path.join(here, "..", ".."))


def check_stale_code(path, text, problems, retired_only=False):
    for needle in STALE_STRINGS:
        if needle in text:
            problems.append("{0}: contains retired/stale code {1}".format(path, needle))
    if retired_only:
        return
    for match in sorted(set(STALE_ATTR.findall(text))):
        problems.append("{0}: uses retired attribute {1}".format(path, match))
    for form_id in sorted(set(BOOKING_LINK.findall(text))):
        if form_id != BOOKING_FORM:
            problems.append("{0}: booking link uses unapproved form {1}".format(path, form_id))
    for form_id in sorted(set(EMBED_LINK.findall(text))):
        if form_id != COMMUNITY_FORM:
            problems.append("{0}: Jotform embed uses unapproved form {1}".format(path, form_id))
    for form_id in sorted(set(JOTFORM_ID.findall(text))):
        if form_id not in (BOOKING_FORM, COMMUNITY_FORM):
            problems.append("{0}: contains unapproved Jotform ID {1}".format(path, form_id))


def check_html_ending(path, text, problems):
    for tag in ("</html>", "</body>"):
        if text.count(tag) != 1:
            problems.append("{0}: has {1} {2} tags, must have exactly 1".format(path, text.count(tag), tag))
    end = text.rfind("</html>")
    if end != -1 and text[end + len("</html>"):].strip():
        problems.append("{0}: content after final </html>".format(path))


def check_programme_navigation(path, text, problems):
    link = re.compile(
        r'<a\b[^>]*href=["\']/development-programme\.html["\'][^>]*>'
        r'\s*Development Programme\s*</a>',
        re.IGNORECASE,
    )
    nav = re.search(r"<nav\b.*?</nav>", text, re.IGNORECASE | re.DOTALL)
    if not nav or len(link.findall(nav.group(0))) != 1:
        problems.append("{0}: header must contain one Development Programme link".format(path))

    footer = re.search(r"<footer\b.*?</footer>", text, re.IGNORECASE | re.DOTALL)
    explore = re.search(
        r"<h3>\s*Explore\s*</h3>\s*<ul>(.*?)</ul>",
        footer.group(0) if footer else "",
        re.IGNORECASE | re.DOTALL,
    )
    if not explore or len(link.findall(explore.group(1))) != 1:
        problems.append("{0}: Explore footer must contain one Development Programme link".format(path))


def main():
    root = repo_root()
    os.chdir(root)

    problems = []
    pages = 0

    for folder, dirs, files in os.walk("."):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for name in files:
            if not name.endswith(CHECK_EXTENSIONS + (".js",)):
                continue
            path = os.path.join(folder, name).replace("\\", "/").lstrip("./")
            if name.startswith("google") and name.endswith(".html"):
                continue  # Google site verification file, not a page
            if path.endswith(".html"):
                pages += 1
            if path.endswith(".js"):
                text = open(path, encoding="utf-8", errors="ignore").read()
                check_stale_code(path, text, problems)
                continue
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
                check_stale_code(path, text, problems)
                check_html_ending(path, text, problems)
                check_programme_navigation(path, text, problems)
                if len(re.findall(r"<h1", text)) != 1:
                    problems.append(
                        "{0}: has {1} h1 headings, must have exactly 1".format(
                            path, len(re.findall(r"<h1", text))
                        )
                    )
                for leftover in set(PLACEHOLDER_TEXT.findall(text)):
                    problems.append("{0}: unfinished placeholder {1}".format(path, leftover))

    if not os.path.isfile("development-programme.html"):
        problems.append("development-programme.html: page is missing")
    elif BOOKING_FORM not in open("development-programme.html", encoding="utf-8").read():
        problems.append("development-programme.html: approved booking form is missing")

    if not os.path.isfile(PROGRAMME_IMAGE):
        problems.append("{0}: programme image is missing".format(PROGRAMME_IMAGE))

    if not os.path.isfile("sitemap.xml"):
        problems.append("sitemap.xml: file is missing")
    else:
        sitemap = open("sitemap.xml", encoding="utf-8").read()
        if sitemap.count(PROGRAMME_URL) != 1:
            problems.append("sitemap.xml: must contain the programme canonical URL exactly once")

    # Templates are skipped above because they hold placeholders. Scan them
    # for retired code only.
    for name in sorted(os.listdir("templates")) if os.path.isdir("templates") else []:
        if name.endswith((".html", ".js")):
            path = "templates/" + name
            text = open(path, encoding="utf-8", errors="ignore").read()
            check_stale_code(path, text, problems, retired_only=True)

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
