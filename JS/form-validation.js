$(document).ready(function () {
    $('#contact-form').submit(function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get input values
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();

        // Validate name
        if (name.trim() === '') {
            alert('Please enter your name.');
            return;
        }

        // Validate email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Validate message
        if (message.trim() === '') {
            alert('Please enter your message.');
            return;
        }

        // If all validations pass, you can submit the form
        submitForm();
    });
});

function submitForm() {
    console.log('Form submitted with the following data:');
    console.log('Name: ' + $('#name').val());
    console.log('Email: ' + $('#email').val());
    console.log('Message: ' + $('#message').val());

    // Submit the form
    $('#contact-form')[0].submit(); // Use [0] to access the DOM form element
}
