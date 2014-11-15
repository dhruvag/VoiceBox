webkit = function () {
    var recognition = new webkitSpeechRecognition();
    var i = 0;
    recognition.continuous = true;
    recognition.onresult = function(event) { 
      console.log(event["results"][i][0].transcript);
      if (event["results"][i][0].transcript.indexOf("trash") > -1) {
            $('a[href="https://mail.google.com/mail/u/0/#trash"]')[0].click();      
      } else if (event["results"][i][0].transcript.indexOf("sent") > -1) {
            $('a[href="https://mail.google.com/mail/u/0/#sent"]')[0].click();      
      } else if (event["results"][i][0].transcript.indexOf("important") > -1) {
            $('a[href="https://mail.google.com/mail/u/0/#imp"]')[0].click();      
      } 
      i++;
    }
    recognition.start();
} 

annyang = function() {
    if (annyang) {
      var commands = {
        'trash *': function() {
            $('a[href="https://mail.google.com/mail/u/0/#trash"]')[0].click();
        },
        'sent *': function() {
            $('a[href="https://mail.google.com/mail/u/0/#sent"]')[0].click();
        },
        'important *': function() {
            $('a[href="https://mail.google.com/mail/u/0/#imp"]')[0].click();
        }
      };
      annyang.addCommands(commands);
      annyang.start();
      annyang.debug();
    }
}

window.onload = annyang;
