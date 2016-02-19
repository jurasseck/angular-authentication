'use strict';

angular.module('app', ['ngRoute'])
.config(function($routeProvider, $httpProvider){

	$httpProvider.interceptors.push('tokenInterceptor');

	$routeProvider.when('/',{
		templateUrl: 'partials/home.html',
		controller: 'homeController'
	})
	.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'loginController'
	});
});

angular.module('app').controller('homeController', function($scope, $http, $window, $location){
	$scope.local = 'Home';
	$scope.retorno = '';
	$scope.err = '';

	$scope.sair = function(){
		delete $window.localStorage.token;
		$location.path('/login');
	}

	$scope.callUrl = function(url){
		$http.get('/'+url).then(function(data){
			$scope.retorno = data.data;
		}, function(err){
			$scope.erro = err;
		});
	}
}).controller('loginController', function($scope, $http, $location){
	$scope.local = 'Login';

	$scope.usuario = {};
	$scope.mensagem = '';

	$scope.login = function(){
		var usuario = $scope.usuario;
		$http.post('/login', usuario)
		.then(function(){
			$location.path('/');
		},function(err){
			$scope.mensagem = 'DEU ERRO';
		});
	}
}).factory('tokenInterceptor', function($window, $q, $location){
	var interceptor = {};

	interceptor.response = function(response){
		var token = response.headers('x-access-token');

		if (token) {
			$window.localStorage.token = token;
		}

		return response;
	};

	interceptor.request = function(config){
		config.headers = config.headers || {};

		if ($window.localStorage.token) {
			config.headers['x-access-token'] = $window.localStorage.token;
		}

		return config;

	}

	interceptor.responseError = function(rejection){
		if (rejection != null && rejection.status == 401) {
			delete $window.localStorage.token;
			$location.path('/login');
		}
		return $q.reject(rejection);
	}

	return interceptor;
});