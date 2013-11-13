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
			formatter: selectCurrency,
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
			cssClass: "numeric",
			formatter: editQuantity
		}, {
			id: "delete",
			name: "Delete",
			cssClass: "icon",
			formatter: deleteLink,
			width: 100
		}, {
			id: "status",
			name: "Status",
			cssClass: "icon",
			formatter: statusIcon,
			width: 100
		}, {
			id: "internal_id",
			name: "ID",
			field: "id",
			width: 100
		}];

		var options = {
			enableColumnReorder: false,
			autoHeight: true,
			editable: false
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

			$("#dataGrid").on('change', 'input.edit-quantity', function(e) {
				

				var itemId = $(this).attr('itemId');
				var newVal = $(this).val() 

				var item = dataView.getItemById(itemId);

				if (item) {
					item['quantity'] = newVal;
					dataView.updateItem(item['id'], item)
				}

			})

			$("#dataGrid").on('change', 'select.select-currency', function(e) {
				
				var itemId = $(this).attr('itemId');
				var newVal = $(this).val() 

				var item = dataView.getItemById(itemId);

				if (item) {
					item['currency'] = newVal;
					dataView.updateItem(item['id'], item)
				}

			})

		}

		function deleteLink(row, cell, value, columnDef, dataContext) {
			return '<a class="del" itemId=' + dataContext.id + ' href="javascript:void(0);"><img src="../icons/delete.png"></a>'
		}

		function statusIcon(row, cell, value, columnDef, dataContext) {
			return '<img src="../icons/' + dataContext.status + '.png"/>'
		}

		function editQuantity(row, cell, value, columnDef, dataContext) {
			return '<input class="edit-quantity" itemId=' + dataContext.id + ' type="text" value="' + dataContext.quantity + '">'
		}

		function selectCurrency(row, cell, value, columnDef, dataContext) {

			var select = '<select class="select-currency" itemId=' + dataContext.id + '>';
			$.each(dataContext.currencies, function(idx, currency){

				select += '<option value="'+ currency + '" ' + (dataContext.currency === currency?'selected':'') + '>'+currency+'</option>'

			})
			select += '</select>'

			return select;
		}

		function addItems(newItems) {

			dataView.beginUpdate();

			$.each(newItems, function(idx, item) {


				if (dataView.getItemById(item.id)) {
					return true;
				}

				$.extend(item, {
					status: "pending",
					currencies: ['CHF', 'EUR', 'USD', 'AUD', 'NZD']
				});

				dataView.addItem(item);
			})

			dataView.endUpdate();
		}

		function deleteRow(itemId) {
			dataView.deleteItem(itemId);
		}

		function getItems() {
			return dataView.getItems();
		}

		function updateItemStatus(itemId, newStatus) {
			var item = dataView.getItemById(itemId);

			if (item) {
				item['status'] = newStatus;
				dataView.updateItem(itemId, item)
			}
		}

		function getItemQuantity(itemId) {
			var item = dataView.getItemById(itemId);
			if (item) {
				return (item['quantity']);
			}
		}

		$.extend(this, {
			"addItems": addItems,
			"getItems": getItems,
			"updateItemStatus": updateItemStatus,
			"getItemQuantity": getItemQuantity
		});

		init();
	}
}(jQuery));