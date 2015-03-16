angular.module('myApp', ['ngRoute', 'controllers', 'directives', 'filters', 'services']);

angular.module('controllers', []);
angular.module('directives', []);
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

