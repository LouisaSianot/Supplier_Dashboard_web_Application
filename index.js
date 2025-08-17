// index.js - Landing Page JavaScript

// Statistics and dynamic content
const stats = {
    suppliers: 15,
    materials: 500,
    quotesGenerated: 1250,
    avgSavings: 18
};

// Feature highlights
const features = [
    {
        title: "Multiple Supplier Comparison",
        description: "Compare prices from trusted suppliers like Badili Hardware, Leon Building Supply, Hardware Haus, and more."
    },
    {
        title: "Instant Quote Generation", 
        description: "Get professional quotations in seconds, not hours. Perfect for contractors and builders."
    },
    {
        title: "Real-time Pricing",
        description: "Access up-to-date pricing information and stock availability from our supplier network."
    },
    {
        title: "Professional Documentation",
        description: "Generate print-ready quotations with detailed breakdowns and supplier information."
    }
];

// Popular materials from our database
const popularMaterials = [
    "Cement Sheets", "Paint & Coatings", "Electrical Supplies", 
    "Roofing Materials", "Tile Adhesives", "Hardware & Fittings"
];

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    populatePlaceholderContent();
    setupInteractiveElements();
    startCounterAnimations();
});

// Initialize scroll animations and page interactions
function initializeAnimations() {
    // Fade in hero section
    const heroSection = document.querySelector('.hero-section');
    heroSection.style.opacity = '0';
    heroSection.style.transform = 'translateY(30px)';
    heroSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    // Animate hero section on load
    setTimeout(() => {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }, 200);
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Add hover effects to CTA button
    setupCTAEffects();
}

// Setup scroll-based animations
function setupScrollAnimations() {
    const infoSection = document.querySelector('.info-section');
    
    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Setup info section animation
    infoSection.style.opacity = '0';
    infoSection.style.transform = 'translateY(30px)';
    infoSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(infoSection);
}

// Enhanced CTA button effects
function setupCTAEffects() {
    const ctaButton = document.querySelector('.cta-button');
    
    // Add ripple effect on click
    ctaButton.addEventListener('click', function(e) {
        createRippleEffect(e, this);
    });
    
    // Add pulse animation periodically
    setInterval(() => {
        if (!document.hidden) {
            ctaButton.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                ctaButton.style.animation = '';
            }, 600);
        }
    }, 5000);
}

// Create ripple effect for buttons
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    // Add ripple animation CSS if not exists
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            .feature-card {
                transition: all 0.3s ease;
            }
            .feature-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
            }
            .stat-number {
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Populate placeholder content with dynamic information
function populatePlaceholderContent() {
    const infoSection = document.querySelector('.info-section');
    const placeholders = infoSection.querySelectorAll('.placeholder-text');
    
    // Replace placeholders with actual content
    const newContent = `
        <!-- Statistics Section -->
        <div class="stats-section" style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        ">
            <div class="stat-item" style="text-align: center;">
                <div class="stat-number" style="font-size: 2.5em; font-weight: bold; color: #007bff;">0</div>
                <div style="color: #666; font-size: 0.9em;">Trusted Suppliers</div>
            </div>
            <div class="stat-item" style="text-align: center;">
                <div class="stat-number" style="font-size: 2.5em; font-weight: bold; color: #28a745;">0</div>
                <div style="color: #666; font-size: 0.9em;">Available Materials</div>
            </div>
            <div class="stat-item" style="text-align: center;">
                <div class="stat-number" style="font-size: 2.5em; font-weight: bold; color: #ffc107;">0</div>
                <div style="color: #666; font-size: 0.9em;">Quotes Generated</div>
            </div>
            <div class="stat-item" style="text-align: center;">
                <div class="stat-number" style="font-size: 2.5em; font-weight: bold; color: #dc3545;">0%</div>
                <div style="color: #666; font-size: 0.9em;">Average Savings</div>
            </div>
        </div>
        
        <!-- Features Section -->
        <h3 style="color: #333; margin: 30px 0 20px 0; font-size: 1.3em;">Why Choose BuildQuote?</h3>
        <div class="features-grid" style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        ">
            ${features.map((feature, index) => `
                <div class="feature-card" style="
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    border-left: 4px solid ${getFeatureColor(index)};
                ">
                    <h4 style="color: #333; margin-bottom: 10px; font-size: 1.1em;">${feature.title}</h4>
                    <p style="color: #666; font-size: 0.95em; line-height: 1.5;">${feature.description}</p>
                </div>
            `).join('')}
        </div>
        
        <!-- Popular Materials -->
        <h3 style="color: #333; margin: 30px 0 15px 0; font-size: 1.3em;">Popular Materials</h3>
        <div class="materials-tags" style="
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 30px;
        ">
            ${popularMaterials.map(material => `
                <span class="material-tag" style="
                    background: #e9ecef;
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-size: 0.9em;
                    color: #495057;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='#007bff'; this.style.color='white'"
                   onmouseout="this.style.background='#e9ecef'; this.style.color='#495057'"
                   onclick="searchMaterial('${material}')"
                >${material}</span>
            `).join('')}
        </div>
        
        <!-- Getting Started -->
        <div class="getting-started" style="
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            margin-top: 30px;
        ">
            <h3 style="margin-bottom: 15px; font-size: 1.4em;">Ready to Get Started?</h3>
            <p style="margin-bottom: 20px; opacity: 0.9;">Join hundreds of contractors and builders who save time and money with BuildQuote.</p>
            <a href="quotation.html" class="secondary-cta" style="
                background: white;
                color: #007bff;
                padding: 12px 25px;
                border-radius: 5px;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
            >Create Your First Quote</a>
        </div>
    `;
    
    // Remove placeholders and add new content
    placeholders.forEach(placeholder => placeholder.remove());
    infoSection.insertAdjacentHTML('beforeend', newContent);
}

// Get feature card colors
function getFeatureColor(index) {
    const colors = ['#007bff', '#28a745', '#ffc107', '#dc3545'];
    return colors[index % colors.length];
}

// Animate counter numbers
function startCounterAnimations() {
    setTimeout(() => {
        const statNumbers = document.querySelectorAll('.stat-number');
        const values = [stats.suppliers, stats.materials, stats.quotesGenerated, stats.avgSavings];
        
        statNumbers.forEach((element, index) => {
            animateCounter(element, values[index], index === 3 ? '%' : '');
        });
    }, 1000);
}

// Counter animation function
function animateCounter(element, targetValue, suffix = '') {
    let currentValue = 0;
    const increment = targetValue / 60; // 60 frames for smooth animation
    const duration = 2000; // 2 seconds
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue) + suffix;
    }, stepTime);
}

// Setup interactive elements
function setupInteractiveElements() {
    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading state to CTA buttons
    document.querySelectorAll('a[href="quotation.html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                
                // Reset after a short delay (in case navigation fails)
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = originalText;
                }, 3000);
            }
        });
    });
}

// Search for specific material (redirects to quotation page)
function searchMaterial(materialName) {
    // Store the search term in sessionStorage for the quotation page
    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem('searchMaterial', materialName);
    }
    
    // Add visual feedback
    event.target.style.transform = 'scale(0.95)';
    setTimeout(() => {
        window.location.href = 'quotation.html';
    }, 200);
}

// Add page visibility change handling for animations
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, #007bff, #28a745);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress indicator
addScrollProgress();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Quick access keys
    if (e.altKey && e.key === 'q') {
        e.preventDefault();
        window.location.href = 'quotation.html';
    }
});

// Performance optimization: Lazy load non-critical features
setTimeout(() => {
    // Add additional enhancements after initial load
    addParallaxEffect();
    setupAdvancedInteractions();
}, 2000);

// Parallax effect for hero section
function addParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Advanced interactions
function setupAdvancedInteractions() {
    // Add hover effects to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to hero title (subtle enhancement)
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle && !heroTitle.dataset.animated) {
        heroTitle.dataset.animated = 'true';
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after hero animation
        setTimeout(typeWriter, 1000);
    }
}