/**
 * A simple example service that create a factory (UsersService)
 * off of the services module.
 */
angular.module('services').factory('UserService', ['$http', '$q', function ($http, $q) {

    return {

        all: function () {

            var deferred = $q.defer();

            $http.get('/assets/data/users.json').success(function (data) {

                deferred.resolve(data);

            }).error(function () {

                deferred.reject("not found");

            });

            return deferred.promise;
        }

    };

}]);