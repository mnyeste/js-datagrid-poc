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
    }
    
    testdata.initialize=function(onReady) {

        callbacks.add(onReady);

        $.getJSON('../data/testdata.json', function(json){
            $.merge(dataPool, json)
            callbacks.fire();
        });
    }

}( window.testdata = window.testdata || {}, jQuery ));