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
		var token = jwt.sign({usuario: usuario.login}, app.get('secret'), {
			expiresIn: 84600
		});

		res.set('x-access-token', token);
		res.end();
	}

	api.verificaToken = function(req,res,next){
		var token = req.headers['x-access-token'];
		if (token) {
			jwt.verify(token, app.get('secret'), function(err, decoded){
				if (err) {
					res.sendStatus(401);
				}
				req.usuario = decoded;
				next();
			});
		} else {
			res.sendStatus(401);
		}
	}

	api.teste = function(req,res){
		res.json('weeee');
	}

	api.xama = function(req,res){
		res.json('XAMA');
	}

	return api;
}