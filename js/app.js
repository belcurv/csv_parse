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
            
            $scope.myDate = 0;
            
            var i, j, k, l,
                uniqueDates,
                formattedResults = [];
            
        
            // ==================== begin type conversion =====================
            for (i = 0; i < results.data.length; i += 1) {
                formattedResults.push({
                    source : results.data[i].source,             // stay string
                    target : results.data[i].target,             // stay string
                    value  : +results.data[i].value,             // conv number
                    annum  : Date.parse(results.data[i].annum)   // conv date
                });
            }
            // ===================== end type conversion ======================


            // =============== begin build array of unique dates ==============
            // add 'contains' method to Array prototype
            Array.prototype.contains = function (v) {
                for (j = 0; j < this.length; j += 1) {
                    if (this[j] === v) {
                        return true;
                    }
                }
                return false;
            };
            
            // add 'unique' method to Array prototype
            Array.prototype.unique = function () {
                var arr = [];
                for (k = 0; k < this.length; k += 1) {
                    if (!arr.contains(this[k].annum)) {
                        arr.push(this[k].annum);
                    }
                }
                return arr;
            };
            
            // find unique dates within formattedResults array
            // and sort them, ascending
            uniqueDates = formattedResults.unique().sort();
            // ================ end build array of unique dates ===============


            // ================== bind data to $scope object ==================
            $scope.outputData = formattedResults;
            $scope.dateArray  = uniqueDates;
            $scope.minDate    = uniqueDates[0];
            $scope.maxDate    = uniqueDates[uniqueDates.length-1];
            
        });

    });
    
})();