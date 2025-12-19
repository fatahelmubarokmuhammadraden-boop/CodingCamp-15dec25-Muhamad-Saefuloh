// Welcoming message with user's name
document.addEventListener('DOMContentLoaded', function() {
    // Prompt user for their name on page load
    let userName = localStorage.getItem('userName');
    
    if (!userName) {
        userName = prompt('Welcome! Please enter your name:');
        if (userName && userName.trim() !== '') {
            localStorage.setItem('userName', userName);
        } else {
            userName = 'there';
        }
    }
    
    // Update the hero title with user's name
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = userName;
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Modal functionality
    const modal = document.getElementById('submitModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const closeModalButton = document.querySelector('.btn-close-modal');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Add active class to navigation on scroll
    window.addEventListener('scroll', highlightNavigation);
});

// Form validation functions
function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    const cleanedPhone = phone.replace(/\s/g, '');
    return phoneRegex.test(cleanedPhone) && cleanedPhone.length >= 10;
}

function validateMessage(message) {
    return message.trim().length >= 10 && message.trim().length <= 500;
}

function showError(inputId, errorMessage) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(inputId + 'Error');
    
    if (input && errorElement) {
        input.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    }
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(inputId + 'Error');
    
    if (input && errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function clearAllErrors() {
    const errorIds = ['name', 'email', 'phone', 'message'];
    errorIds.forEach(id => clearError(id));
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearAllErrors();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    let isValid = true;
    
    // Validate name
    if (!validateName(name)) {
        showError('name', 'Please enter a valid name (2-50 characters, letters only)');
        isValid = false;
    }
    
    // Validate email
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone
    if (!validatePhone(phone)) {
        showError('phone', 'Please enter a valid phone number (min. 10 digits)');
        isValid = false;
    }
    
    // Validate message
    if (!validateMessage(message)) {
        showError('message', 'Message must be between 10 and 500 characters');
        isValid = false;
    }
    
    // If all validations pass, show submitted data
    if (isValid) {
        displaySubmittedData({
            name: name,
            email: email,
            phone: phone,
            subject: subject || 'Not specified',
            message: message
        });
        
        // Reset form
        document.getElementById('contactForm').reset();
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Display submitted data in modal
function displaySubmittedData(data) {
    const submittedDataDiv = document.getElementById('submittedData');
    const modal = document.getElementById('submitModal');
    
    if (submittedDataDiv && modal) {
        submittedDataDiv.innerHTML = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong> ${data.message}</p>
        `;
        
        modal.style.display = 'block';
        
        // Add animation class
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'none';
        setTimeout(() => {
            modalContent.style.animation = 'modalSlideIn 0.3s ease-out';
        }, 10);
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('submitModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Highlight active navigation link on scroll
function highlightNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Real-time validation on input
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                if (!validateName(this.value)) {
                    showError('name', 'Please enter a valid name (2-50 characters, letters only)');
                } else {
                    clearError('name');
                }
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                if (!validateEmail(this.value)) {
                    showError('email', 'Please enter a valid email address');
                } else {
                    clearError('email');
                }
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                if (!validatePhone(this.value)) {
                    showError('phone', 'Please enter a valid phone number (min. 10 digits)');
                } else {
                    clearError('phone');
                }
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                if (!validateMessage(this.value)) {
                    showError('message', 'Message must be between 10 and 500 characters');
                } else {
                    clearError('message');
                }
            }
        });
        
        // Character counter for message
        messageInput.addEventListener('input', function() {
            const charCount = this.value.length;
            const maxChars = 500;
            
            // You can add a character counter display here if needed
            if (charCount > maxChars) {
                this.value = this.value.substring(0, maxChars);
            }
        });
    }
});

// Add smooth scroll behavior for the explore button
document.addEventListener('DOMContentLoaded', function() {
    const exploreBtn = document.querySelector('.btn-primary');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, rgba(29, 53, 87, 0.98) 0%, rgba(45, 80, 22, 0.98) 100%)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, rgba(29, 53, 87, 0.95) 0%, rgba(45, 80, 22, 0.95) 100%)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});
