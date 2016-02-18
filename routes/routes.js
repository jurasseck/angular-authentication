module.exports = function(app){
	var api = require('../controllers/api')(app);

	app.post('/login', api.login);
	app.get('/pode', api.teste);
	// AS URLS DAQUI PARA BAIXO NECESSITAM DE AUTENTICAÇÃO PARA FUNCIONAR!!!!!!!!
	app.use('/*', api.verificaToken);
	app.get('/naopode', api.teste);
	app.get('/xama', api.xama);
}