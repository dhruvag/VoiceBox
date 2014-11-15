var pdfElement = document.createElement("div");
var baseURL = window.location.href.slice(0,-4) + ".pdf";
var renderedPDF = "http://104.41.129.152/" + baseURL;
pdfElement.innerHTML = '<iframe src="' + renderedPDF + '" style="position:fixed; top:0; right:0" width="50%" height="100%"></iframe>';
document.body.appendChild(pdfElement);
var latex = document.getElementsByTagName('pre')[0];

// CSS styling for LaTeX pane
latex.style.width = "50%";
latex.style.float = "left";

