window.onload = function() {
	var aData = [];
	document.getElementById('insert').onclick = function() {
		var str = document.getElementById('textArea').value.trim();
		var aWords = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e){
			if (e != null && e.length > 0) {
				return true;
			} else {
				return false;
			}
		});
		aData = aData.concat(aWords);
		render();
	}

	function render(str) {
		document.getElementById('result').innerHTML = aData.map(function(e){
			if (str != null && str.length > 0) {
				e = e.replace(new RegExp(str, "g"), "<span class='select'>" + str + "</span>");
			}
			return '<div>' + e + '</div>';
		}).join('');
	}

	document.getElementById('search').onclick = function() {
		var str = document.getElementById('searchInput').value.trim();
		render(str);
	}
}


