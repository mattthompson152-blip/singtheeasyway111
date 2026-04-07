#!/usr/bin/env python3
"""
Blog Post Standardization Script
Converts all blog posts to use the same header/footer as main site pages
"""

import os
import re
import glob

# Standard head template (up to </head>)
HEAD_TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-72QBZSZZBP"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());
      gtag('config', 'G-72QBZSZZBP');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{description}">
    <meta name="author" content="Matt Thompson">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph -->
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{description}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://singtheeasyway.com/{filename}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{description}">
    
    <!-- Canonical -->
    <link rel="canonical" href="https://singtheeasyway.com/{filename}">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/responsive.css">
    <link rel="stylesheet" href="assets/css/blog.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon-32x32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/images/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#0a0a0a">
</head>
<body>
'''

# Navigation template
NAV_TEMPLATE = '''<!-- Navigation -->
<nav>
    <div class="nav-container">
        <a href="index.html" class="logo">
            <img src="assets/images/logo.png" alt="Sing The Easy Way" style="height: 40px; width: auto;">
        </a>
        
        <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
        
        <ul id="mainNav">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Matt</a></li>
            <li><a href="lessons.html">Lessons</a></li>
            <li><a href="pricing.html">Pricing</a></li>
            <li><a href="testimonials.html">Testimonials</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="terms.html">Terms & Conditions</a></li>
            <li><a href="faq.html">FAQ</a></li>
        </ul>
    </div>
</nav>
'''

# Footer template
FOOTER_TEMPLATE = '''<!-- Footer -->
<footer>
    <div class="container">
        <div class="footer-grid">
            <div>
                <div class="footer-logo">Sing The Easy Way</div>
                <p>Professional online singing lessons with celebrity vocal coach Matt Thompson. 25+ years of experience teaching recording artists, film stars, and performers worldwide.</p>
                <p class="trading-as">Previously trading as Arpeggio Music</p>
                <div class="socials">
                    <a href="https://www.instagram.com/singtheeasyway" target="_blank" rel="noopener">Instagram</a>
                    <a href="https://www.tiktok.com/@mattsjourneysofar" target="_blank" rel="noopener">TikTok</a>
                </div>
            </div>
            
            <div>
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Matt</a></li>
                    <li><a href="lessons.html">Lessons</a></li>
                    <li><a href="pricing.html">Pricing</a></li>
                    <li><a href="testimonials.html">Testimonials</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="terms.html">Terms & Conditions</a></li>
                    <li><a href="faq.html">FAQ</a></li>
                </ul>
            </div>
            
            <div>
                <h3>Legal</h3>
                <ul>
                    <li><a href="privacy-policy.html">Privacy Policy</a></li>
                    <li><a href="environmental-policy.html">Environmental Policy</a></li>
                    <li><a href="sitemap.xml">Sitemap</a></li>
                </ul>
            </div>
            
            <div class="footer-contact">
                <h3>Get in Touch</h3>
                <p><a href="tel:+447792511393">+44 7792 511393</a></p>
                <p><a href="mailto:matt@singtheeasyway.com">matt@singtheeasyway.com</a></p>
                <button class="btn primary enquiry-btn" data-enquiry style="margin-top: var(--space-sm);">Send Enquiry</button>
                <p class="lesson-platforms">Lessons via FaceTime, WhatsApp & Microsoft Teams</p>
                <p class="lesson-platforms">Teaching from my mobile studio</p>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2026 Sing The Easy Way. All rights reserved.</p>
            <div class="footer-legal">
                <a href="privacy-policy.html">Privacy Policy</a>
                <a href="environmental-policy.html">Environmental Policy</a>
            </div>
            <p>Celebrity Vocal Coach Matt Thompson</p>
        </div>
    </div>
</footer>

<!-- Floating CTA -->
<div class="floating-cta">
    <button class="btn primary book-btn" data-booking>Book Lesson</button>
    <button class="btn secondary enquiry-btn" data-enquiry>Enquire</button>
</div>

<!-- Scripts -->
<script src="assets/js/main.js"></script>

<!-- SimplyBook.me Widget -->
<script src="//widget.simplybook.me/v2/widget/widget.js"></script>
<script>
    var widget = new SimplybookWidget({
        "widget_type": "button",
        "url": "https://singtheeasyway.simplybook.me",
        "theme": "default",
        "theme_settings": {
            "timeline_hide_unavailable": "1",
            "hide_past_days": "0",
            "timeline_show_end_time": "0",
            "timeline_modern_display": "as_slots",
            "sb_base_color": "#ff6b35",
            "display_item_mode": "block",
            "booking_nav_bg_color": "#ff6b35",
            "body_bg_color": "#f2f2f2",
            "dark_font_color": "#474747",
            "light_font_color": "#f5fcff",
            "btn_color_1": "#ff6b35",
            "sb_company_label_color": "#552f34",
            "hide_img_mode": "1",
            "show_sidebar": "1"
        },
        "timeline": "modern",
        "datepicker": "top_calendar",
        "is_rtl": false,
        "app_config": {
            "clear_session": 0,
            "allow_switch_to_ada": 0,
            "predefined": []
        }
    });
</script>

<!-- Jotform Widget -->
<script src="https://form.jotform.com/static/feedback2.js"></script>
<script>
    var jotformFeedback = new JotformFeedback({
        formId: '260846246211049',
        base: 'https://form.jotform.com/',
        windowTitle: 'Send an Enquiry',
        background: '#ff6b35',
        fontColor: '#FFFFFF',
        type: '1',
        height: 500,
        width: 700,
        openOnLoad: false
    });
</script>
<script>
    // Booking button handler
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (typeof widget !== 'undefined' && widget.open) {
                widget.open();
            }
        });
    });
</script>
</body>
</html>
'''

def extract_content(filepath):
    """Extract title, meta description, and article content from blog post"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract title
    title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
    title = title_match.group(1) if title_match else "Blog Post"
    
    # Extract meta description
    desc_match = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']*)["\']', content, re.IGNORECASE)
    if not desc_match:
        desc_match = re.search(r'<meta[^>]*content=["\']([^"\']*)["\'][^>]*name=["\']description["\']', content, re.IGNORECASE)
    description = desc_match.group(1) if desc_match else "Professional online singing lessons with Matt Thompson"
    
    # Extract article content (everything between first <h1> or <div class="container"> and </body> or footer)
    # Look for the main article content
    article_match = re.search(r'(<article.*?>.*?</article>)', content, re.DOTALL | re.IGNORECASE)
    if article_match:
        article_content = article_match.group(1)
    else:
        # Try to find content between nav and footer
        content_match = re.search(r'</nav>\s*(.*?)\s*(?:<footer>|</body>)', content, re.DOTALL | re.IGNORECASE)
        if content_match:
            article_content = content_match.group(1).strip()
            # Wrap in article tag if not already
            if not article_content.startswith('<article'):
                article_content = f'<article class="blog-post">\n<div class="container">\n{article_content}\n</div>\n</article>'
        else:
            article_content = '<article class="blog-post"><div class="container"><p>Content loading...</p></div></article>'
    
    return title, description, article_content

def process_blog_post(filepath):
    """Process a single blog post file"""
    filename = os.path.basename(filepath)
    
    print(f"Processing: {filename}")
    
    title, description, article_content = extract_content(filepath)
    
    # Build new HTML
    new_html = HEAD_TEMPLATE.format(
        title=title,
        description=description,
        filename=filename
    )
    new_html += NAV_TEMPLATE
    new_html += f'''
<!-- Blog Post Header -->
<section class="page-header">
    <div class="container">
        <div class="breadcrumb">
            <a href="index.html">Home</a> / <a href="blog.html">Blog</a>
        </div>
    </div>
</section>

'''
    new_html += article_content
    new_html += '\n'
    new_html += FOOTER_TEMPLATE
    
    return new_html

def main():
    """Process all blog post files"""
    os.chdir('/root/.openclaw/workspace/singtheeasyway111')
    
    blog_files = glob.glob('blog-post-*.html')
    
    print(f"Found {len(blog_files)} blog post files to process")
    
    for filepath in blog_files:
        try:
            new_content = process_blog_post(filepath)
            
            # Write new content
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"  ✓ Updated {filepath}")
        except Exception as e:
            print(f"  ✗ Error processing {filepath}: {e}")
    
    print("\nDone! All blog posts standardized.")

if __name__ == '__main__':
    main()
