(function () {
    'use strict';

    angular
        
        .module('csvParse', [])
    
        .controller('csvParseController', ['$scope', '$http', function ($scope, $http) {
            
            var minDate, maxDate,
                parsedData = [];  // init a temp scratch space array
            
            // read in the CSV
            $http.get('data/data.csv')
            
                // on success, trigger function passing CSV as 'response' arg
                .success(function (response) {

                    // init some variables we'll need
                    var i, l,
                        lines, lineNumber,
                        data, length;

                    // populate the array
                    lines = response.split('\n');                  // split at newline; creates array
                    lineNumber = 0;                                // init line counter

                    for (i = lines.length - 1; i >= 0; i -= 1) {   // repeat for as many lines

                        l = lines[i];

                        data = l.split(',');                       // split at commas, creates array

                        parsedData.push({                          // push onto output array
                            source: data[0],
                            target: data[1],
                            value : data[2],
                            annum : Date.parse(data[3])            // convert date string to js seconds
                        });
                        
                        lineNumber += 1;

                    }   // end for loop
                
    
                    return {
                        parsedData: parsedData
                    };

                });   // end $http.get().success() function

            // begin find date ranges                
            minDate = Math.min.apply(Math, parsedData.map(function (objMin) {
                return objMin.annum;
            }));
            
            maxDate = Math.max.apply(Math, parsedData.map(function (obj) {
                return obj.annum;
            }));
            
            console.log('Min: ' + minDate + ', Max: ' + maxDate);
            // end find date ranges
            
            console.log(parsedData);
            $scope.outputData = parsedData;

        }]);   // end controller
})();