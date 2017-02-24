window.onload = function() {
	var oMenu = document.getElementById('rightMenu');
	var aUl = oMenu.getElementsByTagName("ul");
	var aLi = oMenu.getElementsByTagName("li");
	var showTimer = hideTimer = null;
	var aDoc = [document.documentElement.offsetWidth, document.documentElement.offsetHeight];
	
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].onmouseover = function() {
			// 注意settimeout的回调函数中不可以直接使用this，会指向全局对象
			var that = this;
			var oUl = that.getElementsByTagName('ul');
			// 添加样式
			that.className += ' active';

			if(oUl[0]) {
				clearTimeout(hideTimer);
				// 设置一个短暂的延时显示获得更好的体验
				showTimer = setTimeout(function(){
					// 隐藏二级菜单
					for(i = 0; i < that.parentNode.children.length;i++){
						that.parentNode.children[i].getElementsByTagName("ul")[0] &&
						(that.parentNode.children[i].getElementsByTagName("ul")[0].style.display = 'none');
					}
					// 显示鼠标所指向的二级菜单
					oUl[0].style.display = 'block';
					
					// 位置判断
					oUl[0].style.top = 
						(aDoc[1] - oMenu.offsetTop - that.offsetTop  > oUl[0].offsetHeight
							? that.offsetTop
							: that.offsetTop - oUl[0].offsetHeight + that.offsetHeight)
						+ 'px';

					oUl[0].style.left = 
						(aDoc[0] - oMenu.offsetLeft - that.offsetWidth > oUl[0].offsetWidth 
							? that.offsetLeft + that.offsetWidth  
							: that.offsetLeft - that.offsetWidth) 
						+ 'px';
				},300)
			}
		}

		aLi[i].onmouseout = function() {
			var that = this;
			var oUl = that.getElementsByTagName("ul");
			that.className = that.className.replace(/\s?active/, "");

			clearTimeout(showTimer);
			hideTimer = setTimeout(function(){
				for (i = 0; i < that.parentNode.children.length; i++) {
					that.parentNode.children[i].getElementsByTagName("ul")[0] &&
					(that.parentNode.children[i].getElementsByTagName("ul")[0].style.display = 'none');
				}
			}, 300);
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