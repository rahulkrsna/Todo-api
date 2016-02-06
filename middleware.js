
module.exports = {
	logger: function (req, res, next) {
		console.log("Request: " + new Date().toString() + " " + req.method + " " + req.originalUrl);
		next();
	}
}