var table = makeTable();
var body = document.body;
body.appendChild(table);

var current = [0,0];
document.getElementById("00").style.borderWidth = "5px";

var up = document.createElement("button");
up.textContent = "Up";
up.id = "upButton";
up.addEventListener("click", function() { buttonPressed("up", current); });
body.appendChild(up);

var down = document.createElement("button");
down.textContent = "Down";
down.id = "downButton";
down.addEventListener("click", function() { buttonPressed("down", current); });
body.appendChild(down);

var left = document.createElement("button");
left.textContent = "Left";
left.id = "leftButton";
left.addEventListener("click", function() { buttonPressed("left", current); });
body.appendChild(left);

var right = document.createElement("button");
right.textContent = "Right";
right.id = "rightButton";
right.addEventListener("click", function() { buttonPressed("right", current); });
body.appendChild(right);

var mark = document.createElement("button");
mark.textContent = "Mark Cell";
mark.id = "markButton";
mark.addEventListener("click", function() { buttonPressed("mark", current); });
body.appendChild(mark);



function buttonPressed(dir, loc)
{
    console.log();

     switch(dir)
     {
        case "left":
          if(loc[0] > 0)
          {
            document.getElementById(loc[0] + "" + loc[1]).style.borderWidth = "3px";
            loc[0]--;
            document.getElementById(loc[0] + "" + loc[1]).style.borderWidth = "5px"; 
          }
          break;

        case "right":
          if(loc[0] < 3)
          {
            document.getElementById(loc[0] + "" + loc[1]).style.borderWidth = "3px";
            loc[0]++;
            document.getElementById(loc[0] + "" + loc[1]).style.borderWidth = "5px"; 
          }
          break;

        case "up":
          if(loc[1] > 0)
          {
            document.getElementById(loc[0] + "" + loc[1]).style.borderWidth = "3px";
            loc[1]--;
            document.getElementById(loc[0] + "" + loc[1]).style.borderWidth = "5px"; 
          }
          break;

        case "down":
          if(loc[1] < 2)
          {
            document.getElementById(loc[0] + "" + loc[1]).style.borderWidth = "3px";
            loc[1]++;
            document.getElementById(loc[0] + "" + loc[1]).style.borderWidth = "5px";
          }
          break;

        case "mark":
          document.getElementById(loc[0] + "" + loc[1]).style.backgroundColor = "yellow";
          break;
     }

   return loc;
}


function makeTable()
{
    var table = document.createElement("table");
    table.appendChild(document.createElement("thead"));
    table.firstElementChild.appendChild(document.createElement("tr"));
    console.log(table);
    table = table.firstElementChild.firstElementChild;
      for(var x=0; x<4; x++)
      {
        var item = document.createElement("th");
        item.textContent = "Header " + (x + 1);
        item.id = "H" + (x);
        table.appendChild(item);
      }

    table = table.parentElement.parentElement;

    table.appendChild(document.createElement("tbody"));
    table = table.children[1];
      for(var x=0; x<3; x++){
        var row = document.createElement("tr");

      for(var y=0; y<4; y++)
      {
        var item = document.createElement("td");
        item.textContent = (y+1) + ", " + (x+1);
        item.id = (y) + "" + (x);
        row.appendChild(item);
      }

    table.appendChild(row);
  }

  table = table.parentElement;
  table.style.borderStyle = "solid";

  var cells = table.getElementsByTagName("th");
    for(var x=0; x<cells.length; x++)
    {
        cells[x].style.borderStyle = "solid";
        cells[x].style.backgroundColor = "red";
    }

   cells = table.getElementsByTagName("td");
     for(var y=0; y<cells.length; y++)
        cells[y].style.borderStyle = "solid";

    return table;
}