const obj = {};

let socket = io();
let userName;
let colorMessage;

let messages = document.getElementById("messages");
let form = document.getElementById("form");
let input = document.getElementById("input");

let formAuthorization = document.getElementById("form-authorization");
let nameUser = document.getElementById("name-user");

let counterPrint = 0;
let arrName = [];
let names;
let text;
let idSetInterval;

formAuthorization.addEventListener("submit", function (e) {
  e.preventDefault();
  if (nameUser.value) {
    obj.authorization().close();
    userName = nameUser.value;
    socket.emit("name user", userName);
    nameUser.value = "";
    colorMessage = randColor();
    console.log(colorMessage);
  }
});
socket.on("eventClient", function (text) {
  let item = document.createElement("p");
  item.textContent = `${text}`;
  messages.appendChild(item);
  if (arrName.length >= 1) {
    messages.append(document.querySelector(".footer"));
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", userName, colorMessage, input.value);
    input.value = "";
    input.focus();
  }
});

socket.on("notPrintMsg", function (name) {
  arrName.splice(arrName.indexOf(name), 1);
  if (arrName.length === 0 && document.querySelector(`.print-msg`)) {
    document.querySelector(`.print-msg`).remove();
    clearInterval(idSetInterval);
  } else {
    names = arrName.join(", ");
    text = `${names} печатает сообщение`;
    document.querySelector(`.print-msg`).textContent = text;
  }
});

input.addEventListener("change", () => socket.emit("not print msg", userName));
input.addEventListener("input", printMessage);

function printMessage() {
  socket.emit("print msg", userName);
}
socket.on("printMsg", function (name) {
  messages.lastChild.scrollIntoView(false);
  if (arrName.indexOf(name) == -1) {
    arrName.push(name);
  }
  if (!document.querySelector(`.print-msg`)) {
    names = arrName.join(", ");
    let item = document.createElement("p");
    text = `${names} печатает сообщение`;
    item.textContent = text;
    item.classList.add(`print-msg`);
    item.classList.add("footer");
    item.style.textAlign = "start";
    messages.appendChild(item);
    idSetInterval = setInterval(() => {
      document.querySelector(`.print-msg`).textContent =
        document.querySelector(`.print-msg`).textContent + ".";
      if (counterPrint >= 4) {
        document.querySelector(`.print-msg`).textContent = text;
        counterPrint = 0;
      }
      counterPrint++;
    }, 400);
  } else {
    names = arrName.join(", ");
    text = `${names} печатает сообщение`;
  }
});

socket.on("chat message", function (name, color, msg) {
  let item = document.createElement("li");
  item.classList.add(`message-${name}`);
  item.textContent = `${name}: ${msg}`;
  messages.appendChild(item);
  item.style.background = color;
  if (arrName.length >= 1) {
    messages.append(document.querySelector(".footer"));
  }
  messages.lastChild.scrollIntoView(false);
});

obj.authorization = function () {
  const modal = {
    open() {
      document.querySelector(".wrapper__authorization").classList.add("open");
    },
    close() {
      document
        .querySelector(".wrapper__authorization")
        .classList.remove("open");
      document.querySelector(".wrapper__chat").classList.add("active-chat");
    },
  };
  return modal;
};
window.addEventListener("load", obj.authorization().open);
function randColor() {
  let r = Math.floor(Math.random() * 170);
  let g = Math.floor(Math.random() * 170);
  let b = Math.floor(Math.random() * 170);
  let color = `rgba(${r}, ${g}, ${b}, 0.5)`;
  return color;
}
window.addEventListener("unload", function () {
  socket.emit("not print msg", userName);
});
