        // Wait for the page to fully load
        window.addEventListener("load", function () {
            let loader = document.querySelector(".loading_container");
            let content = document.querySelector(".content");

            // Fade out the loader
            loader.style.opacity = "0";
            loader.style.transition = "opacity 0.7s ease-out";

            // Wait for the fade-out animation to complete
            setTimeout(function () {
                loader.style.display = "none";  // Hide loader after fade-out
                content.style.display = "block"; // Show content
                content.style.opacity = "1"; // Fade-in effect
            }, 700); // Matches transition duration (0.7s)
        });

    // Retrieve the counter from localStorage or initialize it
    let counter = localStorage.getItem('counter');
    counter = counter ? parseInt(counter, 10) : 0;
    
    // Increment the counter
    counter++;
    
    // Save the updated counter back to localStorage
    localStorage.setItem('counter', counter);
    
    // Display the counter on the page
    document.getElementById('numberDisplay').innerText = counter;

    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(() => {
          document.querySelector(".grid-container").classList.add("show");
        }, 500); // Delay for a smooth effect
      })

      function updateEUTime() {
        const options = {
          timeZone: 'Europe/Berlin', // Zeitzone für Deutschland und viele EU-Länder
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
      
        // Erhalte die aktuelle Zeit
        const date = new Date();
        const currentEUTime = new Intl.DateTimeFormat('de-DE', options).format(date);
      
        // Setze den Inhalt des Paragraphen mit der ID "time-display"
        const timeParagraph = document.querySelector('.time');
        if (timeParagraph) {
          timeParagraph.textContent = currentEUTime; // Ersetze den Text mit der Zeit
        }
      }
      
      // Aufruf der Funktion alle 1000 Millisekunden (1 Sekunde)


      function updateEUDAte() {
        const options = {
          timeZone: 'Europe/Berlin', // Zeitzone für Deutschland und viele EU-Länder
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour12: false
        };
      
        // Erhalte die aktuelle Zeit
        const date = new Date();
        const currentEUDAte = new Intl.DateTimeFormat('de-DE', options).format(date);
      
        // Setze den Inhalt des Paragraphen mit der ID "time-display"
        const timeParagraph = document.querySelector('.date');
        if (timeParagraph) {
          timeParagraph.textContent = currentEUDAte; // Ersetze den Text mit der Zeit
        }
      }
      
      // Initialer Aufruf, um sofort die Zeit zu setzen
      updateEUDAte();

      setInterval(updateEUTime, 1000);
      setInterval(updateEUDate, 1000);