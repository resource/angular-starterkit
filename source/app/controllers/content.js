var content = angular.module('content', ['ngRoute', 'home', 'users']);

content.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl: 'views/home.html',
		controller: 'HomeController',
	}).when('/users', {
		templateUrl: 'views/users.html',
		controller: 'UsersController'
	});

}]);