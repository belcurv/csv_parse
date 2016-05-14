(function () {
    'use strict';

    angular
        
        .module('csvParse', [])
    
        .controller('csvParseController', ['$http', function ($http) {
            
            var vm = this;
            
            vm.minDate;
            vm.maxDate;
            vm.parsedData = [];  // init a temp scratch space array
            
            // read in the CSV
            $http.get('data/data.csv')
            
                // on success, trigger function passing CSV as 'response' arg
                .then(function (response) {

                    // init some variables we'll need
                    var i,
                        lines,
                        line,
                        data;

                    // populate the array
                    lines = response.data.split('\n');                  // split at newline; creates array

                    for (i = lines.length - 1; i >= 0; i -= 1) {   // repeat for as many lines

                        line = lines[i];

                        data = line.split(',');                       // split at commas, creates array

                        vm.parsedData.push({                          // push onto output array
                            source: data[0],
                            target: data[1],
                            value : data[2],
                            annum : Date.parse(data[3])            // convert date string to js seconds
                        });
                        
                    }   // end for loop
                
                    // begin find date ranges                
                    vm.minDate = Math.min.apply(Math, vm.parsedData.map(function (objMin) {
                        return objMin.annum;
                    }));

                    vm.maxDate = Math.max.apply(Math, vm.parsedData.map(function (obj) {
                        return obj.annum;
                    }));

                });   // end $http.get().success() function

            vm.outputData = vm.parsedData;

        }]);   // end controller
})();