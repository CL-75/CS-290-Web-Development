document.addEventListener('DOMContentLoaded', bindInfo);

 function bindInfo()
 {
 	document.getElementById('getWeather').addEventListener('click', function(event)
 	{
 		var req = new XMLHttpRequest();
 		var appID = "&appid=ede6f4591736ba38f5bd5db4d9626a02";

 		var zip = document.getElementById("zipCode").value;
 		var city = document.getElementById("city").value;
 		var payload;

 		 if(zip)
 		 	payload = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us" + appID + "&units=imperial";


 		 else
 		 	payload = "http://api.openweathermap.org/data/2.5/weather?q=" + city + appID + '&units=imperial';


 		req.open("GET", payload, true);
 		req.addEventListener('load', function() {

 			if(req.status >= 200 && req.status < 400)
 			{
 				var res = JSON.parse(req.responseText);
 				printWeather(res);
 			}

 			else
 		      console.log("Error.");
 		});


 		req.send();
 		event.preventDefault();

 });

}


function printWeather(res)
{
	document.getElementById("temp").textContent = res.main.temp;
	document.getElementById("humidity").textContent = res.main.humidity;
	document.getElementById("windSpeed").textContent = res.wind.speed;

}
