(function(window, document){

    let
        $ = (function(){
            const DOM = {
                playBtn: document.getElementById('btn-play'),
                likeBtn: document.getElementById('btn-like'),
                nextBtn: document.getElementById('btn-next'),
                audio: document.getElementById('audio'),
                progressBar: document.getElementsByClassName('progress')[0],
                time: document.getElementsByClassName('time')[0],

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

            let liked = false;
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
                }
            }

            function showTime(){
                let totalTime = DOM.audio.duration;

                let m = parseInt(totalTime / 60);
                let s = parseInt(totalTime % 60);
                m = m < 10 ? `0${m}` : m;
                s = s < 10 ? `0${s}` : s;

                DOM.time.innerHTML = `-${m}:${s}`;
            }

            return {
                init: function(id){
                    ajax({
                        url: `http://120.24.162.247:8001/api/Music?id=${id}`,
                        success: function(responseText){
                            let musicInfo = JSON.parse(responseText);
                            eventsHandler();
                            showTime();
                        },
                        fail:function(status){
                            alert('歌单拉取失败！');
                            console.error('歌单拉取失败！');
                        }
                    });
                }
            }
        })();




    $.init(317921676);
})(window, document);
