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
                        complete: function (results) {
                            // console.log('Papaparse data = ' + results.data);   // for testing
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

        testFactory.getStuff().then(function (data) {
            
            // console.log('Factory data = ' + data);   // for testing
            
            $scope.outputData = data.data;
            
        });
    });



    
})();