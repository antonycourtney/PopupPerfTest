'use strict';

var testStateUrl = "data/testData.json";

function loadTestData(callback) {
  var request = new XMLHttpRequest();
  request.open('GET', testStateUrl, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      console.log("Got tabData");
      var data = JSON.parse(request.responseText);
      console.log("contents: ", data);
      callback(data.tabData);
    } else {
      // We reached our target server, but it returned an error
      console.error("request failed, error: ", request.status, request);
    }
  };
  request.send();        
}

function onDataLoaded(testData) {
  console.log("data loaded");
  window.testData = testData;
}

function main() {
  console.log("bgHelper main");
  loadTestData(onDataLoaded);
}

main();