var express = require('express');
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("app/public")); // virtual path

// listening on port
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/reserve.html"));
});

app.post("/api/new",function(req, res) {
  // add to the api reservationlist.js or waitlist.js
  // depends on the length of the reservationlist.js (if < 5 add)
    // else add to waitlist.js
  var reservation = req.body;

});