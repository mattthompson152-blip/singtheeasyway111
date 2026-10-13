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
        function closeMenu(returnFocus) {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            if (returnFocus) {
                mobileMenuToggle.focus();
            }
        }

        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            this.setAttribute('aria-expanded', mainNav.classList.contains('active') ? 'true' : 'false');
        });
        
        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu(false);
            });
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNav.classList.contains('active')) {
                closeMenu(true);
            }
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
            consultation: 'consultation_selection',
            single_lesson: 'single_lesson_selection',
            development_programme: 'development_programme_selection'
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

    // ======================================
    // LEAD TRACKING (generate_lead)
    // Local support enquiry form on contact.html only.
    // Real booking generate_lead is sent server-side
    // (worker/) from the verified Jotform submission.
    // ======================================
    function trackLeadEvents() {
        var leadSent = {};

        function sendLeadOnce(key, params) {
            if (leadSent[key]) { return; }
            if (typeof window.gtag !== 'function') { return; }
            leadSent[key] = true;
            window.gtag('event', 'generate_lead', params || {});
        }

        // Local support enquiry form on contact.html.
        var supportForm = document.getElementById('supportMessageForm');
        if (supportForm) {
            supportForm.addEventListener('submit', function () {
                sendLeadOnce('support-form', {
                    event_label: 'support_email_form',
                    page_path: window.location.pathname
                });
            });
        }
    }

    // ======================================
    // BOOKING LINK ATTRIBUTION
    // When (and only when) the visitor has consented, pseudonymous GA4
    // identifiers are added to the outbound Jotform booking link so the
    // server-side conversion (worker/) can be tied to the original
    // GA4 session. No consent: the link is left exactly as written.
    // Never carries names, email, phone, appointment or singing details.
    // This script never sends the booking conversion itself.
    // ======================================
    function trackBookingLinkAttribution() {
        var GA_ID = 'G-72QBZSZZBP';
        var SESSION_COOKIE = '_ga_' + GA_ID.replace('G-', '');
        var CLIENT_RE = /^\d{5,12}\.\d{5,12}$/;
        var DIGITS_RE = /^\d{1,20}$/;
        var CLICK_ID_RE = /^[A-Za-z0-9_-]{10,200}$/;
        var OWN_PARAMS = ['analytics_consent', 'ads_consent', 'ga_client_id', 'ga_session_id',
            'ga_session_number', 'gclid', 'gbraid', 'wbraid'];
        var cache = {};

        function readCookie(name) {
            var parts = document.cookie ? document.cookie.split(';') : [];
            for (var i = 0; i < parts.length; i++) {
                var part = parts[i].replace(/^\s+/, '');
                if (part.indexOf(name + '=') === 0) {
                    var raw = part.substring(name.length + 1);
                    try { return decodeURIComponent(raw); } catch (e) { return raw; }
                }
            }
            return '';
        }

        function consentState() {
            try {
                var prefs = JSON.parse(readCookie('SingTheEasyWay_Consent') || '{}');
                return { analytics: prefs.analytics === true, marketing: prefs.marketing === true };
            } catch (e) {
                return { analytics: false, marketing: false };
            }
        }

        function valid(re, value) {
            value = value === undefined || value === null ? '' : String(value);
            return re.test(value) ? value : '';
        }

        function cookieIds() {
            var ids = {};
            var m = /^GA\d\.\d+\.(\d+\.\d+)$/.exec(readCookie('_ga'));
            if (m) { ids.client_id = m[1]; }
            var s = readCookie(SESSION_COOKIE);
            // GS1.1.<session_id>.<session_number>... and GS2.1.s<session_id>$o<session_number>$...
            var m1 = /^GS1\.\d+\.(\d+)\.(\d+)/.exec(s);
            var m2 = /^GS2\.\d+\.s(\d+)\$o(\d+)/.exec(s);
            var ms = m1 || m2;
            if (ms) { ids.session_id = ms[1]; ids.session_number = ms[2]; }
            return ids;
        }

        // Official API first. Callbacks are asynchronous and never block
        // navigation: links are always built synchronously from the cache
        // or the cookies, and the cache simply improves later clicks.
        function requestGtagIds() {
            if (typeof window.gtag !== 'function' || !window.gaScriptLoaded) { return; }
            ['client_id', 'session_id', 'session_number'].forEach(function (field) {
                try {
                    window.gtag('get', GA_ID, field, function (value) {
                        var ok = valid(field === 'client_id' ? CLIENT_RE : DIGITS_RE, value);
                        if (ok) { cache[field] = ok; }
                    });
                } catch (e) { /* cookies remain the fallback */ }
            });
        }

        function clickId(cookieName, param) {
            var fromCookie = (readCookie(cookieName).split('.')[2]) || '';
            var ok = valid(CLICK_ID_RE, fromCookie);
            if (ok) { return ok; }
            try {
                return valid(CLICK_ID_RE, new URLSearchParams(window.location.search).get(param));
            } catch (e) {
                return '';
            }
        }

        function buildParams() {
            var consent = consentState();
            var out = {};
            if (!consent.analytics || typeof window.gtag !== 'function' || !window.gaScriptLoaded) { return out; }
            var fallback = cookieIds();
            var clientId = valid(CLIENT_RE, cache.client_id) || fallback.client_id || '';
            var sessionId = valid(DIGITS_RE, cache.session_id) || fallback.session_id || '';
            var sessionNumber = valid(DIGITS_RE, cache.session_number) || fallback.session_number || '';
            out.analytics_consent = '1';
            if (clientId) { out.ga_client_id = clientId; }
            if (sessionId) { out.ga_session_id = sessionId; }
            if (sessionNumber) { out.ga_session_number = sessionNumber; }
            if (consent.marketing) {
                out.ads_consent = '1';
                var gclid = clickId('_gcl_aw', 'gclid');
                var gbraid = clickId('_gcl_gb', 'gbraid');
                var wbraid = valid(CLICK_ID_RE, (function () {
                    try { return new URLSearchParams(window.location.search).get('wbraid'); } catch (e) { return ''; }
                })());
                if (gclid) { out.gclid = gclid; }
                if (gbraid) { out.gbraid = gbraid; }
                if (wbraid) { out.wbraid = wbraid; }
            }
            return out;
        }

        function isJotformBooking(el) {
            try {
                var url = new URL(el.getAttribute('href'), window.location.origin);
                return url.origin === 'https://pci.jotform.com' && url.pathname === '/form/262622799830063';
            } catch (e) {
                return false;
            }
        }

        function decorate(el) {
            try {
                var url = new URL(el.getAttribute('href'), window.location.origin);
                var hadOwn = OWN_PARAMS.some(function (name) { return url.searchParams.has(name); });
                var params = buildParams();
                if (!hadOwn && Object.keys(params).length === 0) { return; }
                OWN_PARAMS.forEach(function (name) { url.searchParams.delete(name); });
                Object.keys(params).forEach(function (name) { url.searchParams.set(name, params[name]); });
                el.setAttribute('href', url.toString());
            } catch (e) { /* never break navigation */ }
        }

        function handler(event) {
            if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') { return; }
            var target = event.target && event.target.closest ? event.target.closest('a[href]') : null;
            if (!target || !isJotformBooking(target)) { return; }
            requestGtagIds();
            decorate(target);
        }

        ['mousedown', 'touchstart', 'keydown', 'contextmenu', 'click'].forEach(function (name) {
            document.addEventListener(name, handler, true);
        });
        document.addEventListener('analytics-consent-granted', requestGtagIds);
        requestGtagIds();
    }

    trackConversionEvents();
    trackLeadEvents();
    trackBookingLinkAttribution();

});
