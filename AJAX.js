/* Weather JS */
document.addEventListener('DOMContentLoded', bindInfo);

 function bindInfo()
 {
 	document.getElementById('getWeather').addEventListener('click', function(event){
 		var req = new XMLHttpRequest();
 		var appID = "&appid=ede6f4591736ba38f5bd5db4d9626a02";
 		var zip = document.getElementById("zip").value;
 		var city = document.getElementById("city").value;
 		var payload;

 		 if(zip == 5)
 		 	payload = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + appID;

 		 else
 		 	payload = "http://api.openweathermap.org/data/2.5/weather?q=" + city + appID;


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


/* POST JS*/
document.addEventListener("DOMContentLoded", bindInfo2);

function bindInfo2()
{
	document.getElementById("submitInfo").addEventListener("click", function(event) {
		var req = new XMLHttpRequest();
		var site = "http://httpbin.org/post";
		var payload = {"color": null,"shape": null};

		payload.color = document.getElementById("color").value;
		payload.shape = document.getElementById("shape").value;

		req.open("POST", site, true);
		req.setRequestHeader("Content-Type", "application/json");
		req.addEventListener("load", function() {
			if(req.status >= 200 && req.status < 400)
			{
				var res = JSON.parse(JSON.parse(req.responseText).data);
				printResults(res);
			}

			else
				console.log("Error.");

		});

		req.send(JSON.stringify(payload));
		event.preventDefault();
	});
}


function printResults(res)
{
	document.getElementById("favColor").textContent = res.color;
	document.getElementById("favShape").textContent = res.shape;
}