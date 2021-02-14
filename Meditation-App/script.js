const video = document.querySelector(".video");
const audio = document.querySelector(".audio");
const btnsMinutes = document.querySelectorAll(".setting-time__button");
const btnsRain = document.querySelector(".rain");
const btnsSun = document.querySelector(".sun");
const maskLeft = document.querySelector(".timer__mask-left");
const maskRight = document.querySelector(".timer__mask-right");
const timerLine = document.querySelector(".timer__line");
const bntPlay = document.querySelector(".timer__display__button-play");
const btnPause = document.querySelector(".timer__display__button-pause");
const timeCount = document.querySelector(".timer__display__time-count");
const btnUpdate = document.querySelector(".timer__display__button-update");
let timeTimer = 0;
let timeAnimation = 0;
let setIntervalId;
let countClick = 0;

btnsRain.addEventListener("click", function (e) {
  video.src = "video/rain.mp4";
  audio.src = "sounds/rain.mp3";
  timerReset();
});
btnsSun.addEventListener("click", function (e) {
  video.src = "video/sun.mp4";
  audio.src = "sounds/sun.mp3";
  timerReset();
});

btnsMinutes.forEach(function (item) {
  item.addEventListener("click", function (e) {
    timeTimer = parseInt(e.target.textContent) * 60;
    timeAnimation = parseInt(e.target.textContent) * 60;
    insertTime();
    playPause("pause", timeAnimation);
    animationReset();
    countClick = 0;
  });
});
btnUpdate.addEventListener("click", timerReset);
bntPlay.addEventListener("click", function (e) {
  if (countClick < 1) {
    playPause("play", timeAnimation);
  }
  countClick++;
});
btnPause.addEventListener("click", function (e) {
  playPause("pause", timeAnimation);
  countClick = 0;
});
function insertTime() {
  if (timeTimer >= 0) {
    let seconds = Math.floor(timeTimer % 60);
    let minutes = Math.floor((timeTimer / 60) % 60);
    if (seconds < 10) {
      timeCount.textContent = `${minutes}:0${seconds}`;
    } else {
      timeCount.textContent = `${minutes}:${seconds}`;
    }
    timeTimer--;
  } else {
    timerReset();
  }
}

function playPause(playTimer, time) {
  if (timeTimer > 0) {
    if (playTimer === "play") {
      setIntervalId = setInterval(insertTime, 1000);
      video.play();
      audio.play();
      timerLine.style.animation = `line ${time}s linear forwards running`;
      maskLeft.style.animation = `mask-left ${time}s linear forwards running`;
      maskRight.style.animation = `mask-right ${time}s step-end forwards running`;
    } else {
      clearInterval(setIntervalId);
      video.pause();
      audio.pause();
      timerLine.style.animation = `line ${time}s linear forwards paused`;
      maskLeft.style.animation = `mask-left ${time}s linear forwards paused`;
      maskRight.style.animation = `mask-right ${time}s step-end forwards paused`;
    }
  }
}
function animationReset() {
  timerLine.style.animation = `none`;
  maskLeft.style.animation = `none`;
  maskRight.style.animation = `none`;
}
function timerReset() {
  timerLine.style.animation = `none`;
  maskLeft.style.animation = `none`;
  maskRight.style.animation = `none`;
  timeCount.textContent = `${0}:${"00"}`;
  clearInterval(setIntervalId);
  video.pause();
  audio.pause();
  timeTimer = 0;
  timeAnimation = 0;
  countClick = 0;
}
