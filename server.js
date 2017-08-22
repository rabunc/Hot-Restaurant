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

// =======
app.use(express.static("app/public")); // virtual path
  // can also provide a specific virtual path
  // example: app.use("/jim", express.static("app/public"));


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

var reservationList = require("./app/data/reservationList.js");
var waitList = require("./app/data/waitList.js");

// html routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/reserve.html"));
});


// API data routes
app.get("/api/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/data/reservationList.js"));
});

app.get("/api/waitlist", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/data/waitList.js"));
});

app.post("/api/new",function(req, res) {
  // add to the api reservationlist.js or waitlist.js
  // depends on the length of the reservationlist.js (if < 5 add)
    // else add to waitlist.js
  var reservation = req.body;

  // add to reservation list if table available
  // else add to the wait list
  if (reservationList.length < 5) {
    reservationList.push(reservation);
    console.log(reservation);
    alert("You got a table!");
  } else {
    waitList.push(reservation);
    console.log(reservation);
    console.log("Going to have to wait...");
  }

});