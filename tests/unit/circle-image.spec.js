describe('circle image', function() {

    var $compile;
    var $rootScope;

    beforeEach(module('raCircleImage'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should add correct elements', function() {
        var element = $compile('<ra-circle-image></ra-circle-image>')($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain('img');
    });

});