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
		}, {
			id: 'lipsum',
			field: 'lipsum'
		}];

		var options = {
			enableColumnReorder: false,
			autoHeight: true,
			editable: false
		};

		var dataView;

		function init() {

			// ref[1] use DataView to store data
			dataView = new Slick.Data.DataView();

			grid = new Slick.Grid(divSelector, dataView, columns, options);

			// ref[2] render grid on DataView change
			dataView.onRowCountChanged.subscribe(function(e, args) {
				grid.updateRowCount();
				grid.render();
			});

			// ref[2] render grid on DataView change
			dataView.onRowsChanged.subscribe(function(e, args) {
				grid.invalidateRows(args.rows);
				grid.render();
			});

			// ref[6] handle delete, remove data from DataView
			$("#dataGrid").on('click', 'a.del', function(e) {
				deleteRow($(this).attr('data-item-id'));
			})

			// ref[4] handle custom input changes, updating DataView
			$("#dataGrid").on('change', 'input.edit-quantity', function(e) {
				updateItemOnInputChange($(this), 'quantity');		
			})

			$("#dataGrid").on('change', 'select.select-currency', function(e) {
				updateItemOnInputChange($(this), 'currency');
			})

		}

		function updateItemOnInputChange(input, field) {

				var itemId = input.attr('data-item-id');
				var newVal = input.val() 

				var item = dataView.getItemById(itemId);

				if (item) {
					item[field] = newVal;
					dataView.updateItem(item['id'], item)
				}
		}

		// ref[6] generate link with ID, note data-item-id
		function deleteLink(row, cell, value, columnDef, dataContext) {
			return '<a class="del" data-item-id=' + dataContext.id + ' href="javascript:void(0);"><img src="../icons/delete.png"></a>'
		}

		function statusIcon(row, cell, value, columnDef, dataContext) {
			return '<img src="../icons/' + dataContext.status + '.png"/>'
		}

		// ref[3] generate custom editors
		function editQuantity(row, cell, value, columnDef, dataContext) {
			return '<input class="edit-quantity" data-item-id=' + dataContext.id + ' type="text" value="' + dataContext.quantity + '">'
		}

		// ref[3] generate custom editors
		function selectCurrency(row, cell, value, columnDef, dataContext) {

			if (dataContext.currencies.length === 1){
				return dataContext.currencies[0];
			}

			var select = '<select class="select-currency" data-item-id=' + dataContext.id + '>';
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
					currencies: ['CHF', 'EUR', 'USD', 'AUD', 'NZD'],
					lipsum: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent neque erat, faucibus id purus a, tempor commodo velit. Integer ac dui elit. Ut non tellus vitae lacus venenatis molestie. Donec nec ligula vestibulum tortor fringilla mollis. Nunc eget iaculis elit. Nullam convallis, velit vitae tincidunt hendrerit, enim tellus aliquam urna, non molestie sapien leo quis metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam viverra lacus id volutpat.'
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

		// ref[2]
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