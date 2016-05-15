(function () {
    'use strict';

    angular
        
        .module('csvParse', [])
    
        .value()
    
        .controller('csvParseController', ['$http', function ($http) {
            
            var vm = this,
                results,
                outputData;
            
            vm.minDate;
            vm.maxDate;
            vm.outputData = [];
            
            // work with the data
            function doStuff(data) {
                // Data is usable here
                vm.outputData = data;
                console.log('Callback\'s outputData: ' + vm.outputData);
                console.log('Callback\'s outputData type: ' + typeof vm.outputData);
            }
            
            // read in the CSV
            function parseData(url, callBack) {
                Papa.parse(url, {
                    download: true,
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    complete: function(results) {
                        callBack(results.data);
                    }
                });
            }
            
            parseData('data/data.csv', doStuff);

            console.log('Type of outputData = ' + typeof outputData);
            console.log('outputData: ' + outputData);
 //           console.log('Length of outputData: ' + outputData.length);
            
            console.log('Type of vm.outputData = ' + typeof vm.outputData);
            console.log('outputData: ' + vm.outputData);
            console.log('Length of outputData: ' + vm.outputData.length);


            // begin find date ranges                
//            vm.minDate = Math.min.apply(Math, vm.parsedData.map(function (objMin) {
//                return objMin.annum;
//            }));
//
//            vm.maxDate = Math.max.apply(Math, vm.parsedData.map(function (obj) {
//                return obj.annum;
//            }));

        }]);   // end controller
})();