let nextPhoto = Math.round(Math.random() * (80 - 1) + 1);
let urlImg =  "https://api.pexels.com/v1/search?orientation=landscape&query=forest&per_page=80";
updateBackground();
export default function updateBackground() {
  let optionsImg = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "563492ad6f9170000100000115bb7f005be04317b29e41cd71a6e239",
    },
  };
  document.querySelector(".background").classList.add("change-background");
  fetch(urlImg, optionsImg)
    .then((response) => response.json())
    .then((result) => {
      document.querySelector(".background").src =`${result.photos[nextPhoto].src.large}`;
      document.querySelector(".background").addEventListener("load", () =>
          document.querySelector(".background").classList.remove("change-background"));
      if (nextPhoto < result.photos.length - 1) {
        nextPhoto++;
      } else {
        nextPhoto = 0;
        urlImg = result.next_page;
      }
    })
    .catch((error) => console.log("error", error));
}
