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
		}, {
			id: "delete",
			name: "Delete",
			formatter: deleteLink,
			width: 100
		}];

		var options = {
			enableColumnReorder: false,
			autoHeight: true
		};

		var dataView;

		function init() {

			dataView = new Slick.Data.DataView();

			grid = new Slick.Grid(divSelector, dataView, columns, options);

			dataView.onRowCountChanged.subscribe(function(e, args) {
				grid.updateRowCount();
				grid.render();
			});

			dataView.onRowsChanged.subscribe(function(e, args) {
				grid.invalidateRows(args.rows);
				grid.render();
			});

			$("#dataGrid").on('click', 'a.del', function(e) {
				deleteRow($(this).attr('itemId'));
			})
		}

		function deleteLink(row, cell, value, columnDef, dataContext) {
			return '<a class= "del" itemId=' + dataContext.id + ' href="javascript:void(0);">delete</a>'
		}

		function addRows(newItems) {

			dataView.beginUpdate();

			$.each(newItems, function(idx, item){
				
				if (dataView.getItemById(item.id)){
					return true;
				}
				dataView.addItem(item);
			})

			dataView.endUpdate();
		}

		function deleteRow(itemId) {
			dataView.deleteItem(itemId);
		}

		$.extend(this, {
			"addRows": addRows,
			"deleteRow": deleteRow
		});

		init();
	}
}(jQuery));