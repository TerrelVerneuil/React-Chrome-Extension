document.addEventListener('DOMContentLoaded', function () {
  let timer;
  let time;
  let isPaused = false;

  const timerElement = document.getElementById('timer');
  const startButton = document.getElementById('startButton');
  const pauseButton = document.getElementById('pauseButton');

  function startTimer() {
    if (!timer) {
      time = parseTime(timerElement.innerText);
      updateTimerDisplay();

      startButton.style.display = 'none';
      pauseButton.style.display = 'inline-block';

      timer = setInterval(function () {
        if (!isPaused) {
          time--;
          updateTimerDisplay();

          if (time <= 0) {
            alert("Time's up!");
            resetTimer();
          }
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    isPaused = !isPaused;

    if (isPaused) {
      startButton.style.display = 'inline-block';
      pauseButton.style.display = 'none';
    } else {
      startButton.style.display = 'none';
      pauseButton.style.display = 'inline-block';
    }
  }

  function resetTimer() {
    clearInterval(timer);
    timer = null;
    isPaused = false;
    time = parseTime(timerElement.innerText);
    updateTimerDisplay();

    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
  }

  function editTimer() {
    let regex = /^([0-5]?[0-9]:[0-5]?[0-9])$/;
    timerElement.addEventListener('input', function () {
      let inputTime = timerElement.innerText;
      if (!regex.test(inputTime)) {
        timerElement.innerText = formatTime(time);
      }
    });

    timerElement.addEventListener('paste', function (e) {
      let pasteData = (e.clipboardData || window.clipboardData).getData('text');
      if (!/^\d+:\d+$/.test(pasteData)) {
        e.preventDefault();
      } else {
        time = parseTime(pasteData);
        updateTimerDisplay();
      }
    });
  }

  function parseTime(timeString) {
    const parts = timeString.split(':');
    const minutes = parseInt(parts[0]) || 0;
    const seconds = parseInt(parts[1]) || 0;
    return minutes * 60 + seconds;
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  function updateTimerDisplay() {
    timerElement.innerText = formatTime(time);
  }

  // Initial setup
  editTimer();
  startButton.addEventListener('click', startTimer);
  pauseButton.addEventListener('click', pauseTimer);
  document.getElementById('resetButton').addEventListener('click', resetTimer);
});
