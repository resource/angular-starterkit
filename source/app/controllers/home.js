angular.module('controllers').controller('HomeController', ['$scope', function($scope) {
	$scope.data = 'reverse';
	$scope.linkinfo = {
		link:'/#/users',
		label:'Users Page'
	};
}]);