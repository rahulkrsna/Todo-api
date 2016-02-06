var express = require("express");
var bodyParser = require("body-parser");
var middleware = require("./middleware.js");
var _ = require("underscore");

var app = express();
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
	var matchedTodo = _.findWhere(todos, {id: todoId});
	
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
	if(!_.isBoolean(body.completed) 
		|| !_.isString(body.description) 
		|| body.description.trim().length === 0) {
			
		return res.status(400).send();
	} else {
		body = _.pick(body, "description", "completed");
		body.id = todoNextId;
		body.description = body.description.trim();
		todoNextId += 1;
	
		todos.push(body);
	
		res.json(body);
	}
	
});

//DELETE /todos/:id
app.delete("/todos/:id", function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	
	if(matchedTodo) {
		todos = _.without(todos,matchedTodo);
		res.send("Item " + matchedTodo.description + " is deleted!");
	} else {
		res.status(404).send("Item not found");
	}
});

app.listen(PORT, function() {
	console.log("Express listening on port " + PORT +"!");
})
