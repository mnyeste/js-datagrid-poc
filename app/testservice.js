(function(testservice, $, undefined) {

    testservice.initialize = function() {

        function createResponse(settings) {
            var itemId = settings.urlParams.itemId;

            var statusList = ['ok', 'warn'];
            var rndidx = Math.floor(Math.random() * statusList.length);

            this.responseText = {
                id: itemId,
                status: statusList[rndidx]
            }
        }

        $.mockjaxClear();

        for (var i = 1; i <= 9; ++i) {

            var urlMatcher = new RegExp('^\\/status\\/' + i + '([\\d]+)$');

            $.mockjax({
                url: urlMatcher,
                urlParams: ['itemId'],
                responseTime: (i-1)*1000,
                response: createResponse
            });
        }

    }

}(window.testservice = window.testservice || {}, jQuery));