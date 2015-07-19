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

var bgw = chrome.extension.getBackgroundPage();

var t_start = performance.now();

function loaded() {
  var t_load = performance.now();
  console.log("load completed in ", t_load - t_start, " ms.");
}
window.onload = loaded;

function renderPopup() {
  console.log("renderPopup");

  var tabItems = bgw.testData;
  console.log("Got test data from background window");
  renderIcons(tabItems);
}

document.addEventListener('DOMContentLoaded', renderPopup );