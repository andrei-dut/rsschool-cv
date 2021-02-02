const keys = document.querySelectorAll(".key");
window.addEventListener("keydown", function (e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"`);
  key.classList.add("playing");
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
});
window.addEventListener("keyup", function (e) {
  keys.forEach((key) => key.classList.remove("playing"));
});
keys.forEach((key) => {
  key.addEventListener("mousedown", function () {
    const audio = document.querySelector(`audio[data-key="${key.dataset.key}"`);
    key.classList.add("playing");
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  });
  key.addEventListener("mouseup", function () {
    key.classList.remove("playing");
  });
  key.addEventListener("mouseout", function (e) {
    key.classList.remove("playing");
  });
});
