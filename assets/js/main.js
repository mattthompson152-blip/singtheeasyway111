// ======================================
// MAIN GLOBAL SCRIPT - Sing The Easy Way
// ======================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ======================================
    // FADE-IN ANIMATIONS ON SCROLL
    // ======================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Check on load
    checkFade();
    
    // Check on scroll
    window.addEventListener('scroll', checkFade);
    
    // ======================================
    // MOBILE MENU TOGGLE
    // ======================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            this.setAttribute('aria-expanded', mainNav.classList.contains('active') ? 'true' : 'false');
        });
        
        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // ======================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ======================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ======================================
    // NAVBAR BACKGROUND ON SCROLL
    // ======================================
    const navbar = document.querySelector('nav');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(13, 13, 13, 0.98)';
        } else {
            navbar.style.background = 'rgba(13, 13, 13, 0.95)';
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    
    // ======================================
    // JOTFORM MODAL HANDLER
    // ======================================
    if (!window.jotformFeedback && typeof window.JotformFeedback === 'function') {
        window.jotformFeedback = new window.JotformFeedback({
            formId: '261603325649357',
            base: 'https://form.jotform.com/',
            windowTitle: 'Send an Enquiry',
            background: '#ff6b35',
            fontColor: '#FFFFFF',
            type: '1',
            height: 500,
            width: 700,
            openOnLoad: false
        });
    }

    function handleJotformClick(e) {
        e.preventDefault();
        try {
            if (window.jotformFeedback && typeof window.jotformFeedback.open === 'function') {
                window.jotformFeedback.open();
                return;
            }
        } catch (err) {
            console.warn('Jotform modal error:', err);
        }
        // Fallback to enquiry page
        window.location.href = '/contact.html';
    }
    
    // Attach handler to all [data-booking] buttons
    document.querySelectorAll('[data-booking]').forEach(function(btn) {
        btn.addEventListener('click', handleJotformClick);
    });
    
    // Attach handler to all [data-enquiry] buttons
    document.querySelectorAll('[data-enquiry]').forEach(function(btn) {
        btn.addEventListener('click', handleJotformClick);
    });
    

    // ======================================
    // FLOATING CTA VISIBILITY
    // Hides the floating button when the page's
    // own call to action is on screen, so the
    // same button never appears twice.
    // ======================================
    function floatingCtaVisibility() {
        var floating = document.querySelector('.floating-cta');
        if (!floating) { return; }

        var targets = document.querySelectorAll('.cta-section, footer');
        if (!targets.length || !('IntersectionObserver' in window)) { return; }

        floating.style.transition = 'opacity 0.25s ease, visibility 0.25s ease';

        var observer = new IntersectionObserver(function (entries) {
            var overlapping = entries.some(function (entry) { return entry.isIntersecting; });
            if (overlapping) {
                floating.style.opacity = '0';
                floating.style.visibility = 'hidden';
                floating.style.pointerEvents = 'none';
            } else {
                floating.style.opacity = '1';
                floating.style.visibility = 'visible';
                floating.style.pointerEvents = 'auto';
            }
        }, { threshold: 0.15 });

        targets.forEach(function (el) { observer.observe(el); });
    }

    floatingCtaVisibility();


    // ======================================
    // CONVERSION TRACKING
    // Fires GA4 events so Matt can see which
    // calls to action actually work. Only runs
    // if the visitor accepted analytics, because
    // gtag does not exist until they do.
    // ======================================
    function trackConversionEvents() {
        function send(name, params) {
            if (typeof window.gtag === 'function') {
                window.gtag('event', name, params || {});
            }
        }

        function isBookingHref(el) {
            try {
                var url = new URL(el.getAttribute('href'), window.location.origin);
                var isLocalBooking = url.origin === window.location.origin && url.pathname === '/book-online.html';
                var isJotformBooking = url.origin === 'https://pci.jotform.com' && url.pathname === '/form/262622799830063';
                return isLocalBooking || isJotformBooking;
            } catch (e) {
                return false;
            }
        }

        // Site-wide primary booking buttons
        document.querySelectorAll('a.btn[href]').forEach(function (el) {
            if (!isBookingHref(el)) { return; }
            el.addEventListener('click', function () {
                if (el.dataset.bookingOption) { return; }
                var section = el.closest('section');
                send('book_online_click', {
                    button_text: (el.textContent || '').trim(),
                    page_path: window.location.pathname,
                    page_section: section ? (section.className || 'unknown') : 'unknown'
                });
            });
        });

        var optionEventMap = {
            consultation: 'consultation_selection_click',
            single_lesson: 'single_lesson_selection_click',
            ten_lesson_block: 'ten_lesson_block_selection_click'
        };
        document.querySelectorAll('a[data-booking-option]').forEach(function (el) {
            el.addEventListener('click', function () {
                var eventName = optionEventMap[el.dataset.bookingOption];
                if (!eventName) { return; }
                send(eventName, {
                    button_text: (el.textContent || '').trim(),
                    page_path: window.location.pathname
                });
            });
        });

        document.querySelectorAll('a[data-contact-fallback="true"]').forEach(function (el) {
            el.addEventListener('click', function () {
                send('contact_fallback_click', {
                    button_text: (el.textContent || '').trim(),
                    page_path: window.location.pathname
                });
            });
        });

        // Phone and email taps
        document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
            el.addEventListener('click', function () {
                send('phone_click', { page_path: window.location.pathname });
            });
        });
        document.querySelectorAll('a[href^="mailto:"]').forEach(function (el) {
            el.addEventListener('click', function () {
                send('email_click', { page_path: window.location.pathname });
            });
        });

        // Did they get as far as seeing the community signup
        var signup = document.querySelector('.signup-box');
        if (signup && 'IntersectionObserver' in window) {
            var seen = false;
            var obs = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting && !seen) {
                        seen = true;
                        send('signup_viewed', { page_path: window.location.pathname });
                    }
                });
            }, { threshold: 0.4 });
            obs.observe(signup);
        }

        // Did they reach the pricing at all
        var pricing = document.querySelector('.pricing');
        if (pricing && 'IntersectionObserver' in window) {
            var pseen = false;
            var pobs = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting && !pseen) {
                        pseen = true;
                        send('pricing_viewed', { page_path: window.location.pathname });
                    }
                });
            }, { threshold: 0.3 });
            pobs.observe(pricing);
        }
    }

    trackConversionEvents();

});
