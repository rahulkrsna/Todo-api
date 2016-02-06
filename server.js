var express = require("express");
var app = express();
const PORT = process.env.PORT || 3000;
var middleware = require("./middleware.js");

app.use(middleware.logger);

app.get("/", function(req, res) {
	res.send('ToDo API Root'+PORT);
});

app.listen(PORT, function() {
	console.log("Express listening on port " + PORT +"!");
})