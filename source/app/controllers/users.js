/**
 * Simple exampel of an angular controller. Notice that it lives off
 * of the controllers module, which was included in the applicaiton module.
 */
angular.module('controllers').controller('UsersController', ['$scope', 'UserService', '$window', function ($scope, UserService, $window) {

    /**
     * Example of accessing data through and included service.
     */
    UserService.all().then(function (names) {
        $scope.users = names;
    }).catch(function (reason) {
        $window.alert(reason);
    });

}]);