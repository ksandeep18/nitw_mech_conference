// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Close mobile menu if open
            navLinks.classList.remove('active');
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(section);
});

// Function to get items per page based on screen width
function getItemsPerPage() {
    if (window.innerWidth <= 768) {
        return 2; // 2 items per page on mobile
    } else {
        return 4; // 4 items per page on larger screens
    }
}

// Update pagination for committee section
function updateCommitteePage() {
    const items = document.querySelectorAll('.committee-member');
    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentCommitteePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    items.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    document.getElementById('pageInfo').textContent = `Page ${currentCommitteePage} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currentCommitteePage === 1;
    document.getElementById('nextPage').disabled = currentCommitteePage === totalPages;
}

// Update pagination for dates section
function updateDatesPage() {
    const items = document.querySelectorAll('.date-item');
    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentDatePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    items.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    document.getElementById('datePageInfo').textContent = `Page ${currentDatePage} of ${totalPages}`;
    document.getElementById('prevDatePage').disabled = currentDatePage === 1;
    document.getElementById('nextDatePage').disabled = currentDatePage === totalPages;
}

// Update pagination for awards section
function updateAwardsPage() {
    const items = document.querySelectorAll('.award-item');
    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentAwardPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    items.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    document.getElementById('awardPageInfo').textContent = `Page ${currentAwardPage} of ${totalPages}`;
    document.getElementById('prevAwardPage').disabled = currentAwardPage === 1;
    document.getElementById('nextAwardPage').disabled = currentAwardPage === totalPages;
}

// Update pagination for tracks section
function updateTracksPage() {
    const items = document.querySelectorAll('.track-item');
    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentTrackPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    items.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    document.getElementById('trackPageInfo').textContent = `Page ${currentTrackPage} of ${totalPages}`;
    document.getElementById('prevTrackPage').disabled = currentTrackPage === 1;
    document.getElementById('nextTrackPage').disabled = currentTrackPage === totalPages;
}

// Add window resize event listener
window.addEventListener('resize', () => {
    // Reset to first page when screen size changes
    currentCommitteePage = 1;
    currentDatePage = 1;
    currentAwardPage = 1;
    currentTrackPage = 1;
    
    // Update all paginations
    updateCommitteePage();
    updateDatesPage();
    updateAwardsPage();
    updateTracksPage();
});

// Initialize pagination
let currentCommitteePage = 1;
let currentDatePage = 1;
let currentAwardPage = 1;
let currentTrackPage = 1;

// Committee pagination
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentCommitteePage > 1) {
        currentCommitteePage--;
        updateCommitteePage();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    const items = document.querySelectorAll('.committee-member');
    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (currentCommitteePage < totalPages) {
        currentCommitteePage++;
        updateCommitteePage();
    }
});

// Dates pagination
document.getElementById('prevDatePage').addEventListener('click', () => {
    if (currentDatePage > 1) {
        currentDatePage--;
        updateDatesPage();
    }
});

document.getElementById('nextDatePage').addEventListener('click', () => {
    const items = document.querySelectorAll('.date-item');
    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (currentDatePage < totalPages) {
        currentDatePage++;
        updateDatesPage();
    }
});

// Awards pagination
document.getElementById('prevAwardPage').addEventListener('click', () => {
    if (currentAwardPage > 1) {
        currentAwardPage--;
        updateAwardsPage();
    }
});

document.getElementById('nextAwardPage').addEventListener('click', () => {
    const items = document.querySelectorAll('.award-item');
    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (currentAwardPage < totalPages) {
        currentAwardPage++;
        updateAwardsPage();
    }
});

// Tracks pagination
document.getElementById('prevTrackPage').addEventListener('click', () => {
    if (currentTrackPage > 1) {
        currentTrackPage--;
        updateTracksPage();
    }
});

document.getElementById('nextTrackPage').addEventListener('click', () => {
    const items = document.querySelectorAll('.track-item');
    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (currentTrackPage < totalPages) {
        currentTrackPage++;
        updateTracksPage();
    }
});

// Initialize all paginations
updateCommitteePage();
updateDatesPage();
updateAwardsPage();
updateTracksPage(); 