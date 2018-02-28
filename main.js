$(document).ready(function(){
    $("#time").text(moment().format('h:mm a'));
    $("#date").text(moment().format('MMM Do'));
    $("#day").text(moment().format('dddd'));
  //  $("#temperature").text("2° C");
    var ip = "https://ipapi.co/json";
    var city = "";
    var weather = "";
    var temperature = "";
    var weatherPt1 = "http://api.openweathermap.org/data/2.5/weather?q=";
    var weatherPt2 = "&units=metric&appid=61b7dea7676c4389bfcdc80e58c1089b";
    var crossOrigin = "https://cors-anywhere.herokuapp.com/";
      
    $.getJSON(ip, function(data){
      $("#location").text(data.city + ", "+data.country_name);
      city = data.city;
      weather = weatherPt1 + city + weatherPt2
      $.getJSON(crossOrigin + weather, function(temp){
        $("#temperature").text(temp.main.temp + "°C");
        temperature = temp.main.temp;
        $("#weather").text(temp.weather[0].main);
        $("#image").html("<img class='img-fluid' src='http://openweathermap.org/img/w/"+temp.weather[0].icon+".png'>");
        return temperature;
      });
    });  
    
    $("button").on("click", function() {
      var el = $(this);
      var signo = "°C";
      if ( el.text() == el.data("text-swap") ){
        el.text(el.data("text-original"))
        signo ="°C"
      }else{
        el.text(el.data("text-swap"))
        signo ="°F"
      }
      el.text() == el.data("text-swap") 
      ? temperature = ((temperature*9/5) + 32).toFixed(2)
      : temperature = ((temperature - 32)*5/9).toFixed(2);
      $("#temperature").text(temperature+signo);
    });
  });