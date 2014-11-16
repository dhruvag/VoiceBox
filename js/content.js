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

    else if ((command.indexOf('drafts') > -1) || (command.indexOf('draft') > -1)) {
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
        console.log($('.a3s').text());
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

function processFilter(term) {
    console.log('search');
    var searchFilters = "";
    term = term.replace(/\s+/g, "+");
    term = term.toLowerCase();

    // Ignore the "for" in "Search for ..." commands
    // Ignore the "in" in "Search in ..." commands
    term = term.replace(/^for[+]|^4[+]|^in[+]/g, "");

    // Get the label if there is one
    label = term.split("label+")[1]
    if (label) {
        searchFilters += "label%3A" + label + "+";
    }

    // Add attachment filter if there is one
    if (term.indexOf("attachment") > -1) {
        searchFilters += "has%3Aattachment+";
    }

    // Add spam filter if there is one
    if (term.indexOf("spam") > -1) {
        searchFilters += "is%3Aspam+";
    }

    // Add starred filter if there is one
    if (term.indexOf("star") > -1) {
        searchFilters += "is%3Astarred+";
    }

    // Add drafts filter if there is one
    if (term.indexOf("draft") > -1) {
        searchFilters += "in%3Adraft+";
    }

    // Add chats filter if there is one
    if (term.indexOf("chat") > -1) {
        searchFilters += "in%3Achats+";
    }

    // Add read filter if there is one
    if ((term.indexOf("read") > -1) && (term.indexOf("unread") === -1)) {
        searchFilters += "is%3Aread+";
    }

    // Add unread filter if there is one
    if (term.indexOf("unread") > -1) {
        searchFilters += "is%3Aunread+";
    }

    // Add trash filter if there is one
    if (term.indexOf("trash") > -1) {
        searchFilters += "in%3Atrash+";
    }

    // Simple time based filtering
    var d = new Date();
    var today = d.getFullYear() + "%2F" + d.getMonth() + "%2F" + d.getDate();
    var timeInverval = term.match(/(last|past)[+](week|day|month|year)[+]/);

    if (timeInverval) {
        timeInverval = timeInverval[2];
        var seconds = d.getTime();
        if (timeInverval === "day") {
            var b = new Date(seconds - 1000 * 60 * 60 * 24);
        }
        else if (timeInverval === "week") {
            var b = new Date(seconds - 1000 * 60 * 60 * 24 * 7);
        }
        else if (timeInverval === "month") {
            var b = new Date(seconds - 1000 * 60 * 60 * 24 * 30);
        }
        else if (timeInverval === "year") {
            var b = new Date(seconds - 1000 * 60 * 60 * 24 * 365);
        }
        var before = b.getFullYear() + "%2F" + b.getMonth() + "%2F" + b.getDate();
        var phrase = "after%3A" + today + "+" + "before%3A" + before;
        searchFilters += phrase + "+"
    }

    if (searchFilters !== "") {
        document.location.href = "https://mail.google.com/mail/u/0/#search/" + searchFilters;
    }
}

annyang = function() {
    if (annyang) {
      var commands = {
        'Gmail label *name': processLabel,
        'Gmail search for the phrase *term': processSearch,
        'Gmail search *term': processFilter,
        'Gmail *command': processCommand,
      };
      annyang.addCommands(commands);
      annyang.start();
      annyang.debug();
    }
}

window.onload = annyang;
