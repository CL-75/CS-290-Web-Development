var express = require("express");
var handlebars = require("express-handlebars").create({defaultLayout:"main"});
var bodyParser = require("body-parser");
var app = express();

var mysql = require("mysql");
var pool = mysql.createPool({
	host : "classmysql.engr.oregonstate.edu",
	user : "cs290_levyca",
	password : "8945",
	database : "cs290_levyca"
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 7872);
app.use(express.static("public"));


app.get("/reset-table", function(req, res, next){
   var context = {};
   pool.query("DROP TABLE IF EXISTS workouts", function(err){
      var createString = "CREATE TABLE workouts(" + 
                         "id INT PRIMARY KEY AUTO_INCREMENT," +
                         "name VARCHAR(255) NOT NULL," +
                         "reps INT," + "weight INT," + "date DATE," +
                         "lbs BOOLEAN)";
      pool.query(createString, function(err){
         context.results = "Table reset";
         res.render("home", context);
      })
   });
});



app.get("/", function(req, res, next){
	var context = {};
    pool.query('SELECT * FROM workouts', function(err, rows, fields){
    	if(err)
    	{
    		next(err);
    		return;
    	}
    	var params = [];
    	 for(var row in rows)
    	 {
    	 	var addEntry = {"name": rows[row].name, "reps": rows[row].reps, "weight": rows[row].weight, "date": rows[row].date, "id": rows[row].id};
    	 	 if(rows[row].lbs)
    	 	   addEntry.lbs = "lbs";

    	 	else
    	 	  addEntry.lbs = "kgs";

    	 	params.push(addEntry);
    	 }

    context.results = params;
    res.render("table", context);
    })

 });


app.get("/insert", function(req, res, next){
	var context = {};
	pool.query("INSERT INTO `workouts` (`name`, `reps`, `weight`, `date`,`lbs`) VALUES (?, ?, ?, ?, ?)", [req.query.exercise, req.query.reps, req.query.weight, req.query.date, req.query.unitCheck], function(err, result){
		if(err)
		{
			next(err);
			return;
		}
		context.inserted = result.insertId;
		res.send(JSON.stringify(context));
	});
});


app.get("/delete", function(req, res, next){
	var context = {};
	pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
		if(err)
		{
			next(err);
			return;
		}
	});
});

app.get("/updateTable", function(req, res, next){
	var context = {};
	pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, rows, fields){
		if(err)
		{
			next(err);
			return;
		}
		var params = [];
		 for(var row in rows)
		 {
		 	var addEntry = {"name": rows[row].name, "reps": rows[row].reps, "weight": rows[row].weight, "date": rows[row].date, "id": rows[row].id};
		 	params.push(addEntry);
		 }

		 context.results = params[0];
		 res.render("updateTable", context);
	});
});



app.get("/updateReturn", function(req, res, next){
	var context = {};
	pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
		if(err)
		{
			next(err);
			return;
		}
	if(result.length == 1)
	{
		var curr = result[0];

		 if(req.query.unitCheck == "on")
		 	req.query.unitCheck = "1";
		 

		 else
		 	req.query.unitCheck = "0";

		 pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?",
		 	[req.query.exercise || curr.name, req.query.reps || curr.reps, req.query.weight || curr.weight,
		 	req.query.date || curr.date, req.query.unitCheck, req.query.id], function(err, result){
		 		if(err)
		 		{
		 			next(err);
		 			return;
		 		}

		 		pool.query("SELECT * FROM workouts", function(err, rows, fields){
		 			if(err)
		 			{
		 				next(err);
		 				return;
		 			}

		 			var params = [];
		 			 for(var row in rows)
		 			 {
		 			 	var addEntry = {"name": rows[row].name, "reps": rows[row].reps, "weight": rows[row].weight, "date": rows[row].date, "id": rows[row].id};

		 			 	 if(rows[row].lbs)
		 			 	 	addEntry.lbs = "lbs";

		 			 	 else
		 			 	 	addEntry.lbs = "kgs";

		 			 	 params.push(addEntry);
		 			 }

		 			 context.results = params;
		 			 res.render("home", context);
		 		});
		 	});
	   }

  });

});



app.use(function(req, res){
	res.status(404);
	res.render("404");
});


app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render("500");
});


app.listen(app.get("port"), function(){
	console.log("Server is running...")
});

