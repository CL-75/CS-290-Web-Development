document.getElementById("addExerciseButton").addEventListener("click", function(event){
	var addExercise = document.getElementById("addExercise");
	var req = new XMLHttpRequest();
	var params = "exercise=" + addExercise.elements.exercise.value + 
	                          "&reps=" + addExercise.elements.reps.value +
	                          "&weight=" + addExercise.elements.weight.value +
	                          "&date=" + addExercise.elements.date.value;
	   if(addExercise.elements.unitCheck.checked)
	   	params += "&unitCheck=1";

	   else
	   	params += "&unitCheck=0";

	req.open("GET", "/insert?" + params, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.addEventListener("load", function(){
		if(req.status >= 200 && req.status < 400)
		{
			var response = JSON.parse(req.responseText);
			var id = response.inserted;
			var table = document.getElementById("exerciseTable");
			var row = table.insertRow(-1);
			
			var exerciseName = document.createElement("td");
			exerciseName.textContent = addExercise.elements.exercise.value;
			row.appendChild(exerciseName);

			var count = document.createElement("td");
			count.textContent = addExercise.elements.reps.value;
			row.appendChild(count);

			var lifted = document.createElement("td");
			lifted.textContent = addExercise.elements.weight.value;
			row.appendChild(lifted);

			var dateCompleted = document.createElement("td");
			dateCompleted.textContent = addExercise.elements.date.value;
			row.appendChild(dateCompleted);

			var unitChecker = document.createElement("td");
			 if(addExercise.elements.unitCheck.checked)
			 	unitChecker.textContent = "lbs";

			 else
			 	unitChecker.textContent = "kgs";

			 row.appendChild(unitChecker);

			 var updateData = document.createElement("td");
			 var updateDataLink = document.createElement("a");
			 updateDataLink.setAttribute("href", "/updateTable?id=" + id);
			 var updateButton = document.createElement("input");
			 updateButton.setAttribute("value", "Update Exercise");
			 updateButton.setAttribute("type", "button");
			 updateDataLink.appendChild(updateButton);
			 updateData.appendChild(updateDataLink);
			 row.appendChild(updateData);

			 var deleteCell = document.createElement("td");
			 var deleteButton = document.createElement("input");
			 deleteButton.setAttribute("type", "button");
			 deleteButton.setAttribute("name", "delete");
			 deleteButton.setAttribute("value", "Delete");
			 deleteButton.setAttribute("onClick", 'deleteData("dataTable",' + id + ')');
			 var deleteHidden = document.createElement("input");
			 deleteHidden.setAttribute("type", "hidden");
			 deleteHidden.setAttribute("id", "delete" + id);
			 deleteCell.appendChild(deleteButton);
			 deleteCell.appendChild(deleteHidden);
			 row.appendChild(deleteCell);
        }

        else
        	console.log("Error.");
	});

	req.send("/insert?" + params);
	event.preventDefault();
});

function deleteData(tableId, id){
	var deleteItem = "delete" + id;
	var table = document.getElementById("exerciseTable");
	var numOfRows = table.rows.length;

	 for(var x=1; x<numOfRows; x++)
	 {
	 	var row = table.rows[x];
	 	var find = row.getElementsByTagName("td");
	 	var erase = find[find.length - 1];
	 	if(erase.children[1].id === deleteItem)
	 		table.deleteRow(x);
	 }

  var req = new XMLHttpRequest();
  req.open("GET", "/delete?id=" + id, true);
  req.addEventListener("load", function(){
  	
  	if(req.status >= 200 && req.status < 400)
  		console.log("Success!");

  	else
  		console.log("Error.");
  });

 req.send("/delete?id=" + id);

}


