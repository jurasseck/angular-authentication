module.exports = function(app){
	var api = require('../controllers/api')(app);

	app.post('/login', api.login);
}