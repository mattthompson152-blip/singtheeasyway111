/** 
 * GDPR Cookie Consent Manager
 * Handles Google Analytics, SimplyBook.me, and JotForm consent
 */

(function() {
    'use strict';
    
    // Cookie names
    const CONSENT_COOKIE = 'SingTheEasyWay_Consent';
    const ANALYTICS_COOKIE = 'SingTheEasyWay_Analytics';
    const MARKETING_COOKIE = 'SingTheEasyWay_Marketing';
    
    // Google Analytics ID
    const GA_ID = 'G-72QBZSZZBP';
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initCookieConsent();
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
                    <p>We use cookies to enhance your browsing experience, serve personalised content, and analyse our traffic. 
                    By clicking "Accept All", you consent to our use of cookies. <a href="privacy-policy.html">Read our Privacy Policy</a></p>
                </div>
                <div class="cookie-banner-buttons">
                    <button class="cookie-btn cookie-btn-accept" onclick="acceptAllCookies()">Accept All</button>
                    <button class="cookie-btn cookie-btn-settings" onclick="openCookieSettings()">Cookie Settings</button>
                    <button class="cookie-btn cookie-btn-reject" onclick="rejectAllCookies()">Reject All</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
        
        // Create settings modal
        createSettingsModal();
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
                        Includes: Session cookies, SimplyBook.me booking system, JotForm forms
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
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <div>
                            <h3>Marketing Cookies</h3>
                            <p>Used to deliver personalised advertisements and content.</p>
                        </div>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="marketing-toggle">
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
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
            marketing: true,
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
                document.getElementById('marketing-toggle').checked = prefs.marketing || false;
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
            marketing: document.getElementById('marketing-toggle').checked,
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
        
        // Handle Marketing cookies
        if (preferences.marketing) {
            enableMarketingCookies();
        } else {
            disableMarketingCookies();
        }
    }
    
    function enableGoogleAnalytics() {
        // Load Google Analytics
        if (!window.gtag) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
            document.head.appendChild(script);
            
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', GA_ID);
        }
        setCookie(ANALYTICS_COOKIE, 'enabled', 365);
    }
    
    function disableGoogleAnalytics() {
        // Disable Google Analytics
        window['ga-disable-' + GA_ID] = true;
        
        // Remove existing GA cookies
        deleteCookie('_ga');
        deleteCookie('_gid');
        deleteCookie('_gat');
        deleteCookie(ANALYTICS_COOKIE);
    }
    
    function enableMarketingCookies() {
        setCookie(MARKETING_COOKIE, 'enabled', 365);
    }
    
    function disableMarketingCookies() {
        deleteCookie(MARKETING_COOKIE);
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