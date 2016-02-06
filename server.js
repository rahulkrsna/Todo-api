var express = require("express");
var app = express();
const PORT = process.env.PORT || 3000;
var middleware = require("./middleware.js");
var todos = [{
	id: 1,
	description: "Meet mom for lunch",
	completed: false
}, {
	id: 2,
	description: "Go to market",
	completed: false
}, {
	id: 3,
	description: "Purchase fruits",
	completed: true
}];


app.use(middleware.logger);

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


app.listen(PORT, function() {
	console.log("Express listening on port " + PORT +"!");
})