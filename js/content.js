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
    else if (command.indexOf('preview') > -1) {
	   	// helper function to parse long text
		var speechUtteranceChunker = function (utt, settings, callback) {
			settings = settings || {};
			var newUtt;
			var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
			if (utt.voice && utt.voice.voiceURI === 'native') { // Not part of the spec
				newUtt = utt;
				newUtt.text = txt;
				newUtt.addEventListener('end', function () {
				    if (speechUtteranceChunker.cancel) {
				        speechUtteranceChunker.cancel = false;
				    }
				    if (callback !== undefined) {
				        callback();
				    }
				});
			} else {
				var chunkLength = (settings && settings.chunkLength) || 160;
				var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
				var chunkArr = txt.match(pattRegex);
				if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
			    //call once all text has been spoken...
			    	if (callback !== undefined) {
			        	callback();
			    	}
			    	return;
				}
				var chunk = chunkArr[0];
				newUtt = new SpeechSynthesisUtterance(chunk);
				var x;
				for (x in utt) {
				    if (utt.hasOwnProperty(x) && x !== 'text') {
				        newUtt[x] = utt[x];
				    }
				}
				newUtt.addEventListener('end', function () {
			    	if (speechUtteranceChunker.cancel) {
			        	speechUtteranceChunker.cancel = false;
			        	return;
			    	}
				    settings.offset = settings.offset || 0;
				    settings.offset += chunk.length - 1;
				    speechUtteranceChunker(utt, settings, callback);
	        	});
			}	

		    if (settings.modifier) {
		        settings.modifier(newUtt);
		    }
		    console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
		    //placing the speak invocation inside a callback fixes ordering and onend issues.
		    setTimeout(function () {
		        speechSynthesis.speak(newUtt);
		    }, 0);
		};

		// var previewstate = 1;
		var divarr = $(".afn"); // unread, from, subject, and preview date?
		// console.log(divarr.text());
		console.log(divarr);
		var longtext = "";
		for(var i=0; i < divarr.length; i++ ) {
			longtext += divarr[i].textContent;
		}

		// console.log($('.a3s').text());
         var u = new SpeechSynthesisUtterance();
         var voices = speechSynthesis.getVoices();
         u.default = false;
	     u.voice = voices[1];
	     u.voiceURI = 'native';
	     u.volume = 1;
	     u.rate = 1;
	     u.pitch = 2;
	     u.lang = 'en-US';
         u.text = longtext;
         // console.log(u);
         // window.speechSynthesis.speak(u);
         
     	speechUtteranceChunker(u, {
		    chunkLength: 120
		}, function () {
		    //some code to execute when done
		    console.log('done');
		});
    }

    else if (command.indexOf('speak') > -1) {
   	
   	// helper function to parse long text
	    var speechUtteranceChunker = function (utt, settings, callback) {
		    settings = settings || {};
		    var newUtt;
		    var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
		    if (utt.voice && utt.voice.voiceURI === 'native') { // Not part of the spec
		        newUtt = utt;
		        newUtt.text = txt;
		        newUtt.addEventListener('end', function () {
		            if (speechUtteranceChunker.cancel) {
		                speechUtteranceChunker.cancel = false;
		            }
		            if (callback !== undefined) {
		                callback();
		            }
		        });
		    } else {
		        var chunkLength = (settings && settings.chunkLength) || 160;
		        var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
		        var chunkArr = txt.match(pattRegex);

		        if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
		            //call once all text has been spoken...
		            if (callback !== undefined) {
		                callback();
		            }
		            return;
		        }
		        var chunk = chunkArr[0];
		        newUtt = new SpeechSynthesisUtterance(chunk);
		        var x;
		        for (x in utt) {
		            if (utt.hasOwnProperty(x) && x !== 'text') {
		                newUtt[x] = utt[x];
		            }
		        }
		        newUtt.addEventListener('end', function () {
		            if (speechUtteranceChunker.cancel) {
		                speechUtteranceChunker.cancel = false;
		                return;
		            }
		            settings.offset = settings.offset || 0;
		            settings.offset += chunk.length - 1;
		            speechUtteranceChunker(utt, settings, callback);
		        });
			}	

		    if (settings.modifier) {
		        settings.modifier(newUtt);
		    }
		    console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
		    //placing the speak invocation inside a callback fixes ordering and onend issues.
		    setTimeout(function () {
		        speechSynthesis.speak(newUtt);
		    }, 0);
		};

        console.log($('.a3s').text());
         var u = new SpeechSynthesisUtterance();
         var voices = speechSynthesis.getVoices();
	     u.voice = voices[1];
	     u.voiceURI = 'native';
	     u.volume = 1;
	     u.rate = 1;
	     u.pitch = 2;
	     u.lang = 'en-US';
         u.text = $('.a3s').text();
         console.log(u);

     	speechUtteranceChunker(u, {
		    chunkLength: 120
		}, function () {
		    //some code to execute when done
		    console.log('done');
		});
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
