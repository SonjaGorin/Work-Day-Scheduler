var containerEl = $(".container");
var rowEl = $(".time-block");
var hourEl = $(".hour");
var currentDayEl = $("#currentDay");
var ButtonEl = $(".saveBtn");
var eventInputEl = (".description");
  
// this function renders rows in the calendar 
// by cloning the original row and then deleting it
function renderCalendar() {
  for (var i = 9; i <= 17; i++) {
    var newRow = rowEl.clone();
    newRow.attr("id", "hour-" + [i]);
    newRow.children().eq(1).attr("id", "text-" + [i]);
    newRow.children().eq(2).attr("id", "button-" + [i]);
    newRow.addClass("new-row");
    var calendarTime = newRow.find(".hour");
    if (i < 10) {
      calendarTime.text("0" + i + ":00");
    } else {
      calendarTime.text(i + ":00");
    }
    containerEl.append(newRow);
  }
  rowEl.remove();
}

// this function colors the calendar rows depending on time of the day
// if the hour is in the past, present or future 
function colorCalendar() { 
  $(".hour").each(function() {
    var calendarTimeSplit = $(this).text().split(":");
    var hour = Number(calendarTimeSplit[0]);
    var currentHour = Number(dayjs().format("HH"));

    if (hour < currentHour) {
      $(this).parent().addClass("past");
    }
    if (hour === currentHour) {
      $(this).parent().addClass("present");
    }
    if (hour > currentHour) {
      $(this).parent().addClass("future");
    }
  })
}

// this function uses dayjs to find current day and date 
// and displays it in the calendar
function setDateInTitle() {
  var today = dayjs().format("dddd, MMMM DD");
  currentDayEl.text(today);
}

var calendarEvents = {};

// this function stores entered events in the local storage
function storeCalendarEvents() {
  localStorage.setItem("calendarEvents", JSON.stringify(calendarEvents));
}

// this function adds events in the calendarEvents object
// and then stores that object in local storage
function updateCalendarEvents(event) {
  event.preventDefault();

  var buttonClicked = $(event.currentTarget);
  buttonClicked.parent();
  var buttonClickedParent = buttonClicked.parent();
  var buttonClickedText = buttonClickedParent.children().eq(1).val();
  var buttonClickedTextId = buttonClickedParent.children().eq(1).attr("id");

  calendarEvents[buttonClickedTextId] = buttonClickedText;
  storeCalendarEvents();
}

// this function loads events back into their fields when the page is reloaded
function loadCalendarEvents() {
  var storedEvents = JSON.parse(localStorage.getItem("calendarEvents"));

  if (storedEvents !== null) {
    calendarEvents = storedEvents;
  }

  for (id in storedEvents) {
    $("#" + id).text(storedEvents[id]);
  }
}

// this is the function that will start when the page gets oppened 
// and it alls all other functions
$(function() {
  setDateInTitle();
  renderCalendar();
  loadCalendarEvents();
  colorCalendar();
  containerEl.on("click", ".saveBtn", updateCalendarEvents);
})