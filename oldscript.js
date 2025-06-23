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

      document.addEventListener('DOMContentLoaded', function() {
        const gradientOptions = document.querySelectorAll('.gradient-option');
        let selectedOption = null;
        
        gradientOptions.forEach(option => {
          option.addEventListener('click', function() {
            // Remove previously selected class
            if (selectedOption) {
              selectedOption.classList.remove('selected');
            }
            // Add selected class to current button
            this.classList.add('selected');
            selectedOption = this;
            
            // Get the gradient custom property name from data-gradient
            const gradientClass = this.dataset.gradient;
            const gradientValue = getComputedStyle(document.documentElement)
                                    .getPropertyValue(`--${gradientClass}`);
            
            // Apply the gradient to the body
            document.body.style.background = gradientValue;
            
            // (Optional) Enable animated effect by adding a class if you want an animated gradient.
            // Toggle the line below based on your preference.
            document.body.classList.add('animated-gradient');
          });
        });
      });
              // Set your birthday (MM/DD/YYYY format)
        const birthday = new Date("2025-08-21");  // Example: March 10, 2025

        // Function to calculate the days left
        function calculateDaysLeft() {
            const today = new Date();
            const timeDiff = birthday - today;
            const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));  // Convert milliseconds to days
            return daysLeft;
        }

        // Display the number of days left
        function updateBirthdayMessage() {
            const daysLeft = calculateDaysLeft();
            document.getElementById('daysLeft').textContent = daysLeft;
        }

        // Run the function when the page loads
        updateBirthdayMessage();

        window.addEventListener("keydown", function(e) {
          if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
          }
        }, false);
    
        // Setup canvas
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
    
        // Game grid dimensions
        let cols = 20, rows = 20;
        let cellSize = 20; // recalculated on resize
    
        // Game state variables
        let snake = [{ x: Math.floor(cols / 2), y: Math.floor(rows / 2) }];
        let direction = { x: 0, y: 0 }; // starts stationary
        let pendingDirection = null;
        // Fixed apple position at game start
        let apple = { x: Math.floor(cols / 4), y: Math.floor(rows / 4) };
        let gameSpeed = 150; // ms interval for updates
        let score = 0;
        let highScore = parseInt(getCookie("highScore")) || 0;
        let gameInterval;
        let isGameOver = false;
        let isSplashActive = true; // controls the one-time splash overlay
    
        updateScore();
    
        // Resize canvas based on container size
        function resizeCanvas() {
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          cellSize = Math.floor(canvas.width / cols);
        }
    
        // Draw game elements
        function draw() {
          // Clear canvas so background remains transparent
          ctx.clearRect(0, 0, canvas.width, canvas.height);
    
          // Draw apple
          ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
          ctx.beginPath();
          ctx.arc((apple.x + 0.5) * cellSize, (apple.y + 0.5) * cellSize, cellSize * 0.4, 0, 2 * Math.PI);
          ctx.fill();
    
          // Draw snake
          ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
          snake.forEach(segment => {
            ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
          });
        }
    
        // Update game logic
        function update() {
          if (pendingDirection) {
            if ((pendingDirection.x !== -direction.x || snake.length === 1) &&
                (pendingDirection.y !== -direction.y || snake.length === 1)) {
              direction = pendingDirection;
            }
            pendingDirection = null;
          }
          
          // If still stationary, do not update game logic
          if (direction.x === 0 && direction.y === 0) return;
    
          const head = {
            x: snake[0].x + direction.x,
            y: snake[0].y + direction.y,
          };
    
          // Check border collision: hitting any border ends the game
          if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
            endGame();
            return;
          }
    
          // Check self-collision
          if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            endGame();
            return;
          }
    
          snake.unshift(head);
    
          // Apple eaten
          if (head.x === apple.x && head.y === apple.y) {
            score++;
            if (score > highScore) {
              highScore = score;
              setCookie("highScore", highScore, 30);
            }
            updateScore();
            placeApple();
          } else {
            snake.pop();
          }
        }
    
        // Main game loop
        function gameLoop() {
          update();
          draw();
        }
    
        // End game and display overlay
        function endGame() {
          clearInterval(gameInterval);
          isGameOver = true;
          document.getElementById("gameOverScreen").style.display = "flex";
        }
    
        // Restart the game (splash overlay is not shown on restart)
        function restartGame() {
          isGameOver = false;
          snake = [{ x: Math.floor(cols / 2), y: Math.floor(rows / 2) }];
          direction = { x: 0, y: 0 };
          pendingDirection = null;
          score = 0;
          apple = { x: Math.floor(cols / 4), y: Math.floor(rows / 4) };
          updateScore();
          document.getElementById("gameOverScreen").style.display = "none";
          clearInterval(gameInterval);
          gameInterval = setInterval(gameLoop, gameSpeed);
        }
    
        // Place apple randomly (avoiding snake)
        function placeApple() {
          let valid = false;
          while (!valid) {
            apple.x = Math.floor(Math.random() * cols);
            apple.y = Math.floor(Math.random() * rows);
            valid = !snake.some(segment => segment.x === apple.x && segment.y === apple.y);
          }
        }
    
        // Update score display
        function updateScore() {
          document.getElementById("score").textContent = score;
          document.getElementById("highScore").textContent = highScore;
        }
    
        // Cookie helper functions
        function getCookie(name) {
          const nameEQ = name + "=";
          const ca = document.cookie.split(";");
          for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
          }
          return null;
        }
        function setCookie(name, value, days) {
          let expires = "";
          if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
          }
          document.cookie = name + "=" + value + expires + "; path=/";
        }
    
        // Handle resizing
        window.addEventListener("resize", () => {
          resizeCanvas();
          draw();
        });
    
        // Keyboard controls for movement and for starting/restarting the game
        window.addEventListener("keydown", e => {
          // If splash overlay is active, remove it on Enter
          if (isSplashActive) {
            if (e.key === "Enter") {
              hideSplash();
            }
          }
          if (isGameOver) {
            if (e.key === "Enter") {
              restartGame();
            }
            return;
          }
          switch (e.key) {
            case "ArrowUp":
            case "w":
            case "W":
              pendingDirection = { x: 0, y: -1 };
              break;
            case "ArrowDown":
            case "s":
            case "S":
              pendingDirection = { x: 0, y: 1 };
              break;
            case "ArrowLeft":
            case "a":
            case "A":
              pendingDirection = { x: -1, y: 0 };
              break;
            case "ArrowRight":
            case "d":
            case "D":
              pendingDirection = { x: 1, y: 0 };
              break;
          }
        });
    
        // Allow click on splash overlay to start the game
        document.getElementById("splashOverlay").addEventListener("click", () => {
          if (isSplashActive) hideSplash();
        });
    
        // Also allow click on game over overlay to restart (Enter or Click)
        document.getElementById("gameOverScreen").addEventListener("click", () => {
          if (isGameOver) restartGame();
        });
    
        // Remove splash overlay
        function hideSplash() {
          document.getElementById("splashOverlay").style.display = "none";
          isSplashActive = false;
        }
    
        // Initialize game
        resizeCanvas();
        gameInterval = setInterval(gameLoop, gameSpeed);