// Initialize EmailJS with your public key
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Add your EmailJS public key here
})();

// Handle form submission
function sendEmail() {
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !message) {
        showToast('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address');
        return;
    }

    // Log user information to console
    console.log('Form Submission Details:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    // Show loading state
    const submitButton = document.querySelector('button[onclick="sendEmail()"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;

    // Send email using EmailJS
    emailjs.send(
        'YOUR_SERVICE_ID', // Add your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Add your EmailJS template ID
        {
            from_name: name,
            from_email: email,
            message: message,
            to_email: 'your-email@example.com' // Add your email address
        }
    ).then(
        function(response) {
            showToast('Message sent successfully!', 'success');
            // Reset form
            document.getElementById('contactForm').reset();
        },
        function(error) {
            showToast('Failed to send message. Please try again.');
            console.error('EmailJS Error:', error);
        }
    ).finally(() => {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    });
}

// Toast notification system
function showToast(message, type = 'danger') {
    // Create toast container if it doesn't exist
    if (!document.getElementById('toastContainer')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.id = 'toastContainer';
        document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toastHtml = `
        <div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="5000" style="z-index: 99; font-size: 0.9rem;">
            <div class="d-flex">
                <div class="toast-body px-2 py-1">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-1 m-auto btn-close-sm" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    document.getElementById('toastContainer').innerHTML = toastHtml;
    
    // Initialize and show the toast with options
    const toastElement = document.querySelector('.toast');
    const toast = new bootstrap.Toast(toastElement, {
        delay: 5000
    });
    toast.show();
}

// Navigation handling
$(document).ready(function() {
    // Hide all sections except the first one
    $('.active-section').show();
    $('.w-100.h-75').not('.active-section').hide();

    // Click event for navigation links
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        
        var target = $(this).data('target');
        $('.w-100.h-75').hide();
        $(target).show();
    });
}); 