// Only keep scroll-based active link highlighting and smooth scroll for navigation links

// Sidebar open/close logic for right-side menu
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const navLinks = document.getElementById('navLinks');
const body = document.body;

function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    menuBtn.classList.add('active');
    body.style.overflow = 'hidden';
}
function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    menuBtn.classList.remove('active');
    body.style.overflow = '';
}
menuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (sidebar.classList.contains('active')) {
        closeSidebar();
    } else {
        openSidebar();
    }
});
sidebarOverlay.addEventListener('click', closeSidebar);
// Close sidebar when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeSidebar);
});
// Close sidebar on ESC key
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeSidebar();
});

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 0;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll-based animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section, .nitw-box, .committee-member, .date-item, .track-item, .award-item, .instruction-item, .venue-item, .sponsor-item, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
            
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Add initial styles for animation
    const elements = document.querySelectorAll('.section, .nitw-box, .committee-member, .date-item, .track-item, .award-item, .instruction-item, .venue-item, .sponsor-item, .contact-info, .contact-form');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        animateOnScroll();
        highlightActiveSection();
    });

    // Initial check for elements in view
    animateOnScroll();
});

// Highlight active section in navigation
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}
