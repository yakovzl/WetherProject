const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res) {

res.sendFile(__dirname+"/index.html");

});

app.post("/" ,function(req,res) {
  var city=req.body.cityName;
  var apiKey="99d1217381eff9e4c85f443793d593d7";
  var unit="metric";
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      console.log(data);
      var wether = JSON.parse(data);
      console.log(wether);
      var feelLike = wether.main.feels_like;
      var temp = wether.main.temp;
      var description = wether.weather[0].description;
      var icon=wether.weather[0].icon;
      var imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.header('content-type', 'text/html');
      res.write("<p> the weather is currenly " + description+"</p>");
      res.write("<h1> The temperator in "+city+" is " + temp + " dgrees celcius it is feel like " + feelLike+" dgrees <h1>");
      res.write("<img src ="+imageurl+">");
      res.send();
    });
  });

})




app.listen(3000, function() {
  console.log("listining on port 3000");
});
