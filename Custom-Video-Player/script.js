const toggle = document.querySelector(".toggle");
const video = document.querySelector(".player__video");
const progressFill = document.querySelector(".progress__fill");
const progress = document.querySelector(".progress");
const playerSlider = document.querySelectorAll(".player__slider");
const skip = document.querySelectorAll("[data-skip]");
toggle.addEventListener("click", playPause);
video.addEventListener("click", playPause);
function playPause(e) {
  if (video.paused) {
    toggle.textContent = "❚ ❚";
    video.play();
  } else {
    toggle.textContent = "►";
    video.pause();
  }
}
video.addEventListener("timeupdate", progressVideo);
function progressVideo() {
  let playTime = (video.currentTime / video.duration) * 100;
  progressFill.style.width = `${playTime}%`;
}
progress.addEventListener("click", playPlaceClick);
function playPlaceClick(e) {
  let startPlay = (e.layerX / this.clientWidth) * 100;
  progressFill.style.width = `${startPlay}%`;
  video.currentTime = video.duration * (startPlay / 100);
}
playerSlider.forEach(function (slider) {
  slider.addEventListener("click", changeVolumeAndSpeed);
  slider.addEventListener("mousemove", changeVolumeAndSpeed);
});
function changeVolumeAndSpeed() {
  video[this.name] = this.value;
}
skip.forEach(function (skip) {
  skip.addEventListener(
    "click",
    (e) => (video.currentTime += parseInt(e.target.dataset.skip))
  );
});
