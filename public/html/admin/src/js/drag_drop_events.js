var calEventStatus = [];

var isEventOverDiv = function(x, y) {

  var external_events = $( '#external-events' );
  var offset = external_events.offset();
  offset.right = external_events.width() + offset.left;
  offset.bottom = external_events.height() + offset.top;

  if (x >= offset.left
    && y >= offset.top
    && x <= offset.right
    && y <= offset .bottom) { return true; }
    return false;

}


function makeEventsDraggable () {
  $('.fc-draggable').each(function() {
    $(this).data('event', {
      title: $.trim($(this).text()),
      stick: true,
      color: $(this).data('color')
    });

    $(this).draggable({
      zIndex: 999,
      revert: true,
      revertDuration: 0
    });
    $("td").removeClass("fc-highlight");
  });

}

$('#external-events .fc-event').each(function() {
  $(this).css('background', $(this).data('color'));
  $(this).data('event', {
    title: $.trim($(this).text()),
    stick: true,
    color: $(this).data('color'),
    textColor: '#ffffff'
  });

  $(this).draggable({
    zIndex: 999,
    revert: true,
    revertDuration: 0
  });

});

$('#calendar1').fullCalendar({
  header: false,
  height: "parent",
  editable: true,
  droppable: true,
  dragRevertDuration: 0,
  eventLimit: true,
  eventClick: function(event, element) {
    $('#editEventModal').modal('show');
  },
  drop: function(date, jsEvent, ui) {
    if ($('.custom-control-input.drop-remove').is(':checked')) {
      $(this).remove();
    }

    if (typeof calEventStatus['calendar'] != 'undefined') {
      $(calEventStatus['calendar']).fullCalendar('removeEvents', calEventStatus['event_id']);
    }

    makeEventsDraggable();
  },
  eventReceive: function( event ) {
    makeEventsDraggable();
  },
  eventDrop: function( event, delta, revertFunc, jsEvent, ui, view ) {
    makeEventsDraggable();
  },
  eventDragStart: function( event, jsEvent, ui, view ) {
    calEventStatus['calendar'] = '#calendar1';
    calEventStatus['event_id'] = event._id;
  },
  eventDragStop: function( event, jsEvent, ui, view ) {

    if(isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
      $('#calendar1').fullCalendar('removeEvents', event._id);
      var el = $( "<div class='fc-event'>" ).appendTo( '#external-events-listing' ).text( event.title );
      el.draggable({
        zIndex: 999,
        revert: true,
        revertDuration: 0
      });
      el.data('event', { title: event.title, id :event.id, stick: true });
    }

    calEventStatus = [];
    makeEventsDraggable();
  }
});

// $('#calendar1').fullCalendar('option', 'height', window.height);