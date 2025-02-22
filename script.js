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
          timeZone: 'Europe/Berlin',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
      
        const date = new Date();
        const currentEUTime = new Intl.DateTimeFormat('de-DE', options).format(date);

        const timeParagraph = document.querySelector('.time');
        if (timeParagraph) {
          timeParagraph.textContent = currentEUTime;
        }
      
        updateBackground(date);
      }
      
      // Preload images
      const dayImg = new Image();
      dayImg.src = "Images/day.gif";
      
      const nightImg = new Image();
      nightImg.src = "Images/night.gif";

      function updateBackground(date) {
        const hours = date.getHours();
        const card = document.querySelector(".card6");
      
        if (hours >= 6 && hours < 18) {
          card.style.backgroundImage = "url('./Images/day.gif')";
        } else {
          card.style.backgroundImage = "url('./Images/night.gif')";
        }
      }
      
      window.onload = function () {
        updateEUTime();
        setInterval(updateEUTime, 1000); 
      };