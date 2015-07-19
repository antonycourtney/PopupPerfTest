'use strict';

function genFaviconDiv(){
	var faviconDiv = document.createElement('div');
	faviconDiv.className = "faviconDiv";
	return faviconDiv;
}

function addFaviconImg(item) {
  var faviconDiv = genFaviconDiv();
  var faviconTitle = item.title.replace(/\"/g, "");
  faviconDiv.innerHTML += '<a href="' + item.url + '"><img title="Title: ' + faviconTitle + '&#10;" class="favicon" src="' + item.favIconUrl + '"></img></a>';
  document.getElementById('faviconHolder').appendChild(faviconDiv);    
}


function renderIcons(tabItems){
  for (var i = 0; i < tabItems.length; i++ ) {
    addFaviconImg(tabItems[i]);
  }
}

var testStateUrl = "data/testData.json";

function loadTestData(callback) {
  var request = new XMLHttpRequest();
  request.open('GET', testStateUrl, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      callback(data.tabData);
    } else {
      // We reached our target server, but it returned an error
      console.error("request failed, error: ", request.status, request);
    }
  };
  request.send();        
}

var t_start = performance.now();

function loaded() {
  var t_load = performance.now();
  console.log("load completed in ", t_load - t_start, " ms.");
}
window.onload = loaded;


function renderPopup() {
  loadTestData(renderIcons);
}

document.addEventListener('DOMContentLoaded', renderPopup );