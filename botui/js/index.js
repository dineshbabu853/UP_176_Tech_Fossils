var $messages = $('.messages-content');
var serverResponse = "got_it";
//speech recognition
try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
}

$('#start-record-btn').on('click', function(e) {
  recognition.start();
});

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
  document.getElementById("MSG").value= speechToText;
  //console.log(speechToText)
  insertMessage();
}


$(window).load(function() {
  $('.messages').mCustomScrollbar();
  setTimeout(function() {
    serverMessage("Hi there,Im your virtual assistant");
  }, 100);

});

function updateScrollbar() {
  $('.messages').mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}



function insertMessage() {
   msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
   fetchmsg()

  $('.message-input').val(null);
  updateScrollbar();

}

document.getElementById("mymsg").onsubmit = (e)=>{
  e.preventDefault()
  insertMessage();
}
