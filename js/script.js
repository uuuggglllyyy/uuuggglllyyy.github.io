document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const body = document.body;
    let menuOpen = false;

    function toggleMenu() {
        menuOpen = !menuOpen;
        menuBtn.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('no-scroll');
    }

    function closeMenu() {
        if (menuOpen) {
            menuOpen = false;
            menuBtn.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    }

    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (menuOpen && !e.target.closest('.nav') && !e.target.closest('.mobile-menu-btn')) {
            closeMenu();
        }
    });

    // Close menu on scroll
    window.addEventListener('scroll', function() {
        closeMenu();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            closeMenu();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const headerHeight = document.querySelector('.header').offsetHeight;

            window.scrollTo({
                top: targetSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        });
    });

    // Animation on scroll
    function checkScroll() {
        const elements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-bottom');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load

    // Initialize map
    function initMap() {
        const map = L.map('map').setView([57.1522, 65.5272], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add delivery area circle
        L.circle([57.1522, 65.5272], {
            color: '#2c6e49',
            fillColor: '#2c6e49',
            fillOpacity: 0.2,
            radius: 10000
        }).addTo(map);

        // Add marker
        L.marker([57.1522, 65.5272])
            .addTo(map)
            .bindPopup('Доставка по всей Тюмени')
            .openPopup();
    }

    // Initialize map after a short delay to ensure DOM is fully loaded
    setTimeout(initMap, 500);
});