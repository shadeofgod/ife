window.onload = function() {
	var input = document.getElementById('input');
	var btns = document.getElementsByTagName('button');
	var container = document.getElementById('container');
	var divs = container.getElementsByTagName('div');

	//为四个按键添加点击事件，插入为第一个
	btns[0].onclick = function() {
		var item = createItem();
		if (item) {
			container.insertBefore(item, container.firstChild);
		}
	}

	//插入为最后一个
	btns[1].onclick = function() {
		var item = createItem();
		if (item) {
			container.appendChild(item);
		}
	}

	//弹窗并删除第一个
	btns[2].onclick = function() {
		var num = container.firstChild.innerHTML;
		container.firstChild.remove();
		alert(num);
	}

	//弹窗并删除最后一个
	btns[3].onclick = function() {
		var num = container.lastChild.innerHTML;
		container.lastChild.remove();
		alert(num);
	}

	btns[4].onclick = function() {
		bubbleSort();
	}
}

function createItem() {
	//判断是否合法数字
	if (!isNaN(input.value) && input.value <= 100 && input.value >= 10) {
		if (container.children.length > 60) {
			alert ('there are too many!')
		} else {
			var item = document.createElement('div');
			item.innerHTML = input.value;
			item.style.height = input.value * 5 + 'px';
			input.value = "";
			//添加点击自身则删除功能
			item.onclick = function() {
				this.remove();
			}
			return item;
		}
	} else {
		alert("illegel input m8!");
	}
}

function bubbleSort() {
	var divs = container.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.order = i;
	}
	for (var i = 0; i < divs.length - 1; i++) {
		for (var j = 0; j < divs.length - 1 - i; j++ ) {
			if (parseInt(divs[j].innerHTML) > parseInt(divs[j+1].innerHTML)) {
				var temp = divs[j].style.order;
				divs[j].style.order = divs[j+1].style.order;
				divs[j+1].style.order = temp;
			}
		}
	}
}