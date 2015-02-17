angular.module('myApp').directive('myA', function() {
	return {
		restrict: 'E',
		scope: {
			info: '='
		},
		template: '<a href="{{info.link}}">{{info.label}}</a>',
	};
});