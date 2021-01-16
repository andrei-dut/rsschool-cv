const headerContent = document.querySelector(".header-content");
const burger = document.querySelector(".burger-menu");
const body = document.querySelector("body");
const bodyChildren = body.children;
const navigationLink = document.querySelectorAll(".navigation__link");
const buttonFilterAll = document.querySelector(".all-images");
const buttonFilterWeb = document.querySelector(".web-design");
const buttonFilterGraphic = document.querySelector(".graphic-design");
const buttonFilterArtwork = document.querySelector(".artwork");
const buttonFilter = document.querySelectorAll(".button-filter");
const images = document.querySelectorAll(".images");
let slider = document.getElementById("slider"),
  sliderItems = document.getElementById("slides"),
  prev = document.getElementById("prev"),
  next = document.getElementById("next");
let numb = [];
let removeActiveButton = buttonFilter[0];
let remove = navigationLink[0];

//OPEN THE BURGER MENU
burger.addEventListener("click", () => {
  burger.classList.toggle("active-icon-burger-menu");
  headerContent.classList.toggle("active-burger-menu");
});

//SCROLL TRACKING
for (let i = 0; i < navigationLink.length; i++) {
  window.addEventListener("scroll", () => {
    if (
      bodyChildren[i].offsetTop <= pageYOffset &&
      pageYOffset <= bodyChildren[i].offsetTop + bodyChildren[i].scrollHeight
    ) {
      navigationLink[i].classList.add("active");
    } else {
      navigationLink[i].classList.remove("active");
    }
  });
  //CLOSURE THE BURGER MENU , HIGHLIGHTING THE MENU ON CLICK AND SMOOTH SCROLLING TO THE ELEMENT
  navigationLink[i].addEventListener("click", function (e) {
    const blockID = navigationLink[i].getAttribute("href").substr(1);
    e.preventDefault();
    remove.classList.remove("active");
    navigationLink[i].classList.add("active");
    remove = navigationLink[i];
    burger.classList.remove("active-icon-burger-menu");
    headerContent.classList.remove("active-burger-menu");
    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

//HIGHLIGHTING THE BUTTONS FILTER ON CLICK

for (let i = 0; i < buttonFilter.length; i++) {
  buttonFilter[i].addEventListener("click", () => {
    removeActiveButton.classList.remove("active-button-filter");
    buttonFilter[i].classList.add("active-button-filter");
    removeActiveButton = buttonFilter[i];
  });
}

//SHUFFLING IMAGE ELEMENTS
for (let s = 0; s < images.length; s++) {
  buttonFilterAll.addEventListener("click", () => {
    images[s].src = "images/portfolio-images/portfolio-" + numb[s] + ".png";
    images[s].alt = "portfolio-" + numb[s];
  });
}
buttonFilterWeb.addEventListener("click", () => {
  shuffle(arr);
});
for (let s = 0; s < images.length; s++) {
  buttonFilterWeb.addEventListener("click", () => {
    images[s].src = "images/portfolio-images/portfolio-" + arr[s] + ".png";
    images[s].alt = "portfolio-" + arr[s];
  });
}
buttonFilterGraphic.addEventListener("click", () => {
  shuffle(arr);
});
for (let s = 0; s < images.length; s++) {
  buttonFilterGraphic.addEventListener("click", () => {
    images[s].src = "images/portfolio-images/portfolio-" + arr[s] + ".png";
    images[s].alt = "portfolio-" + arr[s];
  });
}
buttonFilterArtwork.addEventListener("click", () => {
  shuffle(arr);
});
for (let s = 0; s < images.length; s++) {
  buttonFilterArtwork.addEventListener("click", () => {
    images[s].src = "images/portfolio-images/portfolio-" + arr[s] + ".png";
    images[s].alt = "portfolio-" + arr[s];
  });
}

function shuffle(array) {
  let i = array.length,
    temporaryValue,
    random;
  while (0 !== i) {
    random = Math.floor(Math.random() * i);
    i -= 1;
    temporaryValue = array[i];
    array[i] = array[random];
    array[random] = temporaryValue;
  }

  return array;
}
let arr = [];
for (let i = 1; i <= images.length; i++) {
  numb.push(i);
  arr.push(i);
}
shuffle(arr);

//SLIDER

function slide(items, prev, next) {
  let posInitial,
    slides = items.getElementsByClassName("slide"),
    slidesLength = slides.length,
    slideSize = items.getElementsByClassName("slide")[0].offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    index = 0,
    allowShift = true;

  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);

  prev.addEventListener("click", function () {
    shiftSlide(-1);
  });
  next.addEventListener("click", function () {
    shiftSlide(1);
  });
  items.addEventListener("transitionend", checkIndex);

  function shiftSlide(dir) {
    items.classList.add("shifting");

    if (allowShift) {
      posInitial = items.offsetLeft;
      if (dir == 1) {
        items.style.left = posInitial - slideSize + "px";
        index++;
      } else if (dir == -1) {
        items.style.left = posInitial + slideSize + "px";
        index--;
      }
    }

    allowShift = false;
  }

  function checkIndex() {
    items.classList.remove("shifting");

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    allowShift = true;
  }
}

slide(sliderItems, prev, next);
