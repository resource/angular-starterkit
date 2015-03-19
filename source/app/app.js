angular.module('myApp', ['ngRoute', 'controllers', 'filters', 'services', 'circleImage']);

angular.module('controllers', []);
angular.module('filters', []);
angular.module('services', []);

angular.module('myApp').config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
    }).when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersController'
    });

}]);