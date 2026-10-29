/** 
 * GDPR Cookie Consent Manager
 * Handles consent-gated Google Analytics
 */

(function() {
    'use strict';
    
    // Cookie names
    const CONSENT_COOKIE = 'SingTheEasyWay_Consent';
    const ANALYTICS_COOKIE = 'SingTheEasyWay_Analytics';
    
    // Google Analytics ID
    const GA_ID = 'G-72QBZSZZBP';
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initCookieConsent();
    });
    document.addEventListener('click', function(event) {
        const anchor = event.target.closest && event.target.closest('a[href]');
        if (!anchor || !window.gaScriptLoaded || window['ga-disable-' + GA_ID]) return;

        const destination = new URL(anchor.href, window.location.href);
        const bookingUrl = 'https://pci.jotform.com/form/262622799830063';
        let eventName;
        if (destination.href === bookingUrl) {
            eventName = 'paid_service_booking_click';
        } else if (destination.href === 'https://form.jotform.com/263014255269052') {
            eventName = 'general_enquiry_click';
        } else if (destination.href === 'https://form.jotform.com/263013855697062') {
            eventName = 'professional_enquiry_click';
        }

        if (eventName) {
            window.gtag('event', eventName, {
                service_type: anchor.dataset.bookingOption || 'unspecified'
            });
        }
    });
    
    function initCookieConsent() {
        // Check if user has already given consent
        const consent = getCookie(CONSENT_COOKIE);

        if (!consent) {
            // Show banner if no consent yet
            showCookieBanner();
        } else {
            // Apply stored preferences
            applyConsentPreferences(JSON.parse(consent));
        }

        // The settings box must exist for everyone, not only first time
        // visitors, otherwise the Cookie Settings link in the footer does
        // nothing for anyone who has already made a choice.
        if (!document.getElementById('cookie-settings-modal')) {
            createSettingsModal();
        }

        // Add footer link handler
        addFooterLinkHandler();
    }
    
    function showCookieBanner() {
        // Create banner HTML
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner-container">
                <div class="cookie-banner-text">
                    <h3>🍪 We value your privacy</h3>
                    <p>We use essential cookies and, if you agree, analytics cookies to understand how visitors use the site. <a href="/privacy-policy.html">Read our Privacy Policy</a></p>
                </div>
                <div class="cookie-banner-buttons">
                    <button class="cookie-btn cookie-btn-accept" onclick="acceptAllCookies()">Accept analytics</button>
                    <button class="cookie-btn cookie-btn-settings" onclick="openCookieSettings()">Cookie Settings</button>
                    <button class="cookie-btn cookie-btn-reject" onclick="rejectAllCookies()">Reject All</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
        
        // Create settings modal
        if (!document.getElementById('cookie-settings-modal')) {
            createSettingsModal();
        }
    }
    
    function createSettingsModal() {
        const modal = document.createElement('div');
        modal.id = 'cookie-settings-modal';
        modal.className = 'cookie-settings-modal';
        modal.innerHTML = `
            <div class="cookie-settings-content">
                <h2>Cookie Preferences</h2>
                <p>Manage your cookie preferences below. Essential cookies cannot be disabled as they are necessary for the website to function properly.</p>
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <div>
                            <h3>Essential Cookies</h3>
                            <p>Required for the website to function. Cannot be disabled.</p>
                        </div>
                        <label class="cookie-toggle">
                            <input type="checkbox" checked disabled>
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                    <p style="color: #666; font-size: 0.8rem; margin-top: 10px;">
                        Includes: Session cookies, JotForm enquiry forms
                    </p>
                </div>
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <div>
                            <h3>Analytics Cookies</h3>
                            <p>Help us understand how visitors interact with our website.</p>
                        </div>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="analytics-toggle">
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                    <p style="color: #666; font-size: 0.8rem; margin-top: 10px;">
                        Includes: Google Analytics (_ga, _gid, _gat)
                    </p>
                </div>
                
                
                <div class="cookie-settings-footer">
                    <button class="cookie-btn cookie-btn-reject" onclick="closeCookieSettings()">Cancel</button>
                    <button class="cookie-btn cookie-btn-accept" onclick="saveCookiePreferences()">Save Preferences</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close modal on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCookieSettings();
            }
        });
    }
    
    // Global functions
    window.acceptAllCookies = function() {
        const preferences = {
            essential: true,
            analytics: true,
            marketing: false,
            timestamp: new Date().toISOString()
        };
        
        setCookie(CONSENT_COOKIE, JSON.stringify(preferences), 365);
        applyConsentPreferences(preferences);
        hideCookieBanner();
    };
    
    window.rejectAllCookies = function() {
        const preferences = {
            essential: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString()
        };
        
        setCookie(CONSENT_COOKIE, JSON.stringify(preferences), 365);
        applyConsentPreferences(preferences);
        hideCookieBanner();
    };
    
    window.openCookieSettings = function() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            // Load current preferences
            const consent = getCookie(CONSENT_COOKIE);
            if (consent) {
                const prefs = JSON.parse(consent);
                document.getElementById('analytics-toggle').checked = prefs.analytics || false;
            }
            modal.classList.add('active');
        }
    };
    
    window.closeCookieSettings = function() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    };
    
    window.saveCookiePreferences = function() {
        const preferences = {
            essential: true,
            analytics: document.getElementById('analytics-toggle').checked,
            marketing: false,
            timestamp: new Date().toISOString()
        };
        
        setCookie(CONSENT_COOKIE, JSON.stringify(preferences), 365);
        applyConsentPreferences(preferences);
        closeCookieSettings();
        hideCookieBanner();
    };
    
    function applyConsentPreferences(preferences) {
        // Handle Google Analytics
        if (preferences.analytics) {
            enableGoogleAnalytics();
        } else {
            disableGoogleAnalytics();
        }
        
        disableMarketingCookies();
    }
    
    function enableGoogleAnalytics() {
        // The page head defines a Consent Mode default stub, so checking
        // window.gtag would incorrectly imply that gtag.js is already loaded.
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};

        // Grant analytics storage only. Advertising signals remain denied.
        gtag('consent', 'update', {
            analytics_storage: 'granted'
        });

        if (!window.gaScriptLoaded) {
            window.gaScriptLoaded = true;

            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
            document.head.appendChild(script);

            gtag('js', new Date());
            gtag('config', GA_ID, {
                send_page_view: false,
                allow_google_signals: false,
                allow_ad_personalization_signals: false
            });
        }

        // Lets other site scripts act only once analytics consent exists.
        document.dispatchEvent(new CustomEvent('analytics-consent-granted'));

        window['ga-disable-' + GA_ID] = false;
        setCookie(ANALYTICS_COOKIE, 'enabled', 365);
    }
    
    function disableGoogleAnalytics() {
        // Disable Google Analytics
        window['ga-disable-' + GA_ID] = true;

        // Tell Consent Mode the visitor has denied analytics storage.
        // Advertising signals always remain denied.
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                analytics_storage: 'denied'
            });
        }
        
        // Remove existing GA cookies
        deleteCookie('_ga');
        deleteCookie('_gid');
        deleteCookie('_gat');
        deleteCookie(ANALYTICS_COOKIE);
    }
    
    function updateAdConsent() {
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
        window.gtag('consent', 'update', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
        });
    }

    function disableMarketingCookies() {
        updateAdConsent();
        // Delete any marketing-related cookies here
    }
    
    function hideCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.add('hidden');
        }
    }
    
    function addFooterLinkHandler() {
        // Find and update privacy policy cookie settings link
        const links = document.querySelectorAll('a[href="#cookie-settings"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                openCookieSettings();
            });
        });
    }
    
    // Cookie utility functions
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/;SameSite=Lax";
    }
    
    function getCookie(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for(let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return null;
    }
    
    function deleteCookie(name) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    }
    
})();
