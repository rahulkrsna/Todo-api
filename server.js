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
	var queryParams = req.query; // an object that stores the request params
	var filteredTodos;
	
	// Filter the output based on the query params.
	if(queryParams.hasOwnProperty("completed")) {
		if(queryParams.completed === "true") {
			filteredTodos = _.where(todos, {completed: true});
		} else if (queryParams.completed === "false") {
			filteredTodos = _.where(todos, {completed: false});
		} else {
			return res.status(404).send("No Item found for the query");
		}
		// Return the filtered items.
		res.json(filteredTodos);
	} else {
		res.json(todos); // This converts the array to json and send
	}
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

// PUT /todos/:id
app.put("/todos/:id", function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId})
	var body = _.pick(req.body, "description", "completed");
	var validAttributes = {};
	
	if(!matchedTodo) {
		return res.status(404).send("Item not found");
	}
	
	if (body.hasOwnProperty("completed")) {
		if(_.isBoolean(body.completed)) {
			validAttributes.completed = body.completed;
		} else {
			console.log("Not boolean");
			return res.status(400).send();
		}
	}
	if(body.hasOwnProperty("description")) {
		if(_.isString(body.description) && body.description.trim().length > 0) {
			validAttributes.description = body.description;	
		} else {
			console.log("Description not in format");
			return res.status(400).send();
		}
	}
	console.log("Updates: " + validAttributes);
	// updated the attribute values in matchedTodo with that of validAttributes
	console.log(matchedTodo);
	_.extend(matchedTodo,validAttributes);
	console.log(matchedTodo);
	res.json(matchedTodo);
	 
});

app.listen(PORT, function() {
	console.log("Express listening on port " + PORT +"!");
})
