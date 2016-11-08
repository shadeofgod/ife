/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */

function getData() {
  var data = [];
  var ul = document.getElementById('source');
  for (var i = 0; i < ul.children.length; i++) {
    var li = ul.children[i];
    var city = li.innerHTML.split("空气质量：")[0];
    var quality = parseInt(li.children[0].innerHTML);
    data.push([city, quality]);
  }

  return data;
}


/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
  data.sort(function(a, b) {
    return a[1] - b[1];
  })
  return data;
}


/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
  var ul = document.getElementById('resort');
  for (var i = 0; i < data.length; i++) {
    var aqiData = data[i];
    var li = document.createElement("li");
    var node = "第" + (i + 1) + "名：" + aqiData[0] + "空气质量：<b>" + aqiData[1] + "</b>";
    li.innerHTML = node;
    ul.appendChild(li);
  }
}

function init() {
  // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
  var btn = document.getElementById('sort-btn');
  btn.onclick = function() {
    var aqiData = getData();
    aqiData = sortAqiData(aqiData);
    render(aqiData);
    btn.disabled = true;
  }
}

init();