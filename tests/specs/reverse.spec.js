describe('reverse filter', function() {

	var myApp;

	beforeEach(function() {
		myApp = module('myApp');
	});

	// beforeEach(module('myApp'));

	it('should reverse given text', inject(function($filter) {
		//spec body
		var reverseFilter = $filter('reverse');
		expect(reverseFilter('abc')).toEqual('cba');

	}));

});