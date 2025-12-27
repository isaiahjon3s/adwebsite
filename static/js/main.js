// ============================================
// ILLIUM ADS - ELITE INTERACTIONS
// ============================================

// Global scroll helper function
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        // For 'about' section, scroll so hero is completely out of view
        if (sectionId === 'about') {
            const hero = document.querySelector('.hero');
            if (hero) {
                const heroBottom = hero.offsetTop + hero.offsetHeight;
                window.scrollTo({
                    top: heroBottom,
                    behavior: 'smooth'
                });
                return;
            }
        }
        
        const nav = document.querySelector('.nav');
        const navHeight = nav ? nav.offsetHeight : 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // PRELOADER WITH COUNTER
    // ============================================
    const preloader = document.getElementById('preloader');
    const percentEl = document.querySelector('.preloader-percent');
    let progress = 0;
    let isLoaded = false;
    let animationComplete = false;
    const MIN_DISPLAY_TIME = 2500; // Minimum time to show preloader (for ILLIUM animation)
    const startTime = Date.now();
    
    const updateDisplay = () => {
        if (percentEl) percentEl.textContent = Math.floor(progress) + '%';
        document.documentElement.style.setProperty('--load-progress', progress + '%');
    };
    
    const animateToTarget = (target, speed, callback) => {
        const animate = () => {
            if (progress < target) {
                progress += speed;
                if (progress > target) progress = target;
                updateDisplay();
                requestAnimationFrame(animate);
            } else if (callback) {
                callback();
            }
        };
        requestAnimationFrame(animate);
    };
    
    const hidePreloader = () => {
        if (preloader) preloader.classList.add('complete');
        document.body.style.overflow = 'visible';
    };
    
    const checkAndHide = () => {
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsed);
        
        // Wait for minimum display time to let ILLIUM animation complete
        setTimeout(hidePreloader, remainingTime + 300);
    };
    
    // Start loading - slower initial progress
    animateToTarget(40, 0.8);
    
    // Gradually increase to 70% while waiting
    setTimeout(() => {
        if (!isLoaded) animateToTarget(70, 0.5);
    }, 800);
    
    // When page is fully loaded
    window.addEventListener('load', () => {
        isLoaded = true;
        
        // Smoothly finish to 100%
        animateToTarget(100, 1.5, () => {
            updateDisplay();
            checkAndHide();
        });
    });

    // ============================================
    // MAGNETIC ELEMENTS
    // ============================================
    const magneticElements = document.querySelectorAll('.btn, .nav-cta, .nav-logo');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            
            el.style.transform = `translate(${deltaX * 0.25}px, ${deltaY * 0.25}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });

    // ============================================
    // 3D TILT EFFECT
    // ============================================
    const tiltElements = document.querySelectorAll('.hero-dashboard, .testimonial-block');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 8;
            const rotateX = ((centerY - y) / centerY) * 8;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ============================================
    // NAVBAR SCROLL
    // ============================================
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // ============================================
    // SCROLL REVEAL (Intersection Observer)
    // ============================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // STAGGERED GRID REVEAL
    // ============================================
    const gridItems = document.querySelectorAll('.service-item, .result-item, .process-step');
    
    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const allItems = entry.target.parentElement.children;
                const index = Array.from(allItems).indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
            }
        });
    }, { threshold: 0.1 });
    
    gridItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        item.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        gridObserver.observe(item);
    });

    // ============================================
    // PARALLAX GRADIENTS
    // ============================================
    const gradients = document.querySelectorAll('.hero-gradient');
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        
        gradients.forEach((gradient, i) => {
            const speed = (i + 1) * 0.4;
            const currentTransform = gradient.style.transform || '';
            gradient.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const counters = document.querySelectorAll('.stat-value, .stat-big');
    let countersAnimated = false;
    
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    function animateCounters() {
        if (countersAnimated) return;
        
        const firstCounter = counters[0];
        if (!firstCounter) return;
        
        const rect = firstCounter.getBoundingClientRect();
        
        if (rect.top < window.innerHeight * 0.85) {
            countersAnimated = true;
            
            counters.forEach(counter => {
                const text = counter.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const hasDollar = text.includes('$');
                const hasM = text.includes('M');
                const hasX = text.includes('x');
                const hasMinus = text.startsWith('-');
                
                let numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));
                const duration = 2500;
                const startTime = performance.now();
                
                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = easeOutQuart(progress);
                    
                    let current = numericValue * easedProgress;
                    let displayValue = text.includes('.') ? current.toFixed(1) : Math.floor(current);
                    
                    let display = displayValue.toString();
                    if (hasMinus) display = '-' + display;
                    if (hasDollar) display = '$' + display;
                    if (hasM) display = display + 'M';
                    if (hasPlus) display = display + '+';
                    if (hasPercent) display = display + '%';
                    if (hasX) display = display + 'x';
                    
                    counter.textContent = display;
                    
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = text;
                    }
                }
                
                requestAnimationFrame(update);
            });
        }
    }
    
    window.addEventListener('scroll', animateCounters);
    setTimeout(animateCounters, 3500);

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                const nav = document.querySelector('.nav');
                const navHeight = nav ? nav.offsetHeight : 80;
                // Scroll further down so section fills the screen
                const targetPosition = target.offsetTop - navHeight + 40;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // TEXT GLITCH EFFECT ON HOVER
    // ============================================
    const glitchElements = document.querySelectorAll('.nav-logo');
    
    glitchElements.forEach(el => {
        const textSpan = el.querySelector('span');
        if (!textSpan) return;
        
        const originalText = textSpan.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let isAnimating = false;
        
        el.addEventListener('mouseenter', () => {
            if (isAnimating) return;
            isAnimating = true;
            
            let iterations = 0;
            const interval = setInterval(() => {
                textSpan.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    textSpan.textContent = originalText;
                    isAnimating = false;
                }
                
                iterations += 1 / 2;
            }, 40);
        });
    });

    // ============================================
    // FORM HANDLING WITH CUSTOM VALIDATION
    // ============================================
    const form = document.getElementById('contactForm');
    
    if (form) {
        // Custom validation messages
        const validationMessages = {
            name: 'Please enter your name',
            email: 'Please enter a valid email address',
            message: 'Please tell us about your business'
        };
        
        // Validate a single field
        function validateField(field) {
            const errorEl = document.getElementById(`${field.id}-error`);
            let isValid = true;
            let message = '';
            
            // Remove previous states
            field.classList.remove('error', 'valid');
            if (errorEl) errorEl.classList.remove('show');
            
            // Check if empty (for required fields)
            if (field.hasAttribute('required') && !field.value.trim()) {
                isValid = false;
                message = validationMessages[field.id] || 'This field is required';
            }
            // Check email format
            else if (field.type === 'email' && field.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    message = 'Please enter a valid email address';
                }
            }
            
            // Apply states
            if (!isValid) {
                field.classList.add('error');
                if (errorEl) {
                    errorEl.textContent = message;
                    errorEl.classList.add('show');
                }
            } else if (field.value.trim()) {
                field.classList.add('valid');
            }
            
            return isValid;
        }
        
        // Clear error when user starts typing
        const formFields = form.querySelectorAll('input[required], textarea[required]');
        formFields.forEach(field => {
            field.addEventListener('input', () => {
                const errorEl = document.getElementById(`${field.id}-error`);
                field.classList.remove('error');
                if (errorEl) errorEl.classList.remove('show');
            });
        });
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate all fields only on submit
            let isFormValid = true;
            formFields.forEach(field => {
                if (!validateField(field)) {
                    isFormValid = false;
                }
            });
            
            if (!isFormValid) {
                // Focus first invalid field
                const firstError = form.querySelector('.error');
                if (firstError) firstError.focus();
                return;
            }
            
            const formMessage = document.getElementById('formMessage');
            const submitBtn = form.querySelector('.form-submit');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            const formData = {
                name: form.querySelector('#name').value,
                email: form.querySelector('#email').value,
                message: form.querySelector('#message').value
            };
            
            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (formMessage) {
                    formMessage.textContent = result.message;
                    formMessage.classList.add('show');
                }
                
                if (result.success) {
                    form.reset();
                    // Clear valid states
                    formFields.forEach(field => field.classList.remove('valid'));
                }
            } catch (error) {
                if (formMessage) {
                    formMessage.textContent = 'Something went wrong. Please try again.';
                    formMessage.classList.add('show');
                }
            }
            
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            
            setTimeout(() => {
                if (formMessage) formMessage.classList.remove('show');
            }, 5000);
        });
    }

    // ============================================
    // TYPING EFFECT FOR HERO
    // ============================================
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(el => {
        const text = el.getAttribute('data-typing');
        el.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50 + Math.random() * 50);
            }
        }
        
        setTimeout(type, 3000);
    });

    // ============================================
    // FLOATING ANIMATION ENHANCEMENT
    // ============================================
    const floatCards = document.querySelectorAll('.float-card');
    
    floatCards.forEach((card, index) => {
        card.style.animationDelay = `${index * -2}s`;
    });

    // ============================================
    // LINE ANIMATION IN HERO
    // ============================================
    const heroLines = document.querySelector('.hero-lines');
    
    if (heroLines) {
        for (let i = 0; i < 5; i++) {
            const line = document.createElement('div');
            line.className = 'hero-line';
            line.style.left = `${10 + i * 20}%`;
            line.style.animationDelay = `${i * -1.5}s`;
            heroLines.appendChild(line);
        }
    }

    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================
    document.querySelectorAll('.btn, .form-submit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 0;
                height: 0;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                left: ${x}px;
                top: ${y}px;
                animation: rippleEffect 0.6s ease-out forwards;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 2px;
        background: linear-gradient(90deg, #BFFF00, #3B82F6);
        z-index: 10000;
        transform-origin: left;
        transform: scaleX(0);
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        progressBar.style.transform = `scaleX(${scrollPercent})`;
    });

});
