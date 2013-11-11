var SlickPocGrid = function SlickPocGrid(divSelector) {

	this.data = [];

	this.columns = [
    		{id: "company", name: "Company", field: "company", width: 200},
    		{id: "currency", name: "Currency", field: "currency", width: 100 },
			{id: "price", name: "Price", field: "price", width: 100, cssClass: "numeric" },
			{id: "quantity", name: "Quantity", field: "quantity", width: 100, cssClass: "numeric" },
  			{id: "remove", name: "Remove", formatter: SlickPocGrid.deleteRowLink, width: 100 }
    		];

	this.options = { 
		enableColumnReorder : false
	};

	// this.deleteRowLink = function( row, cell, value, columnDef, dataContext ) {
 //        return '<a onclick="this.deleteRow(' + row + ')" href="javascript:void(0);">delete</a>'
 // 	}

	this.loadInitialData = function(){
		 $.merge(this.data,testdata.getRandomRows(5));
		 this.grid.invalidate();
	}

	this.grid = new Slick.Grid(divSelector, this.data, this.columns, this.options);

}

SlickPocGrid.prototype = {
	deleteRowLink: function( row, cell, value, columnDef, dataContext ) {
        return '<a onclick="deleteRow(' + row + ')" href="javascript:void(0);">delete</a>'
 	}
}



	// $("#add").click(function(event){
			
	// 		var n = $("#nrow").val();

	// 		if( n ) {
	// 			console.log('add ' + n + ' row(s)');

	// 			$.merge(data,testdata.getRandomRows(n));

	// 			grid.updateRowCount();
	// 			grid.render();

	// 			console.log('row count: ' + data.length);

	// 		}
		
	// 	})


 //    	function deleteRow(index) {
 //    		console.log('delete row: ' + index)
    		
 //    		data.splice(index,1);
	// 		grid.invalidate();

 //    	};

 //    	function loadInitialData(){
 //    		$.merge(data,testdata.getRandomRows(5));
	// 		grid.invalidate();
 //    	}

	// 	var grid;
	// 	var columns = [
 //    		{id: "company", name: "Company", field: "company", width: 200},
 //    		{id: "currency", name: "Currency", field: "currency", width: 100 },
	// 		{id: "price", name: "Price", field: "price", width: 100, cssClass: "numeric" },
	// 		{id: "quantity", name: "Quantity", field: "quantity", width: 100, cssClass: "numeric" },
 //  			{id: "remove", name: "Remove", formatter: deleteRowLink, width: 100 }
 //    		];

 //  		var options = { 
 //  			enableColumnReorder : false
 //  		};

	// 	var data = []; 

 //    	var grid = new Slick.Grid("#dataGrid", data, columns, options);
    	
 //    	testdata.onReady(loadInitialData);
