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
        });
        
        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
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
    
});
