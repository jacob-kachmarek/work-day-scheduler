$(document).ready(function () {
  var saveButtons = document.querySelectorAll('button');
  var currentHour = dayjs().hour();

  function displaySavedItems() {
    for (var i = 0; i < saveButtons.length; i++) {
      (function(index) {
        var button = saveButtons[index];
        var parentDiv = button.parentElement;
        var textarea = parentDiv.querySelector('.description');
        var hour = parseInt(parentDiv.id.split('-')[1]);

        applyTimeBlockClass(parentDiv, hour);

        var savedItem = localStorage.getItem(`savedItem-${index}`);
        if (savedItem) {
          textarea.value = savedItem; 
        }

        button.addEventListener('click', function() {
          if (textarea) {
            var textContent = textarea.value;
            localStorage.setItem(`savedItem-${index}`, textContent);
          }
        });
      })(i);
    }
  }

  function applyTimeBlockClass(element, hour) {
    if (hour < currentHour) {
      element.classList.add('past');
    } else if (hour === currentHour) {
      element.classList.add('present');
    } else {
      element.classList.add('future');
    }
  }

  displaySavedItems();

  window.addEventListener('load', displaySavedItems);
  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(dayjs());
});
