var jwt = require('jsonwebtoken');

module.exports = function(app){
	var api = {};

	api.login = function(req,res){
		var usuario = {};
		usuario.login = req.body.login;
		usuario.password = req.body.password;

		// verificar o usuario no banco de dados
		if (usuario.login != 'jurasseck' || usuario.password != '123') {
			res.sendStatus(401);
		}

		// Se estiver tudo ok ele gera o token, adiciona no header e devolve a resposta para o back-end
		var token = jwt.sign({usuario: usuario.login}, app.get('secret'));

		res.set('x-access-token', token);
		res.end();
	}

	api.verificar = function(req,res,next){

	}

	return api;
}