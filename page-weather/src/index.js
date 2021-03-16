let faRefresh = document.querySelector(".fa-refresh");
let btnSotr = document.querySelector(".btn-sort");
faRefresh.addEventListener("click", (e) => {
  faRefresh.classList.add("fa-update");
  updateBackground();
});
faRefresh.addEventListener("animationend", (e) => {
  faRefresh.classList.remove("fa-update");
});
btnSotr.addEventListener("click", (e) => {
  let btnLanguages = document.querySelector(".btn-languages");
  btnLanguages.classList.toggle("btn-languages-active");
});
if (localStorage.getItem("lang") == "en" || null) {
  document.querySelector(".intro").textContent ="Getting data about your location";
} else {
  document.querySelector(".intro").textContent ="Получение данных о вашем местоположении";
}
import map from "./map";
import updateBackground from "./background";
