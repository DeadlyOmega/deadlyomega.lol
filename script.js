        // Wait for the page to fully load
        window.addEventListener("load", function() {
            // Hide the loading screen
            document.querySelector(".loading_container").style.opacity = "0";
            document.querySelector(".loading_container").style.transition = "opacity 0.5s ease-out";
            
            // Delay removing the loader to allow fade-out effect
            setTimeout(function() {
                document.querySelector(".loading_container").style.display = "none";
                // Show the content
                document.querySelector(".content").style.opacity = "1";
            }, 500); // Matches the transition time
        });