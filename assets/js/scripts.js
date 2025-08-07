// ===============================
// Document Ready Handlers
// ===============================
$(document).ready(function() {
    // Handle navigation clicks
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all nav links
        $('.nav-link').removeClass('active');
        // Add active class to clicked nav link
        $(this).addClass('active');
        
        // Get the target section ID
        const targetId = $(this).data('target');
        
        // Hide all sections using Bootstrap's d-none class
        $('.section-height').addClass('d-none');
        
        // Show the target section by removing d-none class
        $(targetId).removeClass('d-none');
    });
});

// ===============================
// Contact Form Functionality
// ===============================
function sendEmail() {
    // Form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        showToast('Please fill in all fields');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address');
        return;
    }

    showToast('Sending message...');

    // Save to MockAPI
    const emailData = {
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toISOString()
    };
    // For demo purposes only - in production, API keys should not be exposed in client-side code
    const API_KEY = '6720c47e98bbb4d93ca5e495';
    const API_ENDPOINT = `https://${API_KEY}.mockapi.io/UserEmails`;
    fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Email saved to MockAPI:', data);
    })
    .catch(error => {
        console.error('MockAPI error:', error);
    });

    // Send email using EmailJS
    emailjs.init("YOUR-ACTUAL-PUBLIC-KEY");

    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };

    emailjs.send(
        'service_XXXXX',
        'template_XXXXX',
        templateParams
    )
    .then(function(response) {
        showToast('Message sent successfully!');
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    })
    .catch(function(error) {
        console.error('EmailJS error:', error);
    });
}

// ===============================
// Toast Notification System
// ===============================
function showToast(message) {
    if (!document.getElementById('toastContainer')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.id = 'toastContainer';
        document.body.appendChild(toastContainer);
    }

    const toastHtml = `
        <div class="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="5000" style="z-index: 99; font-size: 0.9rem;">
            <div class="d-flex">
                <div class="toast-body px-2 py-1">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-1 m-auto btn-close-sm" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    document.getElementById('toastContainer').innerHTML = toastHtml;
    
    const toastElement = document.querySelector('.toast');
    
    try {
        const toast = new bootstrap.Toast(toastElement, {
            delay: 5000
        });
        toast.show();
    } catch (error) {
        console.error('Toast initialization error:', error);
    }
}

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactLinks = document.querySelectorAll('.contact-link-transition');
    
    contactLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            this.style.opacity = '0.8';
            this.style.textDecoration = 'underline';
        });
        
        link.addEventListener('mouseout', function() {
            this.style.opacity = '1';
            this.style.textDecoration = 'none';
        });
    });
});

document.getElementById('sendEmailBtn').addEventListener('click', sendEmail);





// document.addEventListener('DOMContentLoaded', function() {
//     // Get all product cards
//     const chemicalCards = document.querySelectorAll('#products .product-card');
    
//     chemicalCards.forEach((card, index) => {
//         if (index % 2 !== 0) {
//             card.classList.add('alternate');
//         }
//     });
// });

$(document).ready(function() {
    $('.product-card').each(function(index) {
        // Remove any existing classes first
        $(this).removeClass('odd-card even-card');
        $(this).find('.row')
            .removeClass('flex-md-row-reverse flex-md-row');
        
        if ((index + 1) % 2 === 0) { // Even cards
            $(this).addClass('even-card');
            $(this).find('.row')
                .addClass('flex-md-row-reverse');
            $(this).find('.img-fluid')
                .removeClass('rounded-md-start')
                .addClass('rounded-md-end');
        } else { // Odd cards
            $(this).addClass('odd-card');
            $(this).find('.row')
                .addClass('flex-md-row');
            $(this).find('.img-fluid')
                .removeClass('rounded-md-end')
                .addClass('rounded-md-start');
        }
    });
});