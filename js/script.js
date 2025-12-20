document.addEventListener('DOMContentLoaded', () => {
    // Set user name in hero if available in localStorage
    const userNameEl = document.getElementById('userName');
    const storedName = localStorage.getItem('gh_user_name');
    if (userNameEl) {
        userNameEl.textContent = storedName ? storedName : 'there';
    }

    // Elements
    const contactForm = document.getElementById('contactForm');
    const submitModal = document.getElementById('submitModal');
    const closeModalX = document.querySelector('.close-modal');
    const btnCloseModal = document.querySelector('.btn-close-modal');
    const submittedDataEl = document.getElementById('submittedData');

    function showError(input, message) {
        const errorEl = document.getElementById(input.id + 'Error');
        input.classList.add('error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
        }
    }

    function clearError(input) {
        const errorEl = document.getElementById(input.id + 'Error');
        input.classList.remove('error');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('show');
        }
    }

    function validateEmail(email) {
        // Simple email regex
        return /^\S+@\S+\.\S+$/.test(email);
    }

    function validateForm() {
        let valid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');

        // Name
        clearError(name);
        if (!name.value.trim()) {
            showError(name, 'Name is required');
            valid = false;
        }

        // Email
        clearError(email);
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            valid = false;
        } else if (!validateEmail(email.value.trim())) {
            showError(email, 'Please enter a valid email');
            valid = false;
        }

        // Phone
        clearError(phone);
        if (!phone.value.trim()) {
            showError(phone, 'Phone number is required');
            valid = false;
        }

        // Message
        clearError(message);
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            valid = false;
        }

        return valid;
    }

    function openModal() {
        if (!submitModal) return;
        submitModal.style.display = 'block';
        // Lock scroll
        document.body.style.overflow = 'hidden';
        // Announce success to screen readers via aria-live
        const announcement = 'Message sent successfully. Your message has been received and we will get back to you soon.';
        console.log('[A11y Announcement]:', announcement);
    }

    function closeModal() {
        if (!submitModal) return;
        submitModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateForm()) return;

            // Collect data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Store name locally to show in hero next time
            if (data.name) localStorage.setItem('gh_user_name', data.name.trim());

            // Show submitted data in modal
            if (submittedDataEl) {
                submittedDataEl.innerHTML = `
                    <p><strong>Name:</strong> ${escapeHtml(data.name || '')}</p>
                    <p><strong>Email:</strong> ${escapeHtml(data.email || '')}</p>
                    <p><strong>Phone:</strong> ${escapeHtml(data.phone || '')}</p>
                    <p><strong>Subject:</strong> ${escapeHtml(data.subject || '—')}</p>
                    <p><strong>Message:</strong> ${escapeHtml(data.message || '')}</p>
                `;
            }

            openModal();
            contactForm.reset();
            // update hero name immediately
            if (userNameEl) userNameEl.textContent = data.name ? data.name : 'there';
        });
    }

    // Modal close handlers
    if (closeModalX) closeModalX.addEventListener('click', closeModal);
    if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
    if (submitModal) {
        submitModal.addEventListener('click', (e) => {
            if (e.target === submitModal) closeModal();
        });
    }

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Utility: basic HTML escape
    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

});
