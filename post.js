document.addEventListener("DOMContentLoaded", bindInfo2);

function bindInfo2()
{
	document.getElementById("submitInfo").addEventListener("click", function(event) 
	{
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