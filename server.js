var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var middleware = require("./middleware.js");

const PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(middleware.logger);
app.use(bodyParser.json()); //anytime json information is received, it is parsed.

app.get("/", function(req, res) {
	res.send('ToDo API Root');
});


// GET /todos
app.get("/todos", function(req, res) {
	res.json(todos); // This converts the array to json and send
});

// GET /todos
app.get("/todos/:id", function(req, res) {
	var todoId = parseInt(req.params.id,10);
	var matchedTodo;
	
	// search all the todos for the todo with the id chosen.
	todos.forEach(function (todo) {
		console.log("id: " + todo.id + " "+todoId);
		if (todo.id === todoId) {
			matchedTodo = todo;
		}
	});
	
	// In case todo with the id is not found
	if(matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send("Item not found");
	}
});

//POST /todos request : send a json object to server
app.post("/todos", function(req, res) {
	var body = req.body;
	
	body.id = todoNextId;
	todoNextId += 1;
	
	console.log("Description" + body.description);
	todos.push(body);
	
	res.json(body);
});


app.listen(PORT, function() {
	console.log("Express listening on port " + PORT +"!");
})


// var todos = [{
// 	id: 1,
// 	description: "Meet mom for lunch",
// 	completed: false
// }, {
// 	id: 5,
// 	description: "Go to market",
// 	completed: false
// }, {
// 	id: 3,
// 	description: "Purchase fruits",
// 	completed: true
// }, {
// 	id: 4,
// 	description: "IOS App submission",
// 	completed: false
// }];
