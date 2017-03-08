let FM = (function(){
    let liked = true;
    let currentSongIndex, songList;
    let cvs, audioContext, analyser, audioSrouce, frequencyData;

    const DOM = {
        playBtn: document.getElementById('btn-play'),
        likeBtn: document.getElementById('btn-like'),
        nextBtn: document.getElementById('btn-next'),
        prevBtn: document.getElementById('btn-prev'),
        pauseBtn: document.getElementById('btn-pause'),
        heart: document.getElementById('b'),
        audio: new Audio(),
        progress: document.querySelectorAll('.progress')[0],
        progressBar: document.getElementById('progressBar'),
        time: document.querySelectorAll('.time')[0],
        title: document.getElementById('title'),
        author: document.getElementById('author'),
        cover: document.getElementById('cover'),
        volumeSlider = document.getElementById('volume')
    };


    function eventsHandler() {
        DOM.audio.addEventListener('timeupdate', function(){
            showTime();
        })
        DOM.playBtn.onclick = function(e){
            DOM.audio.play();
            DOM.playBtn.style.display = 'none';
            DOM.pauseBtn.style.display = 'inline-block';
        };
        DOM.pauseBtn.onclick = function(){
            DOM.audio.pause();
            DOM.pauseBtn.style.display = 'none';
            DOM.playBtn.style.display = 'inline-block';
        }
        DOM.likeBtn.onclick = function(){
            liked = !liked;
            if (!liked) {
                DOM.heart.style.fill = '#4A4A4A';
            } else {
                DOM.heart.style.fill = '#FF2C56';
            }
        };
        DOM.nextBtn.onclick = function(){
            currentSongIndex++;
            if (currentSongIndex >= songList.length) currentSongIndex = 0;
            getMusic(songList, currentSongIndex);
        };
        DOM.prevBtn.onclick = function(){
            currentSongIndex--;
            if (currentSongIndex < 0) currentSongIndex = songList.length - 1;
            getMusic(songList, currentSongIndex);
        };
        DOM.progress.onclick = function(e){
            let x = e.clientX - DOM.progress.offsetLeft;
            let percent = x/DOM.progress.offsetWidth*100;
            DOM.progressBar.style.left = percent + '%';
            DOM.audio.currentTime = parseInt(DOM.audio.duration * (percent/100));
        }
        DOM.volumeSlider.onclick = function(e) {

        }
    }

    function showTime(){
        if (DOM.audio.duration) {
            let totalTime = parseInt(DOM.audio.duration);
            let currentTime = parseInt(DOM.audio.currentTime);
            let timeLeft = totalTime - currentTime;
            let m = parseInt(timeLeft / 60);
            let s = parseInt(timeLeft % 60);
            m = m < 10 ? `0${m}` : m;
            s = s < 10 ? `0${s}` : s;

            DOM.progressBar.style.left = '-' + (timeLeft/totalTime*100)+'%';
            DOM.time.innerHTML = `${m}:${s}`;
            if (timeLeft == 0) {
                currentSongIndex++;
                if (currentSongIndex >= songList.length) currentSongIndex = 0;
                getMusic(songList, currentSongIndex);
            };
        }
    }

    function getMusic(info, i) {
        currentSongIndex = i;
        DOM.audio.src = info[i].src;
        DOM.audio.volume = 1.0;
        DOM.audio.autoplay = true;
        document.title = DOM.title.innerHTML = info[i].name;
        DOM.author.innerHTML = info[i].author;
        DOM.cover.src = info[i].cover;
    }

    return {
        init: function(){
            songList = list;
            getMusic(songList, 0);
            eventsHandler();
        }
    }
})();

FM.init();
