/**
 * A simple example service that create a factory (UsersService)
 * off of the services module.
 */
angular.module('services').factory('UserService', function () {

    var names = [
        'Steve Zissou',
        'Ned Plimpton',
        'Jane Winslett-Richardson',
        'Klaus Daimler',
        'Alistair Hennessey'
    ];

    return {
        all: function () {
            return names;
        },
        first: function () {
            return names[0];
        }
    };

});