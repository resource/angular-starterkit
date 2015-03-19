describe('reverse filter', function() {

	var filters;

	beforeEach(function() {
        filters = module('filters');
	});

	// beforeEach(module('myApp'));

	it('should reverse given text', inject(function($filter) {
		//spec body
		var reverseFilter = $filter('reverse');
		expect(reverseFilter('abc')).toEqual('cba');

	}));

});