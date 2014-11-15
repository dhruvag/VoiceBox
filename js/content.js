function processCommand(command) {
    if (command.indexOf('next') > -1) {
        console.log('next');
        $("div[aria-label='Older']").click();
    }

    else if (command.indexOf('previous') > -1) {
        console.log('previous');
        $("div[aria-label='Newer']").click();
    }

    else if (command.indexOf('delete') > -1) {
        console.log('delete');
        $("div[aria-label='Delete']").click();
    }

    else if (command.indexOf('sent') > -1) {
        console.log('sent');
        $('a[href="https://mail.google.com/mail/u/0/#sent"]')[0].click();
    }

    else if (command.indexOf('important') > -1) {
        console.log('important');
        $('a[href="https://mail.google.com/mail/u/0/#imp"]')[0].click();
    }

    else if (command.indexOf('compose') > -1) {
        console.log('compose');
        document.location.href += "?compose=new";
    }

    else if (command.indexOf('inbox') > -1) {
        console.log('inbox');
        $('a[href="https://mail.google.com/mail/u/0/#inbox"]')[0].click();
    }

    else if (command.indexOf('trash') > -1) {
        console.log('trash');
        $('a[href="https://mail.google.com/mail/u/0/#trash"]')[0].click();
    }
}

function processLabel(label) {
    document.location.href = "https://mail.google.com/mail/u/0/#label/" + label;
}

annyang = function() {
    if (annyang) {
      var commands = {
        'Gmail label *name': processLabel,
        'Gmail *command': processCommand
      };
      annyang.addCommands(commands);
      annyang.start();
      annyang.debug();
    }
}

window.onload = annyang;
