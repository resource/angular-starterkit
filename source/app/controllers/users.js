/**
 * Simple exampel of an angular controller. Notice that it lives off
 * of the controllers module, which was included in the applicaiton module.
 */
angular.module('controllers').controller('UsersController', ['$scope', 'UserService', function($scope, UserService) {

    /**
     * Example of accessing data through and included service.
     */
    $scope.users = UserService.all();

}]);