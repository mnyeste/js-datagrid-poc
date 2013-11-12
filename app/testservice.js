(function(testservice, $, undefined) {

    testservice.initialize = function() {

        $.mockjax({
            url: /^\/status\/([\d]+)$/,
            urlParams: ['itemId'],
            response: function(settings) {
                var itemId = settings.urlParams.itemId;

                var statusList = ['ok', 'warn'];
                var rndidx = Math.floor(Math.random() * statusList.length);

                this.responseText = {
                    id: itemId,
                    status: statusList[rndidx]
                }
            }
        });



        $.mockjax(function(settings) {
            // settings.url == '/restful/<service>'
            var service = settings.url.match(/^\/lazystatus\/([\d]+)$/);
            if (service) {

                var delay = Math.floor(Math.random() * 10000);

                return {
                    urlParams: ['itemId'],
                    responseTime: delay,
                    response: function(settings) {
                        var itemId = settings.urlParams.itemId;

                        var statusList = ['ok', 'warn'];
                        var rndidx = Math.floor(Math.random() * statusList.length);

                        this.responseText = {
                            id: itemId,
                            status: statusList[rndidx]
                        }
                    } 
                };
            }
            return;
        });

    }

}(window.testservice = window.testservice || {}, jQuery));