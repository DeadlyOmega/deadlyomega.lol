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

      async function updateDiscordStatus() {
        try {
          const response = await fetch('https://api.lanyard.rest/v1/users/626069774002159619');
          const data = await response.json();
          
          if (!data.success) return;
          
          const userData = data.data;
          const discordUser = userData.discord_user;
          
          // Update avatar
          const avatarElement = document.querySelector('.avatar');
          avatarElement.src = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
          
          // Update avatar decoration if present
          const decorationElement = document.querySelector('.avatar-decoration');
          if (discordUser.avatar_decoration_data) {
            // Replace with your custom image URL for the decoration
            decorationElement.src = `Images/avatar.png`; // Custom image URL
            decorationElement.style.display = 'block';
          } else {
            decorationElement.style.display = 'none';
          }

          // Update username
          document.querySelector('.username').textContent = discordUser.global_name || discordUser.username;
          
          // Update status indicator
          const statusIndicator = document.querySelector('.status-indicator');
          statusIndicator.className = `status-indicator ${userData.discord_status}`;
          
          // Update custom status if present
          const customStatusElement = document.querySelector('.custom-status');
          const customStatus = userData.activities.find(activity => activity.type === 4);
          if (customStatus) {
            customStatusElement.textContent = `${customStatus.emoji?.name || ''} ${customStatus.state}`;
          } else {
            customStatusElement.textContent = '';
          }
          
          // Update platform status
          document.querySelector('.platform-status').textContent = 
            userData.active_on_discord_desktop ? 'Active on: Desktop' :
            userData.active_on_discord_mobile ? 'Active on: Mobile' :
            userData.active_on_discord_web ? 'Active on: Web' :
            'Not currently active';
          
        } catch (error) {
          console.error('Error fetching Discord status:', error);
        }
      }
      
      // Update immediately and then every 30 seconds
      updateDiscordStatus();
      setInterval(updateDiscordStatus, 30000);