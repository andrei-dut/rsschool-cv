const wrapper = document.querySelector(".wrapper");
const time = document.querySelector(".time");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const Focus = document.querySelector(".focus");
function ShowTime() {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let second = today.getSeconds();
  let amPm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  time.innerHTML = `${hour}:${addZero(min)}:${addZero(second)} ${amPm}`;
  setTimeout(ShowTime, 1000);
}
function addZero(numb) {
  return (numb < 10 ? "0" : "") + numb;
}
function setGreet() {
  let today = new Date();
  let hour = today.getHours();
  if (hour < 12) {
    wrapper.style.backgroundImage = "url(img/morning.jpg)";
    greeting.textContent = "Good Morning, ";
  } else if (hour < 18) {
    wrapper.style.backgroundImage = "url(img/aftenoon.jpg)";
    greeting.textContent = "Good Afternoon, ";
    wrapper.style.color = "rgba(5, 5, 5, 0.7)";
  } else {
    wrapper.style.backgroundImage = "url(img/evening.jpg)";
    wrapper.style.color = "rgb(255, 255, 255, 0.7)";
    greeting.textContent = "Good Evening, ";
  }
}
function getName() {
  if (
    localStorage.getItem("name") === null ||
    localStorage.getItem("name") === ""
  ) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}
function setName(e) {
  if (e.type === "keypress" && e.keyCode == 13) {
      localStorage.setItem("name", e.target.textContent);
      name.blur();
  } else {
    localStorage.setItem("name", e.target.textContent);
  }
}
function getFocus() {
  if (
    localStorage.getItem("focus") === null ||
    localStorage.getItem("focus") === ""
  ) {
    Focus.textContent = "[Enter Focus]";
  } else {
    Focus.textContent = localStorage.getItem("focus");
  }
}
function setFocus(e) {
  if (e.type === "keypress" && e.keyCode == 13) {
      localStorage.setItem("focus", e.target.textContent);
      Focus.blur();
  } else {
    localStorage.setItem("focus", e.target.textContent);
  }
}
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
Focus.addEventListener("keypress", setFocus);
Focus.addEventListener("blur", setFocus);
ShowTime();
setGreet();
getName();
getFocus();
