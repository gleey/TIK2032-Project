document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigasi aktif saat scroll (Updated)
    const setActiveNav = () => {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll("nav a");

        window.addEventListener("scroll", () => {
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100; // Offset for fixed navbar
                const sectionBottom = sectionTop + section.offsetHeight;
                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    current = section.getAttribute("id") || "";
                } else if (scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
                    // If at the bottom of the page, activate the last section (Contact)
                    current = sections[sections.length - 1].getAttribute("id");
                }
            });
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + current) {
                    link.classList.add("active");
                }
            });
        });
    };

    // 2. Animasi muncul saat scroll menggunakan Intersection Observer
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
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            observer.observe(element);
        });
    };

    // 3. Menampilkan toast notification
    const showToast = (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} fade-target`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    // 5. Lazy loading gambar menggunakan data-src
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

    // 6. Smooth scroll untuk navigasi anchor
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
    initLazyLoading();
    initSmoothScroll();

    // Notifikasi sambutan
    setTimeout(() => showToast('Selamat datang di Website Graciano! 🚀'), 1000);
});

// 7. Debounce resize event (opsional)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.transform = 'translateY(0)';
        });
    }, 250);
});
