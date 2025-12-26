// ============================================
// ILLIUM ADS - ELITE INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // PRELOADER WITH COUNTER
    // ============================================
    const preloader = document.getElementById('preloader');
    const percentEl = document.querySelector('.preloader-percent');
    let progress = 0;
    
    const counterInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(counterInterval);
        }
        if (percentEl) {
            percentEl.textContent = Math.floor(progress) + '%';
        }
    }, 100);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            progress = 100;
            if (percentEl) percentEl.textContent = '100%';
            clearInterval(counterInterval);
            
            setTimeout(() => {
                if (preloader) preloader.classList.add('complete');
                document.body.style.overflow = 'visible';
            }, 300);
        }, 2500);
    });

    // ============================================
    // ADVANCED CURSOR SYSTEM
    // ============================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    
    // Cursor trail particles
    const trailCount = 8;
    const trails = [];
    
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = 1 - (i / trailCount);
        trail.style.width = (8 - i) + 'px';
        trail.style.height = (8 - i) + 'px';
        document.body.appendChild(trail);
        trails.push({
            el: trail,
            x: 0,
            y: 0
        });
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Smooth follow
        dotX += (mouseX - dotX) * 0.35;
        dotY += (mouseY - dotY) * 0.35;
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        if (cursorDot) {
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';
        }
        
        if (cursorRing) {
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
        }
        
        // Trail animation
        let prevX = dotX;
        let prevY = dotY;
        
        trails.forEach((trail, i) => {
            const speed = 0.35 - (i * 0.03);
            trail.x += (prevX - trail.x) * speed;
            trail.y += (prevY - trail.y) * speed;
            trail.el.style.left = trail.x + 'px';
            trail.el.style.top = trail.y + 'px';
            prevX = trail.x;
            prevY = trail.y;
        });
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Cursor states
    const hoverTargets = document.querySelectorAll('a, button, [data-hover], .service-item, .result-item, .stat-card, .process-step, .contact-item');
    
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorRing) cursorRing.classList.add('expanded');
        });
        el.addEventListener('mouseleave', () => {
            if (cursorRing) cursorRing.classList.remove('expanded');
        });
    });
    
    document.addEventListener('mousedown', () => {
        if (cursorRing) cursorRing.style.transform = 'translate(-50%, -50%) scale(0.85)';
    });
    
    document.addEventListener('mouseup', () => {
        if (cursorRing) cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
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
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
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
        const originalText = el.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
        
        el.addEventListener('mouseenter', () => {
            let iterations = 0;
            const interval = setInterval(() => {
                el.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                }
                
                iterations += 1 / 3;
            }, 30);
        });
    });

    // ============================================
    // FORM HANDLING
    // ============================================
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
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
        background: linear-gradient(90deg, #00F0FF, #8B5CF6, #FF006E);
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
