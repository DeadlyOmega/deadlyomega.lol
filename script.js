document.addEventListener('DOMContentLoaded', () => {
    // Accent color customization: update the CSS variable on color picker change
    const accentInput = document.getElementById('accentColor');
    accentInput.addEventListener('input', () => {
      document.documentElement.style.setProperty('--accent-color', accentInput.value);
    });
  });
  