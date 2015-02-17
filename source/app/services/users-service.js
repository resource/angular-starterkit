var userService = angular.module('usersService', []);

userService.factory('UserService', function() {

	var names = [
		'Steve Zissou',
		'Ned Plimpton',
		'Jane Winslett-Richardson',
		'Klaus Daimler',
		'Alistair Hennessey'
	];

	return {
		all: function() {
			return names;
		},
		first: function() {
			return names[0];
		}
	};

});