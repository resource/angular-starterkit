describe('reverse filter', function() {

	var filters;

	beforeEach(function() {
        filters = module('filters');
	});

	it('should reverse given text', inject(function($filter) {
		var reverseFilter = $filter('reverse');
		expect(reverseFilter('abc')).toEqual('cba');

	}));

});