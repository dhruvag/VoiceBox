function processCommand(command) {
    if (command.indexOf('next') > -1) {
        console.log('next');
        $("div[aria-label='Older']").click();
    }

    else if (command.indexOf('previous') > -1) {
        console.log('previous');
        $("div[aria-label='Newer']").click();
    }

    else if (command.indexOf('reply') > -1) {
        console.log('reply');
        $("div[aria-label='Reply']").click();
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
    else if ((command.indexOf('drafts') > -1) || (command.indexOf('draft') > -1)) {
        console.log('drafts');
        $('a[href="https://mail.google.com/mail/u/0/#drafts"]')[0].click();
    }

    else if (command.indexOf('unread') > -1) {
        console.log('unread');
        document.location.href = "https://mail.google.com/mail/u/0/#search/label%3Aunread";
    }

    else if (command.indexOf('read') > -1) {
        console.log('read');
        document.location.href = "https://mail.google.com/mail/u/0/#search/label%3Aread";
    }

    else if (command.indexOf('chats') > -1) {
        console.log('chats');
        document.location.href = "https://mail.google.com/mail/u/0/#chats";
    }
    
    else if (command.indexOf('drafts') > -1) {
        console.log('drafts');
        document.location.href = "https://mail.google.com/mail/u/0/#drafts";
    }
    
    else if (command.indexOf('spam') > -1) {
        console.log('spam');
        document.location.href = "https://mail.google.com/mail/u/0/#spam";
    }
    
    else if (command.indexOf('starred') > -1) {
        console.log('starred');
        document.location.href = "https://mail.google.com/mail/u/0/#starred";
    }
    
    else if (command.indexOf('attachments') > -1) {
        console.log('attachments');
        document.location.href = "https://mail.google.com/mail/u/0/#search/has%3Aattachment";
    }
    else if (command.indexOf('dictate') > -1) {
        console.log('dictate');
        var u = new SpeechSynthesisUtterance();
        u.text = $('.a3s').text();
        speechSynthesis.speak(u);
    }
  }

function processLabel(label) {
    console.log('label');
    document.location.href = "https://mail.google.com/mail/u/0/#label/" + label;
}

function processSearch(term) {
    console.log('search');
    term = term.replace(/\s+/g, '+');
    document.location.href = "https://mail.google.com/mail/u/0/#search/" + term;
}

function processTemporalSearch(term) {
    console.log('temporal search');
    if (term.indexOf('day') > -1) {
      term = "1d";
    }
    else if (term.indexOf('week') > -1) {
      term = "1w";
    }
    else if (term.indexOf('two weeks') > -1) {
      term = "2w";
    }
    else if (term.indexOf('month') > -1) {
      term = "1m";
    }
    else if (term.indexOf('year') > -1) {
      term = "1y";
    };
    document.location.href = 
    "https://mail.google.com/mail/u/0/#advanced-search/subset=sent&within=" + term + "&sizeoperator=s_sl&sizeunit=s_smb&date=today"
}

annyang = function() {
    if (annyang) {
      var commands = {
        'Gmail label *name': processLabel,
        'Gmail search for last *term': processTemporalSearch,
        'Gmail search *term': processSearch,
        'Gmail *command': processCommand
      };
      annyang.addCommands(commands);
      annyang.start();
      annyang.debug();
    }
}

window.onload = annyang;
