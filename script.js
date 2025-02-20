document.addEventListener('DOMContentLoaded', function() {
    // Enable accent color customization by updating the CSS variable
    const accentInput = document.getElementById('accentColor');
    accentInput.addEventListener('input', function() {
      document.documentElement.style.setProperty('--accent-color', accentInput.value);
    });
  });
  