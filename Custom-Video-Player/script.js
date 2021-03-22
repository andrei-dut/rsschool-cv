const toggle = document.querySelector(".toggle");
const video = document.querySelector(".player__video");
const progressFill = document.querySelector(".progress__fill");

function playPause(e) {
  if (video.paused) {
    toggle.textContent = "❚ ❚";
    video.play();
  } else {
    toggle.textContent = "►";
    video.pause();
  }
}
function progressVideo() {
  let playTime = (video.currentTime / video.duration) * 100;
  progressFill.style.width = `${playTime}%`;
}
function playPlaceClick(e) {
  let startPlay = (e.layerX / this.clientWidth) * 100;
  progressFill.style.width = `${startPlay}%`;
  video.currentTime = video.duration * (startPlay / 100);
}
function changeVolumeAndSpeed() {
  video[this.name] = this.value;
}
document.querySelectorAll(".player__slider").forEach(function (slider) {
  slider.addEventListener("click", changeVolumeAndSpeed);
  slider.addEventListener("mousemove", changeVolumeAndSpeed);
});
document.querySelectorAll("[data-skip]").forEach(function (skip) {
  skip.addEventListener(
    "click",
    (e) => (video.currentTime += parseInt(e.target.dataset.skip))
  );
});
video.addEventListener("timeupdate", progressVideo);
document.querySelector(".progress").addEventListener("click", playPlaceClick);
toggle.addEventListener("click", playPause);
video.addEventListener("click", playPause);