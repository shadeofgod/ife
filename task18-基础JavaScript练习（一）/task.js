window.onload = function() {
	var input = document.getElementById('input');
	var btns = document.getElementsByTagName('button');
	var container = document.getElementById('container');
	var divs = container.getElementsByTagName('div');

	function createItem() {
		//判断是否合法数字
		if (!isNaN(input.value)) {
			var item = document.createElement('div');
			item.innerHTML = input.value;
			input.value = "";
			//添加点击自身则删除功能
			item.onclick = function() {
				this.remove();
			}
			return item;
		} else {
			alert("illegel input m8!");
		}
	}

	//为四个按键添加点击事件，插入为第一个
	btns[0].onclick = function() {
		var item = createItem();
		container.insertBefore(item, container.firstChild);
	}

	//插入为最后一个
	btns[1].onclick = function() {
		var item = createItem();
		container.appendChild(item);
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
}