// EmailJS credentials
const publickey = '9TsraCudZ5T_0dert';
const serviceID = 'service_vatb7so';
const templateID = 'template_rogi3hj';

// Initialize EmailJS with public key
emailjs.init(publickey);

// Add Submit Event to form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Change button text
    submitBtn.innerHTML = 'Sending...';
    // Get all input field values
    const inputFields = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
    };
    // Send the email
    emailjs.send(serviceID, templateID, inputFields)
        .then((response) => {
            // Change button text
            submitBtn.innerHTML = 'Sent';
            submitBtn.disabled = true;
            // Reset form
            contactForm.reset();
            // Show success message
            alert('Your message has been sent successfully');
        }, (error) => {
            // Change button text
            submitBtn.innerHTML = 'Failed';
            // Show error message
            alert('Failed to send message. Please try again');
        });
});