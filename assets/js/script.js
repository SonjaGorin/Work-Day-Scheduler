var containerEl = $(".container");
var rowEl = $(".time-block");
var hourEl = $(".hour");
var currentDayEl = $("#currentDay");
var ButtonEl = $(".saveBtn");
var eventInputEl = (".description");
  
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

function setDateInTitle() {
  var today = dayjs().format("dddd, MMMM DD");
  currentDayEl.text(today);
}

var calendarEvents = {};

function storeCalendarEvents() {
  localStorage.setItem("calendarEvents", JSON.stringify(calendarEvents));
}

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

function loadCalendarEvents() {
  var storedEvents = JSON.parse(localStorage.getItem("calendarEvents"));

  if (storedEvents !== null) {
    calendarEvents = storedEvents;
  }

  for (id in storedEvents) {
    $("#" + id).text(storedEvents[id]);
  }
}

$(function() {
  setDateInTitle();
  renderCalendar();
  loadCalendarEvents();
  colorCalendar();
  containerEl.on("click", ".saveBtn", updateCalendarEvents);
})