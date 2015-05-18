describe('starterkit', function() {

    it('should navigate correctly', function(done) {

        // not that this is the port set in the 'npm run e2e' script in package.json
        browser.get('http://localhost:3001/');

        $('.users-page-link').click();
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/users');
        $('.partial-link').click();
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/');
        done();
    });

});