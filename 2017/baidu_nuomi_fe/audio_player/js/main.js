(function(window, document){

    let
        $ = (function(){
            const DOM = {
                playBtn: document.getElementById('btn-play'),
                likeBtn: document.getElementById('btn-like'),
                nextBtn: document.getElementById('btn-next'),
                audio: document.getElementById('audio'),
                progressBar: document.getElementsByClassName('progress')[0],
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

            let playing = false,
                like = false;
            function eventsHandler() {
                DOM.playBtn.onclick = function(e){
                    playing = !playing;
                    playing ? DOM.audio.play() : DOM.audio.pause();
                    DOM.playBtn.firstChild.className = playing ? 'icon-2x icon-pause' : 'icon-2x icon-play';
                };
                DOM.likeBtn.onclick = function(){
                    like = !like;
                    DOM.likeBtn.firstChild.style.color =
                        like
                        ? 'rgba(212, 35, 35, 0.84)'
                        : 'rgba(64, 64, 64, 0.86)';
                }
            }

            eventsHandler();

            return {
                init: function(id){
                    ajax({
                        url: `http://120.24.162.247:8001/api/Music?id=${id}`,
                        success: function(responseText){
                            let musicInfo = JSON.parse(responseText);
                            // $.init(musicInfo);
                        },
                        fail:function(status){
                            console.error('歌单拉取失败！');
                        }
                    });
                }
            }
        })();




    $.init(317921676);
})(window, document);
