angular.module('controllers').controller('UsersController', ['$scope', 'UserService', function($scope, UserService) {
	$scope.users = UserService.all();
}]);