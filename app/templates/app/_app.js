/**
 * Created by ericjohndixon on 3/15/16.
 */
(function () {
    'use strict';

    angular.module('<%= ngapp %>', [])
        .directive('helloWorld', [function () {
        return {
            restrict: 'E',
            link: linker,
            template: '<div class="main">Hello World!</div>'
        };

        ////////////////////////////////////////////////////
        function linker(scope, element, attrs) {

        }

    }]);

})();