(function($) {

	$.extend(true, window, {
		Poc: {
			Grid: PocGrid
		}
	});

	function PocGrid(divSelector) {

		var data = [];

		var columns = [{
			id: "company",
			name: "Company",
			field: "company",
			width: 200
		}, {
			id: "currency",
			name: "Currency",
			field: "currency",
			width: 100
		}, {
			id: "price",
			name: "Price",
			field: "price",
			width: 100,
			cssClass: "numeric"
		}, {
			id: "quantity",
			name: "Quantity",
			field: "quantity",
			width: 100,
			cssClass: "numeric"
		}
		, {
			id: "remove",
			name: "Remove",
			formatter: deleteLink,
			width: 100
		}
		];

		var options = {
			enableColumnReorder: false,
			autoHeight: true
		};

		function init(){
			grid = new Slick.Grid(divSelector, data, columns, options);	
		}

		function deleteLink(row, cell, value, columnDef, dataContext ){
			//return '<a onclick="this.deleteRow(' + row + ')" href="javascript:void(0);">delete</a>'
			return 'delete';
		}

		function addRows(rows) {
			$.merge(data, rows);
			grid.invalidate();
		}

		function deleteRow(index) {
			data.splice(index,1);
			grid.invalidate();
		}

		$.extend(this, {
			"addRows": addRows,
			"deleteRow": deleteRow
		});

		init();	
	}
}(jQuery));
