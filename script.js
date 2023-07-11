//This makes sure that all dom elements are loaded before executing any of these functions
$(document).ready(function () {
  //Displays the current day in the header
  $('#currentDay').text(dayjs());
  //Declared variable saveButtons which grabs all buttons on page
  var saveButtons = document.querySelectorAll('button');
  //Declared variable currentHour and sets its value equal to the the current day's curent hour
  var currentHour = dayjs().hour();
  //Function for saving and displaying items in local storage
  function displaySavedItems() {
    //for loop in order to loop through the nodelist created by queryselectorAll which is essentially an array with all the buttons
    for (var i = 0; i < saveButtons.length; i++) {
      //nested function with an argument of index
      (function(index) {
        //declaring variable for the button whos index position we are on in the current loop
        var button = saveButtons[index];
        //declaring variable for the parent element of the button
        var parentDiv = button.parentElement;
        //Declaring variable for the textarea user can input into, grabbing it by class
        var textarea = parentDiv.querySelector('.description');
        //declaring variable for the hour of the timeblock we are in using parse-int to get just the integer in the hour ids
        var hour = parseInt(parentDiv.id.split('-')[1]);
        //Calls the applyTimeBlockClass with arguments parentDiv defined above and hour also defined above
        applyTimeBlockClass(parentDiv, hour);
        //Gets item from local storage. If it exists in local storage it changes the value of the textarea to whatever is saved in local storage
        var savedItem = localStorage.getItem(`savedItem-${index}`);
        if (savedItem) {
          textarea.value = savedItem; 
        }
        //Adding event listener to all buttons
        button.addEventListener('click', function() {
          //If the textarea has text then it changes the textcontent of that textarea to the value the user inputs and then puts that into local storage
          if (textarea) {
            var textContent = textarea.value;
            localStorage.setItem(`savedItem-${index}`, textContent);
          }
        });
      })(i);
    }
  }
  //This functions simply applies the class of past present or future based on the conditionals provided. (if the hour in the block is less than the current hour it will apply the past class etc.)
  function applyTimeBlockClass(element, hour) {
    if (hour < currentHour) {
      element.classList.add('past');
    } else if (hour === currentHour) {
      element.classList.add('present');
    } else {
      element.classList.add('future');
    }
  }
//Both the following function call and load event ensure that when the user refreshes or opens the page again their textarea values are still displayed
  displaySavedItems();

  window.addEventListener('load', displaySavedItems);
  
});
