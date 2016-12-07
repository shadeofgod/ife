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

	// 插入随机数据
	btns[4].onclick = function() {
		for (var i = 10; i <= 100; i += 2) {
			input.value = Math.floor(Math.random() * 90 + 10);
			var item = createItem();
			container.appendChild(item);
		}
	}

	btns[5].onclick = function() {
		bubbleSort();
	}

	btns[6].onclick = function() {
		// swap(divs[1],divs[9]);
		console.log(divs[2].offsetHeight)
		console.log(divs[2].style.height)
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
			item.style.offsetHeight = input.value * 5;
			item.style.height = input.value * 5 + 'px';
			item.style.left = container.children.length * 27 + 'px';
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

function swap(elem1, elem2) {
	elem1.style.backgroundColor = 'red';
	elem2.style.backgroundColor = 'red';
	var temp = elem1.offsetHeight;
	var temp2 = elem1.innerHTML;

	elem1.offsetHeight = elem2.offsetHeight;
	elem1.style.height = elem2.offsetHeight + 'px';
	elem1.innerHTML = elem2.innerHTML;

	elem2.offsetHeight = temp;
	elem2.style.height = temp + 'px';
	elem2.innerHTML = temp2;

	setTimeout(function(){
		elem1.style.backgroundColor = 'white';
		elem2.style.backgroundColor = 'white';
	},40)
}

function bubbleSort() {
	var divs = container.getElementsByTagName('div');
	var timer;
	var len = container.children.length;
	var i = len - 1;
	var j = 0;
	timer = setInterval(function(){
		if (i < 1) {
			clearInterval(timer);
			alert('sorted!');
		}
		if (j === i) {
			--i;
			j = 0;
		}
		if (divs[j].offsetHeight > divs[j+1].offsetHeight) {
			swap(divs[j], divs[j+1])
		}
		++j;
	}, 40)
}