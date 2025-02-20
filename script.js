document.addEventListener('DOMContentLoaded', function () {
    // Tool 1: Alert the input text from Card 2
    var alertButton = document.getElementById('alertButton');
    alertButton.addEventListener('click', function () {
      var inputText = document.getElementById('inputText').value;
      if (inputText.trim() !== '') {
        alert('You entered: ' + inputText);
      } else {
        alert('Please enter something in the text field.');
      }
    });
  
    // Tool 2: Simple counter for Card 3
    var counterDisplay = document.getElementById('counter');
    var decreaseBtn = document.getElementById('decreaseBtn');
    var increaseBtn = document.getElementById('increaseBtn');
    var count = 0;
  
    decreaseBtn.addEventListener('click', function () {
      count--;
      counterDisplay.textContent = count;
    });
  
    increaseBtn.addEventListener('click', function () {
      count++;
      counterDisplay.textContent = count;
    });
  });
  