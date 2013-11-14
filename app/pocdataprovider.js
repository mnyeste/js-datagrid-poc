(function($) {

	$.extend(true, window, {
		Poc: {
			DataProvider: PocDataProvider
		}
	});

	function PocDataProvider(data, columns) {


		function getLength(){
			return data.length;
		} 

		function getItem(index) {
			return data[index];
		}

		$.extend(this, {
		 	"getLength": getLength,
		 	"getItem": getItem
		});


	}
}(jQuery));