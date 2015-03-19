angular.module('circleImage', []).directive('circleImage', function () {

    return {
        restrict: 'E',
        scope: {
            imageSource: "=",
            imageTitle: "="
        },
        templateUrl: 'directives/circle-image/circle-image.html'
    };

});
