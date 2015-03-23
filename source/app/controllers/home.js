/**
 * Simple exampel of an angular controller. Notice that it lives off
 * of the controllers module, which was included in the applicaiton module.
 */

angular.module('controllers').controller('HomeController', ['$scope', function ($scope) {

    $scope.data = 'Users Page';
    $scope.link = '/#/users';

}]);