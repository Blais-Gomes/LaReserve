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
class ImageCarousel {
    constructor(carouselElement) {
        this.carousel = carouselElement;
        this.images = carouselElement.querySelectorAll('.carousel-image');
        this.indicators = carouselElement.querySelectorAll('.indicator');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        // Vérifier que nous avons des images
        if (this.images.length === 0) return;
        
        // Ajouter les event listeners pour les indicateurs
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });
        
        // Démarrer le défilement automatique
        this.startAutoPlay();
        
        // Pause sur hover (desktop uniquement)
        if (window.innerWidth > 768) {
            this.carousel.addEventListener('mouseenter', () => {
                this.pauseAutoPlay();
            });
            
            this.carousel.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
        }
    }
    
    goToSlide(index) {
        // Retirer la classe active de l'image et indicateur actuels
        this.images[this.currentIndex].classList.remove('active');
        this.indicators[this.currentIndex].classList.remove('active');
        
        // Mettre à jour l'index
        this.currentIndex = index;
        
        // Ajouter la classe active à la nouvelle image et indicateur
        this.images[this.currentIndex].classList.add('active');
        this.indicators[this.currentIndex].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.goToSlide(nextIndex);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change toutes les 5 secondes
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.pauseAutoPlay();
        this.startAutoPlay();
    }
}

// Initialiser les carousels quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    // Attendre un petit délai pour que les images se chargent
    setTimeout(() => {
        const carousels = document.querySelectorAll('.image-carousel');
        carousels.forEach(carousel => {
            new ImageCarousel(carousel);
        });
    }, 100);
});
