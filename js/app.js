/*
    Notes on globals:
    `angular` and Papa` are initialized into global namespace by <script> tags
    in `index.html`  
*/

(function () {
    'use strict';

    var app = angular.module('csvParse', []);


    // =============================== SERVICES ===============================
    
    app.factory('testFactory', ['$http', '$q', function ($http, $q) {

        var url = 'data/data.csv',
            
            getStuff = function () {
                return $http.get(url).then(function (data) {
                    return Papa.parse(data.data, {
                        header         : true,
                        dynamicTyping  : true,
                        skipEmptyLines : true,
                        complete       : function (res) { return res.data; }
                    });
                });
            };

        return {
            getStuff: getStuff
        };
    }]);
    

    // ============================= CONTROLLERS ==============================
    app.controller('csvParseController', function ($scope, testFactory) {

        testFactory.getStuff().then(function (results) {
            
            var formattedResults = [],
                uniqueDates      = [];

            // Format results data; coerce to different types
            formattedResults = results.data.map(function (datum) {
                return {
                    source : datum.source,             // remains String
                    target : datum.target,             // remains String
                    value  : +datum.value,             // --> Number
                    annum  : Date.parse(datum.annum)   // --> Date
                };
            });

            // find unique dates within `formattedResults` array
            // and sort them, ascending
            uniqueDates = formattedResults
                .map(function (d) { return d.annum; })
                .reduce(function (acc, el) {
                    if (acc.indexOf(el) === -1) { acc.push(el); }
                    return acc;
                }, [])
                .sort();
            

            // bind data to $scope
            $scope.outputData     = formattedResults;
            $scope.dateArray      = uniqueDates;
            $scope.minDate        = uniqueDates[0];
            $scope.maxDate        = uniqueDates[uniqueDates.length - 1];
            $scope.sliderIndex    = 0;
            $scope.sliderIndexMax = uniqueDates.length - 1;
            
        });

    });
    
    
    // ============================= DIRECTIVES ===============================
    
    app.directive('introduction', function() {
        return {
            restrict    : 'AE',
            templateUrl : 'directives/introduction.tpl.html',
            replace     : true
        };
    });
    
    app.directive('tabularOutput', function() {
        return {
            restrict    : 'AE',
            templateUrl : 'directives/tabular-output.tpl.html',
            replace     : true
        };
    });
    
    app.directive('jsonOutput', function() {
        return {
            restrict    : 'AE',
            templateUrl : 'directives/json-output.tpl.html',
            replace     : true
        };
    });

})();
