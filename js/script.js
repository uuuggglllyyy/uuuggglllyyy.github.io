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

    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Close mobile menu if open
            menuBtn.classList.remove('active');
            nav.classList.remove('active');

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
        const elements = document.querySelectorAll('.animate-top, .animate-bottom, .animate-left, .animate-right, .animate-opacity');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('active');
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