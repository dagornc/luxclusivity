// Animation du header au scroll
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        header.style.transform = 'translateY(-80px)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Animation des cartes au scroll
const cards = document.querySelectorAll('.search-card');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

cards.forEach(card => {
    observer.observe(card);
});

// Animation du texte hero
const heroText = document.querySelector('.hero-content h1');
const heroParagraph = document.querySelector('.hero-content p');

window.addEventListener('load', () => {
    heroText.classList.add('animate');
    setTimeout(() => {
        heroParagraph.classList.add('animate');
    }, 500);
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation des success stories
const successItems = document.querySelectorAll('.success-item');

// On n'observe plus les success stories car ils sont visibles par défaut maintenant
// Mais on ajoute toujours une petite animation au survol
successItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
    
    // Ajout d'une légère animation au survol
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.02)';
        item.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.8)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
        item.style.boxShadow = '0 15px 45px rgba(0, 0, 0, 0.6)';
    });
});

// Parallax effect pour la section hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('#hero');
    const scrollPosition = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Animation des boutons CTA
const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Gestion du chatbot
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChatbot = document.getElementById('close-chatbot');

if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.style.display = 'flex';
        setTimeout(() => {
            chatbotWindow.style.opacity = '1';
            chatbotWindow.style.transform = 'translateY(0)';
        }, 50);
    });
}

if (closeChatbot && chatbotWindow) {
    closeChatbot.addEventListener('click', () => {
        chatbotWindow.style.opacity = '0';
        chatbotWindow.style.transform = 'translateY(20px)';
        setTimeout(() => {
            chatbotWindow.style.display = 'none';
        }, 300);
    });
}

// Mise à jour de l'année copyright
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// Gestion du thème
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Change l'icône du bouton
        if (document.body.classList.contains('light-mode')) {
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des fonctionnalités
    initHeaderScroll();
    initHeroSlider();
    initIntersectionAnimations();
    initHeroTextAnimation();
    initSmoothScrolling();
    initTestimonialsSlider();
    initParallaxEffect();
    initPropertyFilters();
    initMobileNavigation();
    initFormValidation();
    initDarkMode(); // Initialisation du mode sombre
    initMandateFeatures(); // Nouvelle fonction pour filtres et modale mandats
    initHeaderSearchPanel(); // Nouvel appel pour le panneau avancé
});

/**
 * Animation du header lors du défilement
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Ajout de la classe scrolled lorsque la page défile
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Cache/affiche le header selon la direction du défilement
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Défilement vers le bas - cache le header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Défilement vers le haut - affiche le header
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Slider pour la section hero
 */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const nextBtn = document.querySelector('.hero-next');
    const prevBtn = document.querySelector('.hero-prev');
    let currentSlide = 0;
    let slideInterval;
    
    // Fonction pour afficher un slide spécifique
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    // Fonction pour passer au slide suivant
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Fonction pour revenir au slide précédent
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Initialisation du premier slide
    if (slides.length > 0) {
        showSlide(0);
        
        // Démarrage du slider automatique
        slideInterval = setInterval(nextSlide, 5000);
        
        // Ajout des événements pour les boutons
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', function() {
                clearInterval(slideInterval);
                nextSlide();
                slideInterval = setInterval(nextSlide, 5000);
            });
            
            prevBtn.addEventListener('click', function() {
                clearInterval(slideInterval);
                prevSlide();
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }
}

/**
 * Animation des éléments lors de leur apparition dans le viewport
 */
function initIntersectionAnimations() {
    // Sélection des éléments à animer
    const animatedElements = document.querySelectorAll('.property-card, .service-card, .about-image, .about-content');
    
    // Configuration de l'observateur d'intersection
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Création de l'observateur
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajout de la classe pour animer
                entry.target.classList.add('fade-in');
                // Arrêt de l'observation une fois animé
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observation des éléments
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Animation du texte dans la section hero
 */
function initHeroTextAnimation() {
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        // Ajout d'un délai pour permettre le chargement complet de la page
        setTimeout(() => {
            heroContent.classList.add('fade-in');
        }, 300);
    }
}

/**
 * Défilement fluide pour les liens d'ancrage
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fermeture du menu mobile si ouvert
                const mobileNav = document.querySelector('.mobile-nav');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                }
                
                // Calcul de la position de défilement avec offset pour le header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Animation fluide du défilement
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Slider pour la section témoignages
 */
function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialsContainer = document.querySelector('.testimonials-slider');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    if (testimonials.length > 1 && testimonialsContainer) {
        let currentTestimonial = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        
        // Fonction pour afficher un témoignage spécifique
        function showTestimonial(index) {
            testimonials.forEach((testimonial) => {
                testimonial.style.opacity = '0';
                testimonial.style.display = 'none';
            });
            
            testimonials[index].style.display = 'block';
            setTimeout(() => {
                testimonials[index].style.opacity = '1';
            }, 50);
        }
        
        // Fonction pour passer au témoignage suivant
        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }
        
        // Fonction pour revenir au témoignage précédent
        function prevTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        }
        
        // Initialisation du premier témoignage
        showTestimonial(0);
        
        // Ajout des événements pour les boutons de navigation
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                prevTestimonial();
            });
            
            nextBtn.addEventListener('click', function() {
                nextTestimonial();
            });
        }
        
        // Défilement automatique des témoignages
        const autoSlide = setInterval(nextTestimonial, 8000);
        
        // Arrêter le défilement automatique lors du clic sur les boutons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                clearInterval(autoSlide);
            });
            
            nextBtn.addEventListener('click', function() {
                clearInterval(autoSlide);
            });
        }
        
        // Gestion des événements tactiles pour le défilement
        testimonialsContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        testimonialsContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                nextTestimonial();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                prevTestimonial();
            }
        }
    }
}

/**
 * Effet de parallaxe pour l'image de fond de la section hero
 */
function initParallaxEffect() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        heroSlides.forEach(slide => {
            if (scrollPosition < window.innerHeight) {
                slide.style.backgroundPosition = `center ${50 + (scrollPosition * 0.1)}%`;
            }
        });
    });
}

/**
 * Filtres pour les propriétés
 */
function initPropertyFilters() {
    const filterButtons = document.querySelectorAll('.property-filter');
    const propertyCards = document.querySelectorAll('.property-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Suppression de la classe active des autres boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajout de la classe active au bouton cliqué
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filtrage des propriétés
                propertyCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        card.classList.contains(filterValue) 
                            ? card.style.display = 'block' 
                            : card.style.display = 'none';
                    }
                    
                    // Animation de réapparition
                    setTimeout(() => {
                        if (card.style.display === 'block') {
                            card.classList.add('fade-in');
                        }
                    }, 100);
                });
            });
        });
    }
}

/**
 * Gestion de la navigation mobile
 */
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const body = document.body;
    
    if (navToggle && mobileNav) {
        // Ouverture du menu mobile
        navToggle.addEventListener('click', function() {
            mobileNav.classList.add('active');
            body.style.overflow = 'hidden';
        });
        
        // Fermeture du menu mobile
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            });
        }
        
        // Fermeture lors du clic en dehors du menu
        document.addEventListener('click', function(e) {
            if (mobileNav.classList.contains('active') && 
                !mobileNav.contains(e.target) && 
                !navToggle.contains(e.target)) {
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

/**
 * Validation du formulaire de contact
 */
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            let isValid = true;
            let errorMessage = '';
            
            if (name === '') {
                isValid = false;
                errorMessage += 'Le nom est requis.\n';
                document.getElementById('name').classList.add('error');
            } else {
                document.getElementById('name').classList.remove('error');
            }
            
            // Validation email avec regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                isValid = false;
                errorMessage += 'L\'email n\'est pas valide.\n';
                document.getElementById('email').classList.add('error');
            } else {
                document.getElementById('email').classList.remove('error');
            }
            
            // Validation du numéro de téléphone (facultatif, mais doit être valide s'il est renseigné)
            if (phone !== '') {
                const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
                if (!phoneRegex.test(phone)) {
                    isValid = false;
                    errorMessage += 'Le numéro de téléphone n\'est pas valide.\n';
                    document.getElementById('phone').classList.add('error');
                } else {
                    document.getElementById('phone').classList.remove('error');
                }
            }
            
            if (message === '') {
                isValid = false;
                errorMessage += 'Le message est requis.\n';
                document.getElementById('message').classList.add('error');
            } else {
                document.getElementById('message').classList.remove('error');
            }
            
            // Affichage des erreurs ou soumission du formulaire
            if (!isValid) {
                // Création d'un élément pour afficher les erreurs
                const errorElement = document.createElement('div');
                errorElement.className = 'form-errors';
                errorElement.textContent = errorMessage;
                
                // Supprimer les messages d'erreur précédents
                const existingError = contactForm.querySelector('.form-errors');
                if (existingError) {
                    contactForm.removeChild(existingError);
                }
                
                // Ajouter le nouveau message d'erreur
                contactForm.insertBefore(errorElement, contactForm.firstChild);
            } else {
                // Simuler l'envoi du formulaire avec un message de succès
                contactForm.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Message envoyé avec succès!</h3><p>Nous vous recontacterons dans les plus brefs délais.</p></div>';
            }
        });
        
        // Réinitialisation des erreurs lors de la saisie
        const formFields = contactForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
}

/**
 * Gestion du thème sombre
 */
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    
    // Vérifie si une préférence est déjà enregistrée
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Vérifie la préférence système si aucune préférence n'est enregistrée
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Applique le thème initial
    if (isDarkMode || (prefersDarkScheme.matches && localStorage.getItem('darkMode') === null)) {
        root.classList.add('dark-mode');
    }
    
    // Bascule entre les modes
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDarkModeNow = root.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', isDarkModeNow);
            
            // Animation du bouton
            themeToggle.classList.add('clicked');
            setTimeout(() => {
                themeToggle.classList.remove('clicked');
            }, 300);
        });
    }
    
    // Écoute les changements de préférence système
    prefersDarkScheme.addEventListener('change', (e) => {
        if (localStorage.getItem('darkMode') === null) {
            if (e.matches) {
                root.classList.add('dark-mode');
            } else {
                root.classList.remove('dark-mode');
            }
        }
    });
}

// Ajout de styles CSS pour les animations
(function() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animation de fondu */
        .fade-in {
            animation: fadeInAnimation 0.8s ease forwards;
        }
        
        @keyframes fadeInAnimation {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Animation du header lors du défilement */
        header {
            transition: transform 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease;
        }
        
        header.scrolled {
            background-color: rgba(255, 255, 255, 0.98);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }
        
        /* Style pour les erreurs de formulaire */
        .form-control.error {
            border-color: #e53935;
        }
        
        /* Animation de succès pour le formulaire */
        .contact-form.success {
            animation: formSuccess 1s ease;
        }
        
        @keyframes formSuccess {
            0%, 100% {
                transform: translateX(0);
            }
            20%, 60% {
                transform: translateX(-5px);
            }
            40%, 80% {
                transform: translateX(5px);
            }
        }
        
        /* Animation pour les cartes de propriétés */
        .property-card, .service-card {
            opacity: 0;
            transform: translateY(30px);
            transition: transform 0.5s ease, box-shadow 0.3s ease, opacity 0.5s ease;
        }
        
        /* Transitions pour les témoignages */
        .testimonial {
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        /* Animation pour les boutons de type CTA */
        .btn-primary, .btn-secondary {
            position: relative;
            overflow: hidden;
        }
        
        .btn-primary:after, .btn-secondary:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s ease, height 0.6s ease;
            z-index: 1;
            pointer-events: none;
        }
        
        .btn-primary:hover:after, .btn-secondary:hover:after {
            width: 300px;
            height: 300px;
        }
        
        .btn-primary span, .btn-secondary span {
            position: relative;
            z-index: 2;
        }
    `;
    document.head.appendChild(style);
})();

// Année copyright dynamique
document.addEventListener('DOMContentLoaded', function() {
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});

// Slider de témoignages
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonialIndex = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.opacity = '0';
        testimonial.style.display = 'none';
    });
    
    testimonials[index].style.display = 'block';
    setTimeout(() => {
        testimonials[index].style.opacity = '1';
    }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    const prevTestimonialBtn = document.getElementById('prev-testimonial');
    const nextTestimonialBtn = document.getElementById('next-testimonial');
    
    if (testimonials.length > 0) {
        showTestimonial(currentTestimonialIndex);
        
        if (prevTestimonialBtn && nextTestimonialBtn) {
            prevTestimonialBtn.addEventListener('click', () => {
                currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonialIndex);
            });
            
            nextTestimonialBtn.addEventListener('click', () => {
                currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
                showTestimonial(currentTestimonialIndex);
            });
        }
        
        // Auto-rotation des témoignages
        setInterval(() => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
            showTestimonial(currentTestimonialIndex);
        }, 8000);
    }
});

// Validation du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            let isValid = true;
            let errorMessage = '';
            
            if (name === '') {
                isValid = false;
                errorMessage += 'Le nom est requis.\n';
                document.getElementById('name').classList.add('error');
            } else {
                document.getElementById('name').classList.remove('error');
            }
            
            // Validation email avec regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                isValid = false;
                errorMessage += 'L\'email n\'est pas valide.\n';
                document.getElementById('email').classList.add('error');
            } else {
                document.getElementById('email').classList.remove('error');
            }
            
            // Validation du numéro de téléphone (facultatif, mais doit être valide s'il est renseigné)
            if (phone !== '') {
                const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
                if (!phoneRegex.test(phone)) {
                    isValid = false;
                    errorMessage += 'Le numéro de téléphone n\'est pas valide.\n';
                    document.getElementById('phone').classList.add('error');
                } else {
                    document.getElementById('phone').classList.remove('error');
                }
            }
            
            if (message === '') {
                isValid = false;
                errorMessage += 'Le message est requis.\n';
                document.getElementById('message').classList.add('error');
            } else {
                document.getElementById('message').classList.remove('error');
            }
            
            // Affichage des erreurs ou soumission du formulaire
            if (!isValid) {
                // Création d'un élément pour afficher les erreurs
                const errorElement = document.createElement('div');
                errorElement.className = 'form-errors';
                errorElement.textContent = errorMessage;
                
                // Supprimer les messages d'erreur précédents
                const existingError = contactForm.querySelector('.form-errors');
                if (existingError) {
                    contactForm.removeChild(existingError);
                }
                
                // Ajouter le nouveau message d'erreur
                contactForm.insertBefore(errorElement, contactForm.firstChild);
            } else {
                // Simuler l'envoi du formulaire avec un message de succès
                contactForm.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Message envoyé avec succès!</h3><p>Nous vous recontacterons dans les plus brefs délais.</p></div>';
            }
        });
    }
});

// Optimisation du chargement des images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

/**
 * Filtres et Modale pour la section Mandats
 */
function initMandateFeatures() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.properties-grid .property-card');
    const modal = document.getElementById('mandate-modal');
    const modalCloseBtn = modal ? modal.querySelector('.modal-close') : null;
    const openModalBtns = document.querySelectorAll('.open-mandate-modal');

    // Gestion des filtres
    if (filterButtons.length > 0 && propertyCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const filterValue = this.getAttribute('data-filter');

                propertyCards.forEach(card => {
                    card.style.display = 'none'; // Masquer d'abord
                    card.classList.remove('fade-in'); // Retirer l'animation pour la réinitialisation

                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                         // Utiliser setTimeout pour laisser le temps au display:none de s'appliquer avant de réafficher
                        setTimeout(() => {
                            card.style.display = 'block';
                            // Forcer un reflow pour que l'animation fonctionne correctement
                            void card.offsetWidth;
                            card.classList.add('fade-in');
                        }, 10);
                    }
                });
            });
        });
    }

    // Gestion de la modale
    if (modal && modalCloseBtn && openModalBtns.length > 0) {
        // Fonction pour ouvrir la modale
        const openModal = (mandateData) => {
            // Simuler le chargement des données (remplacer par un appel AJAX si nécessaire)
            document.getElementById('modal-property-title').textContent = mandateData.title;
            document.getElementById('modal-property-location').textContent = mandateData.location;
            document.getElementById('modal-mandate-type').textContent = mandateData.type;
            document.getElementById('modal-commission').textContent = mandateData.commission;
            document.getElementById('modal-seller-info').textContent = mandateData.sellerInfo;
            document.getElementById('modal-mandate-ref').textContent = mandateData.ref;
            document.getElementById('modal-mandate-expiry').textContent = mandateData.expiry;
            document.getElementById('modal-price-net').textContent = mandateData.priceNet;
            document.getElementById('modal-internal-notes').textContent = mandateData.notes;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Empêcher le scroll de l'arrière-plan
        };

        // Fonction pour fermer la modale
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Rétablir le scroll
        };

        // Écouteurs pour les boutons "Détails Mandat"
        openModalBtns.forEach(button => {
            button.addEventListener('click', function() {
                const mandateId = this.getAttribute('data-mandate-id');
                // Ici, on simule la récupération des données basées sur l'ID.
                // Dans une vraie application, vous feriez un appel pour obtenir ces données.
                const fakeMandateData = {
                    "mandate-001": {
                        title: "Villa contemporaine vue panoramique",
                        location: "Saint-Jean-Cap-Ferrat",
                        type: "Exclusif",
                        commission: "3% Indicative",
                        sellerInfo: "Contact principal : M. Durand (Visites sur RDV uniquement via l'agent référent).",
                        ref: "LUX-SJCF-001",
                        expiry: "31/12/2024",
                        priceNet: "14 000 000 €",
                        notes: "Travaux de rafraîchissement de la piscine à prévoir. Négociation possible autour de 13.8M€. Vendeur motivé, recherche vente rapide avant fin d'année."
                    },
                     "mandate-002": {
                        title: "Penthouse d'exception avec terrasse",
                        location: "Paris 8ème",
                        type: "Exclusif",
                        commission: "2.5% Indicative",
                        sellerInfo: "Client très discret. Privilégier contact par email.",
                        ref: "LUX-PAR8-015",
                        expiry: "30/06/2025",
                        priceNet: "8 500 000 €",
                        notes: "Terrasse aménagée par paysagiste renommé. Charges de copropriété élevées."
                    },
                     "mandate-003": {
                        title: "Chalet de luxe skis aux pieds",
                        location: "Courchevel 1850",
                        type: "Off-Market",
                        commission: "Négociable (env. 4%)",
                        sellerInfo: "Accès informations restreint. Contacter le siège pour détails.",
                        ref: "LUX-COURCH-007",
                        expiry: "Non spécifié (mandat de recherche)",
                        priceNet: "Confidentiel",
                        notes: "Bien présenté uniquement aux clients qualifiés après validation. Potentiel d'extension."
                    },
                    // Ajouter ici les données pour les autres mandats (004, 005, 006)
                    "mandate-004": { title: "Domaine viticole...", location: "Luberon...", type: "Co-Exclusif", commission: "1.5%/1.5%", sellerInfo: "...", ref: "LUX-LUB-002", expiry: "...", priceNet: "...", notes: "..." },
                    "mandate-005": { title: "Appartement prestige...", location: "Monaco...", type: "Exclusif", commission: "3.5% Indicative", sellerInfo: "...", ref: "LUX-MC-021", expiry: "...", priceNet: "...", notes: "..." },
                    "mandate-006": { title: "Villa d'architecte...", location: "Ibiza...", type: "Nouveau Mandat", commission: "3% Indicative", sellerInfo: "...", ref: "LUX-IBZ-011", expiry: "...", priceNet: "...", notes: "..." },
                };
                openModal(fakeMandateData[mandateId] || {}); // Passer les données correspondantes
            });
        });

        // Écouteur pour le bouton de fermeture
        modalCloseBtn.addEventListener('click', closeModal);

        // Écouteur pour fermer en cliquant en dehors de la modale
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Écouteur pour fermer avec la touche Echap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
}

/**
 * Gère l'affichage du panneau de recherche avancée dans l'en-tête
 */
function initHeaderSearchPanel() {
    const searchToggleBtn = document.getElementById('search-toggle');
    const searchPanel = document.getElementById('header-search-panel');
    const searchPanelCloseBtn = searchPanel ? searchPanel.querySelector('.search-panel-close') : null;
    const mainSearchInput = document.getElementById('main-search-input');

    if (searchToggleBtn && searchPanel && searchPanelCloseBtn && mainSearchInput) {
        // Ouvrir le panneau
        searchToggleBtn.addEventListener('click', (event) => {
            event.stopPropagation(); 
            const isActive = searchPanel.classList.toggle('active');
            if (isActive) {
                mainSearchInput.focus(); 
            }
        });

        // Fermer le panneau avec le bouton X
        searchPanelCloseBtn.addEventListener('click', () => {
            searchPanel.classList.remove('active');
        });

        // Fermer le panneau en cliquant en dehors
        document.addEventListener('click', (e) => {
            if (!searchPanel.contains(e.target) && !searchToggleBtn.contains(e.target) && searchPanel.classList.contains('active')) {
                searchPanel.classList.remove('active');
            }
        });
        
        // Empêcher la fermeture si on clique dans le panneau lui-même
         searchPanel.addEventListener('click', (event) => {
            event.stopPropagation();
        });
        
        // Fermer avec la touche Echap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchPanel.classList.contains('active')) {
                searchPanel.classList.remove('active');
            }
        });
    }
} 