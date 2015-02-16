var userService = angular.module('usersService', []);

userService.factory('UserService', function() {

	var names = ['Jill', 'Tony', 'Matt', 'Natalie', 'Eric', 'Emmarie', 'Declan', 'Brendan', 'Katlyn'];

	return {
		all: function() {
			return names;
		},
		first: function() {
			return names[0];
		}
	};

});