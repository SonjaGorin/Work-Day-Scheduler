// <!-- Use class for "past", "present", and "future" to apply styles to the
// time-block divs accordingly. The javascript will need to do this by
// adding/removing these classes on each div by comparing the hour in the
// id to the current hour. The html provided below is meant to be an example
// demonstrating how the css provided can be leveraged to create the
// desired layout and colors. The html below should be removed or updated
// in the finished product. Remember to delete this comment once the
// code is implemented.
// -->


// <!-- Example of a a present time block. The "present" class adds a red background color.
// <div id="hour-10" class="row time-block past">
//   <div class="col-2 col-md-1 hour text-center py-3">10AM</div>
//   <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
//   <button class="btn saveBtn col-2 col-md-1" aria-label="save">
//     <i class="fas fa-save" aria-hidden="true"></i>
//   </button>
// </div>

// Example of a future time block. The "future" class adds a green background color.
// <div id="hour-11" class="row time-block past">
//   <div class="col-2 col-md-1 hour text-center py-3">11AM</div>
//   <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
//   <button class="btn saveBtn col-2 col-md-1" aria-label="save">
//     <i class="fas fa-save" aria-hidden="true"></i>
//   </button>
// </div> -->

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// });


var containerEl = $(".container")
var rowEl = $(".time-block")
var hourEl = $(".hour")
var currentDayEl = $("#currentDay")
  
$(function() {
  for (var i = 9; i <= 17; i++) {
    var newRow = rowEl.clone();
    newRow.attr("id", "hour-" + [i]);
    newRow.addClass("new-row")
    var calendarTime = newRow.find(".hour")
    if (i < 10) {
      calendarTime.text("0" + i + ":00");
    } else {
      calendarTime.text(i + ":00");
    }
    containerEl.append(newRow);
  }
  rowEl.remove();

  return newRow
})
  
  var today = dayjs().format("dddd, MMMM DD")
  currentDayEl.text(today)

  // var timeNow = dayjs().format("HH")
  // console.log(timeNow)

$(function() { 
  $(".hour").each(function() {
    var calendarTimeSplit = $(this).text().split(":")
    var calendarTimeNumber = Number(calendarTimeSplit[0])

    var timeNow = dayjs().set("hour", 10).format("HH")
    var timeNowNumber = Number(timeNow)

    if (calendarTimeNumber < timeNowNumber) {
      $(this).parent().addClass("past")
    }
    if (calendarTimeNumber === timeNowNumber) {
      $(this).parent().addClass("present")
    }
    if (calendarTimeNumber > timeNowNumber) {
      $(this).parent().addClass("future")
    }
  })
})


