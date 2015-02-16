var partial = angular.module('partial', []);

partial.controller('PartialController', ['$scope', function($scope) {
	$scope.data = 'Partial';
}]);