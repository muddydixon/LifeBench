$(function(){
  var app = 'http://localhost:3000'
  , template = $($('#template').text())
  , messageContainer = $('#message .messageArea')
  , calendarContainer = $('#calendar .calendarArea');
  
  if(messageContainer.length > 0){
    
    var messageTemplate = template[0];
    $.get(app+'/message?limit=0').done(function(messages){
      $(messages).each(function(i, message){
        var m = $(messageTemplate).clone(true);
        m.find('div.body div.text p').text(message.body);
        messageContainer.append(m);
      });
    });
  }

  calendarContainer.fullCalendar({
    header: {
			left: 'prev,next today'
			, center: 'title'
			, right: 'month,agendaWeek,agendaDay'
		}
    , editable: true
    , events: [
      {
			  title: 'Click for Google'
        ,	start: new Date(2012, 1, 18)
				, end: new Date(2012, 1, 20)
				, url: 'http://google.com/'
			}
    ]
  });
  
});