var home = angular.module('home', []);

home.controller('HomeController', ['$scope', function($scope) {
	$scope.data = 'This is the home content.';
}]);