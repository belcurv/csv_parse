(function () {
    'use strict';

    var app = angular.module('csvParse', []);


    // =============================== SERVICES ===============================
    app.factory('testFactory', ['$http', '$q', function ($http, $q) {

        var url = 'data/data.csv',
            
            getStuff = function () {
                return $http.get(url).then(function (data) {
                    return Papa.parse(data.data, {
                        header: true,
                        dynamicTyping: true,
                        skipEmptyLines: true,
                        complete: function (results) {
                            // console.log('Papaparse results: ' + results.data);   // for testing
                            return results.data;
                        }
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
            
            var i,
                formattedResults = [];
            
            $scope.minDateSlider = 0;
            $scope.maxDateSlider = 100;
            
            // convert parsed date strings to JS dates (seconds)
            for (i = 0; i < results.data.length; i += 1) {
                formattedResults.push({
                    source : results.data[i].source,
                    target : results.data[i].target,
                    value  : results.data[i].value,
                    annum  : Date.parse(results.data[i].annum)
                });
            }
            
            // bind formatted data to $scope object
            $scope.outputData = formattedResults;
            
            // find date min/max
            $scope.minDate = Math.min.apply(Math, formattedResults.map(function (objMin) {
                return objMin.annum;
            }));

            $scope.maxDate = Math.max.apply(Math, formattedResults.map(function (objMax) {
                return objMax.annum;
            }));
            
        });
        
    });



    
})();