// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Simple AOS-like animation implementation
    const animateElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Gallery item click handler (optional - could open lightbox)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Here you could add lightbox functionality
            console.log('Gallery item clicked');
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les carousels
    const carousels = document.querySelectorAll('.image-carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        const indicators = carousel.querySelectorAll('.indicator');
        let currentIndex = 0;
        let autoPlayInterval;
        
        // S'assurer que seule la première image est visible au début
        images.forEach((img, index) => {
            if (index === 0) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
        
        // S'assurer que seul le premier indicateur est actif
        indicators.forEach((indicator, index) => {
            if (index === 0) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        function goToSlide(index) {
            // Retirer active de tous
            images.forEach(img => img.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));
            
            // Ajouter active au bon index
            images[index].classList.add('active');
            indicators[index].classList.add('active');
            
            currentIndex = index;
        }
        
        function nextSlide() {
            const nextIndex = (currentIndex + 1) % images.length;
            goToSlide(nextIndex);
        }
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        
        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }
        
        // Event listeners pour les indicateurs
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                resetAutoPlay();
            });
        });
        
        // Pause sur hover (desktop)
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        
        // Démarrer l'autoplay
        startAutoPlay();
    });
});
