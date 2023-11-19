document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.afc-up').addEventListener('click', function(e) {
        e.preventDefault();
        var afcSlider = document.querySelector('.afc-slider');
        afcSlider.scrollBy({
            top: -430, // Adjust the scrolling amount as needed
            behavior: 'smooth'
        });
    });

    document.querySelector('.afc-down').addEventListener('click', function(e) {
        e.preventDefault();
        var afcSlider = document.querySelector('.afc-slider');
        afcSlider.scrollBy({
            top: 430, // Adjust the scrolling amount as needed
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.nfc-up').addEventListener('click', function(e) {
        e.preventDefault();
        var afcSlider = document.querySelector('.nfc-slider');
        afcSlider.scrollBy({
            top: -430, // Adjust the scrolling amount as needed
            behavior: 'smooth'
        });
    });

    document.querySelector('.nfc-down').addEventListener('click', function(e) {
        e.preventDefault();
        var afcSlider = document.querySelector('.nfc-slider');
        afcSlider.scrollBy({
            top: 430, // Adjust the scrolling amount as needed
            behavior: 'smooth'
        });
    });
});

