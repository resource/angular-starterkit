/**
 * Example of an angular directive. Notice that unlike filters,
 * services and controllers, directive live off of their own module.
 * This is intended so that we can keep directive as decoupled from the
 * project as possible. Think of them as little self contained components.
 */
angular.module('raCircleImage', []).directive('raCircleImage', function () {

    return {
        restrict: 'E',
        scope: {
            imageSource: "=",
            imageTitle: "="
        },
        templateUrl: 'directives/circle-image/circle-image.html'
    };

});
