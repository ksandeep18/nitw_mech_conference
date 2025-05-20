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

document.addEventListener('DOMContentLoaded', function() {
    // Committee pagination
    const membersPerPage = 4;
    const committeeMembers = document.querySelectorAll('.committee-member');
    const totalPages = Math.ceil(committeeMembers.length / membersPerPage);
    let currentPage = 1;

    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');

    // Dates pagination
    const datesPerPage = 4;
    const dateItems = document.querySelectorAll('.date-item');
    const totalDatePages = Math.ceil(dateItems.length / datesPerPage);
    let currentDatePage = 1;

    const prevDateButton = document.getElementById('prevDatePage');
    const nextDateButton = document.getElementById('nextDatePage');
    const datePageInfo = document.getElementById('datePageInfo');

    // Awards pagination
    const awardsPerPage = 4;
    const awardItems = document.querySelectorAll('.award-item');
    const totalAwardPages = Math.ceil(awardItems.length / awardsPerPage);
    let currentAwardPage = 1;

    const prevAwardButton = document.getElementById('prevAwardPage');
    const nextAwardButton = document.getElementById('nextAwardPage');
    const awardPageInfo = document.getElementById('awardPageInfo');

    // Instructions pagination
    const instructionsPerPage = 4;
    const instructionItems = document.querySelectorAll('.instruction-item');
    const totalInstructionPages = Math.ceil(instructionItems.length / instructionsPerPage);
    let currentInstructionPage = 1;

    const prevInstructionButton = document.getElementById('prevInstructionPage');
    const nextInstructionButton = document.getElementById('nextInstructionPage');
    const instructionPageInfo = document.getElementById('instructionPageInfo');

    // Venue pagination
    const venuePerPage = 4;
    const venueItems = document.querySelectorAll('.venue-item');
    const totalVenuePages = Math.ceil(venueItems.length / venuePerPage);
    let currentVenuePage = 1;

    const prevVenueButton = document.getElementById('prevVenuePage');
    const nextVenueButton = document.getElementById('nextVenuePage');
    const venuePageInfo = document.getElementById('venuePageInfo');

    // Sponsors pagination
    const sponsorsPerPage = 2;
    const sponsorItems = document.querySelectorAll('.sponsor-item');
    const totalSponsorPages = Math.ceil(sponsorItems.length / sponsorsPerPage);
    let currentSponsorPage = 1;

    const prevSponsorButton = document.getElementById('prevSponsorPage');
    const nextSponsorButton = document.getElementById('nextSponsorPage');
    const sponsorPageInfo = document.getElementById('sponsorPageInfo');

    function updatePageInfo() {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }

    function updateDatePageInfo() {
        datePageInfo.textContent = `Page ${currentDatePage} of ${totalDatePages}`;
    }

    function showPage(page, items, perPage, prevBtn, nextBtn, pageInfo, currentPageVar, totalPagesVar) {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        
        // Add slide-out animation to current cards
        items.forEach((item, index) => {
            if (index >= start && index < end) {
                if (page > currentPageVar) {
                    item.classList.add('slide-right');
                } else {
                    item.classList.add('slide-left');
                }
            }
        });

        // After animation, update visibility and remove slide classes
        setTimeout(() => {
            items.forEach((item, index) => {
                if (index >= start && index < end) {
                    item.style.display = 'block';
                    item.classList.remove('slide-left', 'slide-right');
                } else {
                    item.style.display = 'none';
                }
            });
        }, 500);

        // Update button states
        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === totalPagesVar;
        
        // Update page info
        pageInfo.textContent = `Page ${page} of ${totalPagesVar}`;
    }

    // Committee pagination event listeners
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage, committeeMembers, membersPerPage, prevButton, nextButton, pageInfo, currentPage, totalPages);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage, committeeMembers, membersPerPage, prevButton, nextButton, pageInfo, currentPage, totalPages);
        }
    });

    // Dates pagination event listeners
    prevDateButton.addEventListener('click', () => {
        if (currentDatePage > 1) {
            currentDatePage--;
            showPage(currentDatePage, dateItems, datesPerPage, prevDateButton, nextDateButton, datePageInfo, currentDatePage, totalDatePages);
        }
    });

    nextDateButton.addEventListener('click', () => {
        if (currentDatePage < totalDatePages) {
            currentDatePage++;
            showPage(currentDatePage, dateItems, datesPerPage, prevDateButton, nextDateButton, datePageInfo, currentDatePage, totalDatePages);
        }
    });

    // Awards pagination event listeners
    prevAwardButton.addEventListener('click', () => {
        if (currentAwardPage > 1) {
            currentAwardPage--;
            showPage(currentAwardPage, awardItems, awardsPerPage, prevAwardButton, nextAwardButton, awardPageInfo, currentAwardPage, totalAwardPages);
        }
    });

    nextAwardButton.addEventListener('click', () => {
        if (currentAwardPage < totalAwardPages) {
            currentAwardPage++;
            showPage(currentAwardPage, awardItems, awardsPerPage, prevAwardButton, nextAwardButton, awardPageInfo, currentAwardPage, totalAwardPages);
        }
    });

    // Instructions pagination event listeners
    prevInstructionButton.addEventListener('click', () => {
        if (currentInstructionPage > 1) {
            currentInstructionPage--;
            showPage(currentInstructionPage, instructionItems, instructionsPerPage, prevInstructionButton, nextInstructionButton, instructionPageInfo, currentInstructionPage, totalInstructionPages);
        }
    });

    nextInstructionButton.addEventListener('click', () => {
        if (currentInstructionPage < totalInstructionPages) {
            currentInstructionPage++;
            showPage(currentInstructionPage, instructionItems, instructionsPerPage, prevInstructionButton, nextInstructionButton, instructionPageInfo, currentInstructionPage, totalInstructionPages);
        }
    });

    // Venue pagination event listeners
    prevVenueButton.addEventListener('click', () => {
        if (currentVenuePage > 1) {
            currentVenuePage--;
            showPage(currentVenuePage, venueItems, venuePerPage, prevVenueButton, nextVenueButton, venuePageInfo, currentVenuePage, totalVenuePages);
        }
    });

    nextVenueButton.addEventListener('click', () => {
        if (currentVenuePage < totalVenuePages) {
            currentVenuePage++;
            showPage(currentVenuePage, venueItems, venuePerPage, prevVenueButton, nextVenueButton, venuePageInfo, currentVenuePage, totalVenuePages);
        }
    });

    // Sponsors pagination event listeners
    prevSponsorButton.addEventListener('click', () => {
        if (currentSponsorPage > 1) {
            currentSponsorPage--;
            showPage(currentSponsorPage, sponsorItems, sponsorsPerPage, prevSponsorButton, nextSponsorButton, sponsorPageInfo, currentSponsorPage, totalSponsorPages);
        }
    });

    nextSponsorButton.addEventListener('click', () => {
        if (currentSponsorPage < totalSponsorPages) {
            currentSponsorPage++;
            showPage(currentSponsorPage, sponsorItems, sponsorsPerPage, prevSponsorButton, nextSponsorButton, sponsorPageInfo, currentSponsorPage, totalSponsorPages);
        }
    });

    // Initialize first pages
    showPage(1, committeeMembers, membersPerPage, prevButton, nextButton, pageInfo, currentPage, totalPages);
    showPage(1, dateItems, datesPerPage, prevDateButton, nextDateButton, datePageInfo, currentDatePage, totalDatePages);
    showPage(1, awardItems, awardsPerPage, prevAwardButton, nextAwardButton, awardPageInfo, currentAwardPage, totalAwardPages);
    showPage(1, instructionItems, instructionsPerPage, prevInstructionButton, nextInstructionButton, instructionPageInfo, currentInstructionPage, totalInstructionPages);
    showPage(1, venueItems, venuePerPage, prevVenueButton, nextVenueButton, venuePageInfo, currentVenuePage, totalVenuePages);
    showPage(1, sponsorItems, sponsorsPerPage, prevSponsorButton, nextSponsorButton, sponsorPageInfo, currentSponsorPage, totalSponsorPages);
}); 