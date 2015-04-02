describe('user service', function () {

    var service;
    var httpBackend;

    beforeEach(module('services'));

    beforeEach(inject(function (UserService, $httpBackend) {
        service = UserService;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('method \'all\'', function () {

        it('returns names as expected', function (done) {

            httpBackend.when('GET', '/assets/data/users.json').respond(200, ['Eric', 'Toby', 'Kris']);

            service.all().then(function (users) {
                expect(users[0]).toEqual('Eric');
                done();
            });

            httpBackend.flush();

        });

        it('returns 404 correctly', function (done) {

            httpBackend.when('GET', '/assets/data/users.json').respond(404);

            service.all().catch(function (err) {
                expect(err).toEqual('not found');
                done();
            });

            httpBackend.flush();

        });

    });

});