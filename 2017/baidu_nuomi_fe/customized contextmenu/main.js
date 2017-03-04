window.onload = function() {
	var oMenu = document.getElementById('rightMenu');
	var aLi = oMenu.getElementsByTagName("li");
	var secondSubs = oMenu.getElementsByClassName('second-sub');
	var aDoc = [document.documentElement.offsetWidth, document.documentElement.offsetHeight];

	oMenu.onmouseover = function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;

		if(target && target.className) {
			for(var i = 0;i < secondSubs.length; i++) {
				secondSubs[i].className = 'second-sub';
				if (secondSubs[i].parentNode === target) {
					secondSubs[i].className += ' show';
				}
			}
		}
	}

	document.oncontextmenu = function(event){
		var event = event || window.event;
		var x = event.clientX;
		var y = event.clientY;
		// 显示右键菜单
		oMenu.style.display = 'block';
		// 位置判断
		oMenu.style.left = (aDoc[0] - x > oMenu.offsetWidth
			? x
			: x-oMenu.offsetWidth)
		+ 'px';

		oMenu.style.top = (aDoc[1] - y > oMenu.offsetHeight
			? y
			: y - oMenu.offsetHeight)
		+ 'px';

		return false;
	}

	document.onclick = function(){
		oMenu.style.display = 'none';
	}


}
