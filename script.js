document.addEventListener('DOMContentLoaded', () => {
    // Update the accent color dynamically when the color picker changes
    const accentInput = document.getElementById('accentColor');
    accentInput.addEventListener('input', () => {
      document.documentElement.style.setProperty('--accent-color', accentInput.value);
    });
  });
  