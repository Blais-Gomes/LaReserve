// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Carousel script loaded');
    
    // Initialiser les carousels
    const carousels = document.querySelectorAll('.image-carousel');
    console.log('Carousels found:', carousels.length);
    
    carousels.forEach((carousel, carouselIndex) => {
        console.log(`Initializing carousel ${carouselIndex}`);
        
        const images = carousel.querySelectorAll('.carousel-image');
        const indicators = carousel.querySelectorAll('.indicator');
        let currentIndex = 0;
        let autoPlayInterval;
        
        console.log(`Images in carousel ${carouselIndex}:`, images.length);
        console.log(`Indicators in carousel ${carouselIndex}:`, indicators.length);
        
        // Vérifier que les images existent
        if (images.length === 0) {
            console.error(`No images found in carousel ${carouselIndex}`);
            return;
        }
        
        // Fonction pour aller à une slide spécifique
        function goToSlide(index) {
            console.log(`Going to slide ${index} in carousel ${carouselIndex}`);
            
            // Retirer active de tous
            images.forEach((img, imgIndex) => {
                img.classList.remove('active');
                img.style.opacity = '0';
                img.style.visibility = 'hidden';
                img.style.zIndex = '0';
            });
            
            indicators.forEach(ind => {
                ind.classList.remove('active');
            });
            
            // Ajouter active au bon index
            if (images[index]) {
                images[index].classList.add('active');
                images[index].style.opacity = '1';
                images[index].style.visibility = 'visible';
                images[index].style.zIndex = '1';
            }
            
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
            
            currentIndex = index;
        }
        
        // Fonction pour la slide suivante
        function nextSlide() {
            const nextIndex = (currentIndex + 1) % images.length;
            goToSlide(nextIndex);
        }
        
        // Fonctions pour l'autoplay
        function startAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 5000);
            console.log(`Auto-play started for carousel ${carouselIndex}`);
        }
        
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
                console.log(`Auto-play stopped for carousel ${carouselIndex}`);
            }
        }
        
        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }
        
        // Initialiser l'état de départ
        goToSlide(0);
        
        // Event listeners pour les indicateurs
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Indicator ${index} clicked in carousel ${carouselIndex}`);
                goToSlide(index);
                resetAutoPlay();
            });
        });
        
        // Pause sur hover (desktop seulement)
        if (window.innerWidth > 768) {
            carousel.addEventListener('mouseenter', () => {
                console.log(`Mouse entered carousel ${carouselIndex}`);
                stopAutoPlay();
            });
            
            carousel.addEventListener('mouseleave', () => {
                console.log(`Mouse left carousel ${carouselIndex}`);
                startAutoPlay();
            });
        }
        
        // Démarrer l'autoplay
        setTimeout(() => {
            startAutoPlay();
        }, 1000);
        
        console.log(`Carousel ${carouselIndex} initialized successfully`);
    });
});