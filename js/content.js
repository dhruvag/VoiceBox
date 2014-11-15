window.onload = function () {
    if (annyang) {
      var commands = {
        'trash': function() {
            $('a[href="https://mail.google.com/mail/u/0/#trash"]')[0].click();
        },
        'sent': function() {
            $('a[href="https://mail.google.com/mail/u/0/#sent"]')[0].click();
        },
      };
      annyang.addCommands(commands);
      annyang.start();
    }
}
