var jwt = require('jsonwebtoken');
var Usuario = require('../models/user');

module.exports = function(app){
	var api = {};

	api.default = function(req,res){
		var user = new Usuario({
			name: 'Administrador',
			username: 'admin',
			password: 'admin'
		});

		user.save(function(err){
			if (err) {
				res.sendStatus(500);
			}
			res.sendStatus(200);
		});
	}

	api.login = function(req,res){
		var q = {
			'username': req.body.username,
			'password': req.body.password
		};

		Usuario.findOne(q,function(err, user){
			if (err) {
				res.sendStatus(401);
			}

			var token = jwt.sign({usuario: user.username}, app.get('secret'), {
				expiresIn: 84600
			});

			res.set('x-access-token', token);
			res.end();
		});
	}

	api.create = function(req,res){
		var user = new Usuario({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});

		user.save(function(err){
			if (err) {
				res.sendStatus(500);
			}
			res.sendStatus(200);
		});
	}

	api.list = function(req,res){
		Usuario.find(function(err, users){
			if (err) {
				res.sendStatus(500);
			}

			res.json(users);
		});
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