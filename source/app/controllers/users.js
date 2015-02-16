var users = angular.module('users', ['usersService']);

users.controller('UsersController', ['$scope', 'UserService', function($scope, UserService) {
	$scope.users = UserService.all();
}]);