# Sing The Easy Way - Website

## Website Structure

```
singtheeasyway/
├── index.html              # Homepage
├── about.html              # About Matt page
├── lessons.html            # Lessons page
├── pricing.html            # Pricing page
├── testimonials.html       # Testimonials page
├── contact.html            # Contact page
├── blog.html               # Blog listing page
├── blog-post-sing-with-emotion.html  # April 1, 2026 - Sing with Emotion
├── blog-post-vocal-registers.html    # April 2, 2026 - Vocal Registers
├── blog-post-vocal-muscle-memory.html # March 31, 2026 - Muscle Memory
├── blog-post-vocal-health.html       # March 30, 2026 - Vocal Health
├── blog-post-microphones.html        # March 29, 2026 - Microphones
├── blog-post-vocal-range.html        # March 28, 2026 - Vocal Range
├── blog-post-online-vs-inperson.html # March 27, 2026 - Online vs In-Person
├── blog-post-stage-fright.html       # March 26, 2026 - Stage Fright
├── blog-post-breathing-techniques.html # March 25, 2026 - Breathing
├── blog-post-30-day-singing.html     # March 24, 2026 - 30 Day Plan
├── blog-post-vocal-warmups.html      # March 23, 2026 - Warm-ups
├── privacy-policy.html     # Privacy Policy
├── environmental-policy.html # Environmental Policy
├── sitemap.xml             # XML Sitemap for Google
├── README.md               # This file
├── assets/
│   ├── css/
│   │   ├── style.css       # Main styles
│   │   └── responsive.css  # Responsive styles
│   ├── js/
│   │   └── main.js         # Main JavaScript
│   └── images/             # Image folder (needs to be populated)
```

## Required Images

Please add the following images to `assets/images/`:

1. **hero-waveform.jpg** - Waveform background image for all page headers
2. **motorhome.jpg** - Motorhome/mobile studio image (for index page)
3. **lesson-setup.jpg** - Lesson setup image (for testimonials page)
4. **matt-headshot.jpg** - Matt headshot image (for index page)
5. **matt-portrait.jpg** - Matt portrait image (for about page)
6. **matt-teaching.jpg** - Matt teaching image (for lessons page)

## Favicons

Favicons have been generated from `logo.png` and added to all pages:

- **favicon.ico** - Multi-resolution icon for browsers
- **favicon-16x16.png** - Browser tabs (16x16)
- **favicon-32x32.png** - Browser tabs, Retina displays (32x32)
- **apple-touch-icon.png** - iOS home screen icons (180x180)
- **android-chrome-192x192.png** - Android icons (192x192)
- **android-chrome-512x512.png** - Android splash screens (512x512)
- **site.webmanifest** - Web app manifest for PWA support

All favicons are linked in the `<head>` of every HTML page.

## Google Search Console Setup

Google Analytics (G-72QBZSZZBP) is already installed on all pages. To verify with Google Search Console:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: `https://singtheeasyway.com`
3. Choose **Google Analytics** as the verification method
4. Click **Verify** - it will automatically detect your existing GA tracking code

Alternatively, if you need HTML tag verification, add your verification meta tag to all pages in the `<head>` section.

## Features

- ✅ SEO optimized with meta tags, descriptions, and keywords
- ✅ Keywords targeted: online singing lessons, remote singing lessons, virtual singing lessons, best online singing lessons
- ✅ Google Analytics installed (G-72QBZSZZBP)
- ✅ Favicons on all pages
- ✅ Hero waveform background on every page
- ✅ SimplyBook.me integration for bookings
- ✅ Jotform integration for enquiries
- ✅ Payment options displayed (Apple Pay, Google Pay, Credit Card, Bank Transfer)
- ✅ Responsive design for all devices
- ✅ Mobile-friendly navigation
- ✅ Privacy Policy and Environmental Policy pages
- ✅ XML Sitemap for Google indexing
- ✅ All buttons correctly linked
- ✅ Floating CTA buttons
- ✅ Smooth scroll animations

## Button Functionality

- **Booking buttons** (data-booking): Opens SimplyBook.me widget
- **Enquiry buttons** (data-enquiry): Opens Jotform enquiry form

## Contact

For questions or support, contact: matt@singtheeasyway.com
