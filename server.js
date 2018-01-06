// server.js
// Timestamp microservice project
// https://www.freecodecamp.org/challenges/timestamp-microservice


// init project
var express = require('express');
var app = express();


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


// Allow a plain old html page to describe the microservice.
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// Actually do work if someone passed in data via GET.
app.get("/:TIME", function (request, response) {
  
  // Helper function to create the expected date string 
  // we want to return.
  function buildNaturalDateString(d) {
    
    const monthStr = ["January", "February", "March", "April",
                     "May", "June", "July", "August", "September",
                     "October", "November", "December"];
    
    var stringDate = ""
    stringDate = "" + monthStr[d.getMonth()];
    stringDate += " " + d.getDate();
    stringDate += ", " + d.getFullYear();
    return stringDate;
  }  
  
  // Preload our object with nulls.
  var timestamp = { "unix": null, "natural": null };
  
  // Try to parse this as a pure integer.
  var unixTimestamp = parseInt(request.params.TIME, 10);

  // And try to parse as if it was a date string.
  var milliseconds = Date.parse(request.params.TIME);

  // Check our results, fill in the return object if applicable.
  if (!isNaN(unixTimestamp)) {
    timestamp.unix = unixTimestamp;
    timestamp.natural = buildNaturalDateString(new Date(timestamp.unix * 1000));
  }
  else if (!isNaN(milliseconds)) {
    timestamp.unix = Math.round(milliseconds / 1000);
    timestamp.natural = buildNaturalDateString(new Date(request.params.TIME));
  }
  
  response.send(JSON.stringify(timestamp));
  return;  
});

        
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

