const url = require("node:url");
const path = require("node:path");

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var cityQuery = req.body.city;
  var countryQuery = req.body.country;

  const apiKey = "bc683e849a2e5c5bbd95959f4ac9f376";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityQuery + "," + countryQuery + "&units=metric&appid=" + apiKey;
  https.get(url, function(response) {
    response.on('data', function(data) {
      const weatherJSON = JSON.parse(data);
      const temp = weatherJSON.main.temp;
      const description = weatherJSON.weather[0].description;
      const icon = weatherJSON.weather[0].icon;
      const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temperature in " + cityQuery +" is: " + temp + " degrees Celcius</h1>");
      res.write("<h3>The weather is currently: " + description + "</h3>");
      res.write("<img src=" + iconURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("Server running on port 3000!");
});
