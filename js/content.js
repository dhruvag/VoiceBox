window.onload = function () {
myButton = document.createElement("input");
myButton.type = "button";
myButton.value = "Say command";
placeHolder = document.getElementsByClassName("nH aqK")[0];
placeHolder.appendChild(myButton);


var recognition = new webkitSpeechRecognition();
var i = 0;
recognition.continuous = true;
// recognition.interimResults = false;
recognition.onresult = function(event) { 
  console.log(event);
  // console.log(event["results"][i][0]); // print in JS
  i++;
}
recognition.start();
}
