/**
 * Here we create our main app module. This module will be in
 * charge of pulling in globally accessible modules.
 */
angular.module('myApp', [
    'ngRoute',
    'templates',
    'controllers',
    'filters',
    'services',
    'raCircleImage'
]);

/**
 * We create a seperate modules for controllers, filters and
 * services. This way you don’t have to have a separate module
 * for each controller, filter or service your application
 * contains create within your application.
 */
angular.module('controllers', []);
angular.module('filters', []);
angular.module('services', []);

/**
 * This is our applications router. It uses the $routeProvider from
 * the ngRoute module injected into the 'myApp' module. Basically anything
 * within the tag marked with the ng-app attribute will be replaces on
 * the routes listed below.
 */
angular.module('myApp').config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    }).when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersController'
    });

}]);