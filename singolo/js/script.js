const navigation = document.querySelector(".navigation");
const header__navigation = document.querySelector(".header__navigation");
const header_content = document.querySelector(".header-content");
const burger = document.querySelector(".burger-menu");
const body = document.querySelector("body");
const bod = document.querySelector(".services");
const bodyChildren = body.children;
const nav = document.querySelectorAll(".navigation__link");
const all = document.querySelector(".all");
const web = document.querySelector(".web-design");
const graphic = document.querySelector(".graphic-design");
const artwork = document.querySelector(".artwork");
const button_filter = document.querySelectorAll(".button-filter");
const images = document.querySelectorAll(".images");
let numb = [];
let remove_active_button = button_filter[0];
let remove = nav[0];

//OPEN THE BURGER MENU
burger.addEventListener("click", () => {
  burger.classList.toggle("click");
  header_content.classList.toggle("open");

});

//SCROLL TRACKING
for (let i = 0; i < nav.length; i++) {
  window.addEventListener("scroll", () => {
    console.log(bodyChildren[3].offsetTop);
    if (
      bodyChildren[0].offsetTop <= pageYOffset &&
      pageYOffset <= bodyChildren[0].offsetTop + bodyChildren[0].scrollHeight
    ) {
      nav[0].classList.add("active");
    } else {
      nav[i].classList.remove("active");
    }
    if (
      bodyChildren[2].offsetTop <= pageYOffset &&
      pageYOffset <= bodyChildren[2].offsetTop + bodyChildren[2].scrollHeight
    ) {
      nav[1].classList.add("active");
    } else {
      nav[i].classList.remove("active");
    }
    if (
      bodyChildren[3].offsetTop <= pageYOffset &&
      pageYOffset < bodyChildren[3].offsetTop + bodyChildren[3].scrollHeight
    ) {
      nav[2].classList.add("active");
    } else {
      nav[i].classList.remove("active");
    }
  });
  //CLOSURE THE BURGER MENU , HIGHLIGHTING THE MENU ON CLICK AND SMOOTH SCROLLING TO THE ELEMENT
  nav[i].addEventListener("click", function (e) {
    e.preventDefault();
    remove.classList.remove("active");
    nav[i].classList.add("active");
    remove = nav[i];
    burger.classList.remove("click");
    header_content.classList.remove("open");
    const blockID = nav[i].getAttribute("href").substr(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

//HIGHLIGHTING THE BUTTONS FILTER ON CLICK

for (let i = 0; i < button_filter.length; i++) {
  button_filter[i].addEventListener("click", () => {
    remove_active_button.classList.remove("active-button-filter");
    button_filter[i].classList.add("active-button-filter");
    remove_active_button = button_filter[i];
  });
}

//SHUFFLING IMAGE ELEMENTS
for (let s = 0; s < images.length; s++) {
  all.addEventListener("click", () => {
    images[s].style.backgroundImage =
      "url(images/portfolio-images/portfolio-" + numb[s] + ".png)";
  });
}
web.addEventListener("click", () => {
  shuffle(arr);
});
for (let s = 0; s < images.length; s++) {
  web.addEventListener("click", () => {
    images[s].style.backgroundImage =
      "url(images/portfolio-images/portfolio-" + arr[s] + ".png)";
  });
}
graphic.addEventListener("click", () => {
  shuffle(arr);
});
for (let s = 0; s < images.length; s++) {
  graphic.addEventListener("click", () => {
    images[s].style.backgroundImage =
      "url(images/portfolio-images/portfolio-" + arr[s] + ".png)";
  });
}
artwork.addEventListener("click", () => {
  shuffle(arr);
});
for (let s = 0; s < images.length; s++) {
  artwork.addEventListener("click", () => {
    images[s].style.backgroundImage =
      "url(images/portfolio-images/portfolio-" + arr[s] + ".png)";
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
for (let i = 1; i < 13; i++) {
  numb.push(i);
  arr.push(i);
}
shuffle(arr);

//SLIDER
let slider = document.getElementById("slider"),
  sliderItems = document.getElementById("slides"),
  prev = document.getElementById("prev"),
  next = document.getElementById("next");

function slide(wrapper, items, prev, next) {
  var posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    threshold = 100,
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
  items.onmousedown = dragStart;
  items.addEventListener("touchstart", dragStart);
  items.addEventListener("touchend", dragEnd);
  items.addEventListener("touchmove", dragAction);

  prev.addEventListener("click", function () {
    shiftSlide(-1);
  });
  next.addEventListener("click", function () {
    shiftSlide(1);
  });

  items.addEventListener("transitionend", checkIndex);

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;

    if (e.type == "touchstart") {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == "touchmove") {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = items.offsetLeft - posX2 + "px";
  }

  function dragEnd(e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, "drag");
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, "drag");
    } else {
      items.style.left = posInitial + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(dir, action) {
    items.classList.add("shifting");

    if (allowShift) {
      if (!action) {
        posInitial = items.offsetLeft;
      }

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

slide(slider, sliderItems, prev, next);
