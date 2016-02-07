var Sequelize = require("sequelize");
var sequelize = new Sequelize(undefined, undefined, undefined, {
	"dialect": "sqlite",
	"storage": __dirname+"/basic-sqlite-database.sqlite"
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync().then(function() {
	console.log("Everything synced!");
	
	Todo.findById(12).then(function(todo) {
		if(todo) {
			console.log(todo.toJSON());
		} else {
			console.log("Item not found");
		}
	})
	// Todo.create({
// 		description: "Grading CSE340",
// 		completed: true
// 	}).then(function() {
// 		// return Todo.findById(1)
// 		return Todo.findAll({
// 			where: {
// 				completed: false,
// 				description: {
// 					$like: "%Grading%"
// 				}
// 			}
// 		})
// 	}).then(function(todos) {
// 		if(todos) {
// 			todos.forEach(function(todo) {
// 				console.log(todo.toJSON());
// 			});
// 		} else {
// 			console.log("No Todo Found");
// 		}
// 	}).catch(function(e) {
// 		console.log(e);
// 	})
})