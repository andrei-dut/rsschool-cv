const videoPlayer = document.querySelector(".video-player");
const speed = document.querySelector(".speed");
const speedBar = document.querySelector(".speed-bar");
speed.addEventListener("mousemove", changeSpeed);
function changeSpeed(e) {
  const min = 0.5;
  const max = 4.01;
  let mouseMove = (e.pageY - speed.offsetTop) / speed.offsetHeight;
  let playbackRate = mouseMove * (max - min) + min;
  speedBar.style.height = `${Math.round(mouseMove * 100) + 10}%`;
  videoPlayer.playbackRate = playbackRate;
  speedBar.textContent = `${playbackRate.toFixed(2)}x`;
  console.log(`${Math.round(mouseMove * 100)}%`);
}
