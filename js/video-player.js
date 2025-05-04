document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.querySelector('.video-container');
    const video = document.querySelector('.custom-video');
    const playButton = document.querySelector('.play-button');
    const playIcon = document.querySelector('.play-icon');
    const progressBar = document.querySelector('.progress');
    const timeDisplay = document.querySelector('.time-display');
    const volumeButton = document.querySelector('.volume-button');
    const volumeIcon = document.querySelector('.volume-icon');
    const volumeSlider = document.querySelector('.volume-slider');
    const fullscreenButton = document.querySelector('.fullscreen-button');

    // Автовоспроизведение при загрузке
    video.play().catch(function(error) {
        console.log("Автовоспроизведение не удалось:", error);
    });

    // Функция воспроизведения/паузы
    function togglePlay() {
        if (video.paused) {
            video.play();
            playIcon.classList.remove('paused');
        } else {
            video.pause();
            playIcon.classList.add('paused');
        }
    }

    // Обработчики событий для воспроизведения
    playButton.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    // Обновление прогресс-бара
    video.addEventListener('timeupdate', function() {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = progress + '%';
        timeDisplay.textContent = formatTime(video.currentTime) + ' / ' + formatTime(video.duration);
    });

    // Перемотка по клику на прогресс-бар
    const progressContainer = document.querySelector('.progress-container');
    progressContainer.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    });

    // Управление звуком
    volumeButton.addEventListener('click', function() {
        video.muted = !video.muted;
        volumeIcon.classList.toggle('muted', video.muted);
        volumeSlider.value = video.muted ? 0 : video.volume * 100;
    });

    volumeSlider.addEventListener('input', function() {
        video.volume = this.value / 100;
        video.muted = video.volume === 0;
        volumeIcon.classList.toggle('muted', video.muted);
    });

    // Полноэкранный режим
    fullscreenButton.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            videoContainer.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    // Форматирование времени
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }

    // Скрытие элементов управления
    let hideTimeout;
    videoContainer.addEventListener('mousemove', function() {
        clearTimeout(hideTimeout);
        videoContainer.classList.add('show-controls');
        
        if (!video.paused) {
            hideTimeout = setTimeout(() => {
                videoContainer.classList.remove('show-controls');
            }, 2000);
        }
    });

    videoContainer.addEventListener('mouseleave', function() {
        if (!video.paused) {
            videoContainer.classList.remove('show-controls');
        }
    });

    // Горячие клавиши
    document.addEventListener('keydown', function(e) {
        if (document.activeElement.tagName === 'INPUT') return;

        switch(e.key.toLowerCase()) {
            case ' ':
            case 'k':
                togglePlay();
                e.preventDefault();
                break;
            case 'm':
                video.muted = !video.muted;
                volumeIcon.classList.toggle('muted', video.muted);
                break;
            case 'f':
                fullscreenButton.click();
                break;
            case 'arrowleft':
                video.currentTime = Math.max(video.currentTime - 5, 0);
                break;
            case 'arrowright':
                video.currentTime = Math.min(video.currentTime + 5, video.duration);
                break;
            case 'arrowup':
                video.volume = Math.min(video.volume + 0.1, 1);
                volumeSlider.value = video.volume * 100;
                break;
            case 'arrowdown':
                video.volume = Math.max(video.volume - 0.1, 0);
                volumeSlider.value = video.volume * 100;
                break;
        }
    });
});