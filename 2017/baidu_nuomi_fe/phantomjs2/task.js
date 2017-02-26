function searchIt(keyword, device) {
    var ua = require('./ua.json');
    var webPage = require('webpage');
    var page = webPage.create();
    var keyword = keyword || '',
        device = device || 'iPhone 6',
        title,
        link,
        dataList = [],
        url = 'https://www.baidu.com/s?wd=' + keyword;

    console.log(ua[device].ua)
        // var settings = {
        //         userAgent = ua[device].ua
        //     }
        // var page.viewportSize = {
        //     width: ua[device].width,
        //     height: ua[device].height
        // }
        //
        // if (keyword) {
        //     page.open(url, function(status) {
        //         console.log(keyword);
        //         phantom.exit();
        //     })
        // }
    phantom.exit();
}

searchIt('phantom', 'iPad')
