// Function to determine the luminance of a color
function getLuminance(color) {
  var rgb = parseInt(color.slice(1), 16);
  var r = (rgb >> 16) & 0xff;
  var g = (rgb >>  8) & 0xff;
  var b = (rgb >>  0) & 0xff;

  // Convert to grayscale using standard luminance values
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

// Function to set text color based on background luminance
function setTextColor(element, backgroundColor) {
  var luminance = getLuminance(backgroundColor);
  var textColor = luminance > 128 ? "#000" : "#fff"; // Adjust luminance threshold as needed

  element.style.color = textColor;
}

// Function to initialize the theme color
function initializeThemeColor() {
  // Yank theme color from localStorage or use default if not present
  var initialThemeColor = localStorage.getItem("userThemeColor") || "#f5f5f5";
  document.documentElement.style.setProperty("--mainColor", initialThemeColor);

  // Set the default text color to black
  document.documentElement.style.setProperty("--defaultTextColor", "#000");
}

// Call the function to initialize the theme color
initializeThemeColor();

var colorInput = document.querySelector("#choose-theme-color");

colorInput.addEventListener("input", function() {
  // Theme the site!
  document.documentElement.style.setProperty("--mainColor", this.value);

  // Set text color for header, footer, and navigation links
  var header = document.querySelector('.header-wrapper');
  var footer = document.querySelector('.footer-wrapper');
  var navLinks = document.querySelectorAll('.header-nav-wrapper a');

  setTextColor(header, this.value);
  setTextColor(footer, this.value);

  navLinks.forEach(function(link) {
    setTextColor(link, this.value);
  }, this);

  // Save the value for next time the page is visited.
  localStorage.setItem("userThemeColor", this.value);
});
