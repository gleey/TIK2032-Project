document.addEventListener('DOMContentLoaded', () => {
    // 1. Fungsi Navigasi Aktif dengan Error Handling
    const setActiveNav = () => {
        try {
            const currentPath = window.location.pathname.split('/').pop();
            document.querySelectorAll('nav a').forEach(link => {
                const linkPath = link.getAttribute('href').split('/').pop();
                link.classList.toggle('active', 
                    currentPath === linkPath ||
                    (currentPath === '' && linkPath === 'index.html')
                );
            });
        } catch (error) {
            console.error('Error setting active navigation:', error);
        }
    };

    // 2. Animasi Modern dengan Intersection Observer
    const animateOnScroll = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-target').forEach(element => {
            element.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            observer.observe(element);
        });
    };

    // 3. Sistem Toast Notification
    const showToast = (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} fade-target`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    // 4. Fitur Dark Mode
    const initDarkMode = () => {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.id = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '🌓';
        
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // Cek localStorage
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }

        document.body.appendChild(darkModeToggle);
    };

    // 5. Optimasi Gambar dengan Lazy Loading
    const initLazyLoading = () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imgObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imgObserver.observe(img));
    };

    // 6. Smooth Scroll
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
    };

    // Inisialisasi semua fitur
    setActiveNav();
    animateOnScroll();
    initDarkMode();
    initLazyLoading();
    initSmoothScroll();
    initFormValidation();
    
    // Notifikasi selamat datang yang tidak mengganggu
    setTimeout(() => showToast('Selamat datang di Website Graciano! 🚀'), 1000);
});

// 7. Debounce untuk Event Resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.transform = 'translateY(0)';
        });
    }, 250);
});