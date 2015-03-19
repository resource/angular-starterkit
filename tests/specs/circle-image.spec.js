describe('circle image', function() {

    var $compile;
    var $rootScope;

    beforeEach(module('circleImage'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should add correct elements', function() {
        var element = $compile('<circle-image></circle-image>')($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain('img');
    });

});