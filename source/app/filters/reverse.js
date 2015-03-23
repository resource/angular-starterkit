/**
 * A simple example of a filter that reverses its input
 * and retrns the result. Notice that it is written off of the
 * filters module, which was included within the applicaiton.
 */
angular.module('filters').filter('reverse', function () {

    return function (input) {

        var result = '';
        input = input || '';

        for (var i = 0; i < input.length; i++) {
            result = input.charAt(i) + result;
        }

        return result;
    };

});