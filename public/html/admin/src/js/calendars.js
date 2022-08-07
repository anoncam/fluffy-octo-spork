// Event Superclass
const dateFormat = require('dateformat')

function Event() {
  this.id = Math.floor(Math.random() * 1500)
  this.title = ''
  this.start = randomDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay()-10), new Date()),
  this.color = ''
  this.textColor = '#ffffff'
}

function Normal() {
  Event.call(this)
}

function Meeting() {
  Event.call(this)
}

function Repeating() {
  Event.call(this)
}

// Declare event types
const normals     = ['All Day Event', 'Long Event', 'Birthday Party', 'Lunch Break']
const repeatings  = ['Client Conference', 'Sprint Talk']
const meetings    = ['Company Teambuilding', 'Team Talk']

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

let events = [];

// Create events with random dates, titles and colors
for (let i = normals.length; i > 0; i--) {
  normal = new Normal()

  normal.title      = normals[Math.floor(Math.random()*normals.length)],
  normal.color      = colors.color_primary,

  events.push(normal)
}

for (let i = meetings.length; i > 0; i--) {
  meeting = new Meeting()

  meeting.title      = meetings[Math.floor(Math.random()*meetings.length)],
  meeting.color      = colors.color_warning,

  events.push(meeting)
}

for (let i = repeatings.length; i > 0; i--) {
  repeating = new Repeating()

  repeating.id         = 399
  repeating.title      = repeatings[Math.floor(Math.random()*repeatings.length)],
  repeating.color      = colors.color_danger,

  events.push(repeating)
}

for (let event of events) {
  $("#events-list").append(
    `
    <a href="#" class="list-group-item list-group-item-action">
    <div class="media">
    <div class="media-body">
    <div class="float-right text-muted">` + dateFormat(event.start, "mmmm dS") + `</div>
    <div class="mb-1">
    <strong>` + event.title + `</strong>
    </div>
    </div>
    </div>
    </a>
    `
    )
}

$('#calendar').fullCalendar({
  events: events,
  navLinks: true,
  editable: true,
  eventLimit: true,
  dragOpacity: 0.7,
  eventOverlap: true,
  eventClick: function(event, element) {
    $('#editEventModal').modal('show');
  }
});