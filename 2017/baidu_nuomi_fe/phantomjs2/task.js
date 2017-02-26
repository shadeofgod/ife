function searchIt(keyword, device) {
    var uaData = require('./ua.json');
    var webPage = require('webpage');
    var page = webPage.create();
    var keyword = keyword || '',
        device = device || 'iPhone 6',
        url = 'https://www.baidu.com/s?wd=' + keyword;

    page.settings.userAgent = uaData[device].ua;

    page.viewportSize = {
        width: uaData[device].width,
        height: uaData[device].height
    }

    if (keyword) {
        page.open(url, function(status) {
            if (status === 'success' && page.loadingProgress >= 100) {
                console.log('页面打开成功，抓取数据中！')
                var t = Date.now();
                page.includeJs('http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js',
                    function() {
                        var result = page.evaluate(function() {

                            var dataList = [];

                            $('.result').each(function() {
                                dataList.push({
                                    'title': $(this).find('h3')
                                        .text(),
                                    'link': $(this).find(
                                        'a.c-showurl').text(),
                                    'info': $(this).find(
                                        '.c-abstract').text()
                                });

                            });

                            return {
                                'code': 1,
                                'msg': '抓取成功',
                                'dataList': dataList,
                            }

                        });

                        t = Date.now() - t;
                        result.time = t;
                        result.device = device;
                        result.keyword = keyword;

                        console.log("抓取完成！数据如下：");
                        console.log(JSON.stringify(result));
                        page.render('result.jpg');
                        phantom.exit();
                    })
            } else {
                result = {
                    'code': 0,
                    'msg': '抓取失败，页面无法打开！'
                }
                console.log(JSON.stringify(result));
                phantom.exit();
            }
        })
    }
}

searchIt('phantom', 'iPad');
