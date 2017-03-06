(function(window, document){

    window.FM = (function(){
        let liked = false;
        let currentSongIndex, songList;

        const DOM = {
            playBtn: document.getElementById('btn-play'),
            likeBtn: document.getElementById('btn-like'),
            nextBtn: document.getElementById('btn-next'),
            audio: document.getElementById('audio'),
            progressBar: document.getElementById('progressBar'),
            time: document.getElementsByClassName('time')[0],
            title: document.getElementById('title'),
            author: document.getElementById('author'),
            cover: document.getElementById('cover'),
            ifra: document.getElementById('iframe')
        };

        function ajax(options){
            let opt = options || {};
            let xhr = new XMLHttpRequest();
            xhr.open('GET', opt.url);
            xhr.setRequestHeader('Accept', '*/*');
            xhr.send(null);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    let status = xhr.status;
                    if (status >= 200 && status <= 300) {
                        opt.success && opt.success(xhr.responseText, xhr.responseXML);
                    } else {
                        opt.fail && opt.fail(status);
                    }
                }
            }
        };

        function eventsHandler() {
            DOM.playBtn.onclick = function(e){
                if (DOM.audio.paused) {
                    DOM.audio.play();
                    DOM.playBtn.firstChild.className = 'icon-2x icon-pause';
                } else {
                    DOM.audio.pause();
                    DOM.playBtn.firstChild.className = 'icon-2x icon-play';
                }
            };
            DOM.likeBtn.onclick = function(){
                liked = !liked;
                DOM.likeBtn.firstChild.style.color =
                    liked
                    ? 'rgba(212, 35, 35, 0.84)'
                    : 'rgba(64, 64, 64, 0.86)';
            };
            DOM.nextBtn.onclick = function(){
                currentSongIndex++;
                if (currentSongIndex >= songList.length) currentSongIndex = 0;
                getMusic(songList, currentSongIndex);
            }
        }

        function showTime(){
            let totalTime = parseInt(DOM.audio.duration);
            let currentTime = parseInt(DOM.audio.currentTime);
            let timeLeft = totalTime - currentTime;
            let m = parseInt(timeLeft / 60);
            let s = parseInt(timeLeft % 60);
            m = m < 10 ? `0${m}` : m;
            s = s < 10 ? `0${s}` : s;

            DOM.progressBar.style.left = '-' + (timeLeft/totalTime*100)+'%';
            DOM.time.innerHTML = `${m}:${s}`;

            if (timeLeft == 0) DOM.nextBtn.click();
            setTimeout(showTime, 100);
        }

        function getMusic(info, i) {
            currentSongIndex = i;
            DOM.title.innerHTML = info[i].name;
            DOM.audio.src = info[i].src;
            DOM.author.innerHTML = info[i].author;
            DOM.cover.src = info[i].cover;
        }

        return {
            init: function(id){
                ajax({
                    // 网易云音乐该api服务器端口支持CORS跨域资源共享，可以直接使用ajax请求获取歌单
                    url: `http://120.24.162.247:8001/api/Music?id=${id}`,
                    success: function(responseText){
                        songList = JSON.parse(responseText);
                        getMusic(songList, 0)
                        showTime();
                        eventsHandler();
                    },
                    fail: function(status){
                        alert('歌单拉取失败！');
                        console.error('歌单拉取失败！');
                    }
                });
            }
        }
    })();




    FM.init(317921676);
})(window, document);


$.getJSON('http://120.24.162.247:8001/api/Music?id=317921676', function(res){
    console.log(res[0].name)
})
