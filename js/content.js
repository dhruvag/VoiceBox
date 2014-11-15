// webkit = function () {
//     var recognition = new webkitSpeechRecognition();
//     var i = 0;
//     recognition.continuous = true;
//     recognition.onresult = function(event) {
//       console.log(event["results"][i][0].transcript);
//       if (event["results"][i][0].transcript.indexOf("trash") > -1) {
//             $('a[href="https://mail.google.com/mail/u/0/#trash"]')[0].click();
//       } else if (event["results"][i][0].transcript.indexOf("sent") > -1) {
//             $('a[href="https://mail.google.com/mail/u/0/#sent"]')[0].click();
//       } else if (event["results"][i][0].transcript.indexOf("important") > -1) {
//             $('a[href="https://mail.google.com/mail/u/0/#imp"]')[0].click();
//       } else if (event["results"][i][0].transcript.indexOf("inbox") > -1) {
//             $('a[href="https://mail.google.com/mail/u/0/#inbox"]')[0].click();
//       } else if (event["results"][i][0].transcript.indexOf("compose") > -1) {
//             document.location.href += "?compose=new";
//       i++;
//     }
//     recognition.start();
// }

function processCommand(command) {
    // Next email
    if (command.indexOf('next') > -1) {
        console.log('next');
        $("div[aria-label='Older']").click();
      //  console.log($("div:contains('Mark as important')"));
    }

    else if (command.indexOf('sent') > -1) {
        console.log('sent');
        $("div[aria-label='Older']").click();
      //  console.log($("div:contains('Mark as important')"));
    }

    else if (command.indexOf('important') > -1) {
        console.log('important');
        $("div[aria-label='Older']").click();
      //  console.log($("div:contains('Mark as important')"));
    }

    else if (command.indexOf('compose') > -1) {
        console.log('compose');
        $("div[aria-label='Older']").click();
      //  console.log($("div:contains('Mark as important')"));
    }

    else if (command.indexOf('inbox') > -1) {
        console.log('inbox');
        $("div[aria-label='Older']").click();
      //  console.log($("div:contains('Mark as important')"));
    }
}

annyang = function() {
    if (annyang) {
      var commands = {
        'voice box *command': processCommand,
      };
      // var commands = {
      //   'trash *': function() {
      //       $('a[href="https://mail.google.com/mail/u/0/#trash"]')[0].click();
      //   },
      //   'sent *': function() {
      //       $('a[href="https://mail.google.com/mail/u/0/#sent"]')[0].click();
      //   },
      //   'important *': function() {
      //       $('a[href="https://mail.google.com/mail/u/0/#imp"]')[0].click();
      //   },
      //   'compose *': function() {
      //       document.location.href += "?compose=new";
      //   }
      //   'inbox *': function() {
      //       $('a[href="https://mail.google.com/mail/u/0/#inbox"]')[0].click();
      //   }
      // };
      annyang.addCommands(commands);
      annyang.start();
      //annyang.debug();
    }
}

window.onload = annyang;
