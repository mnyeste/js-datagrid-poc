(function( testdata, $, undefined ) {

    var dataPool = [];
    var callbacks = $.Callbacks();
 
    //Public Method
    testdata.getRandomRows = function(n) {

        var data = [];

        if (dataPool.length === 0){
          return data;  
        } 

        for ( var i = 0; i < n; i++ ) {
                    
            rndidx = Math.floor(Math.random()*dataPool.length);
            data.push(dataPool[rndidx]);
            
        }

        return data;
    };
    
    testdata.onReady = function(callback){
        callbacks.add(callback);
    }

    function initialize() {
        console.log('Loading testdata...');

        $.getJSON('../data/testdata_1000_rows.json', function(json){
            $.merge(dataPool, json)
            console.log(dataPool.length + ' entities loaded.')

            callbacks.fire();
        });
    }  

    initialize();

}( window.testdata = window.testdata || {}, jQuery ));