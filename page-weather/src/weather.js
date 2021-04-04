let tempKelvinToday,
  tempKelvinFeelLikes,
  tempKelvinFirstDay,
  tempKelvinSecondDay,
  tempKelvinThreeDay;
let firstDayTemp = document.querySelector(".first-day-temp");
let secondDayTemp = document.querySelector(".second-day-temp");
let thirdDayTemp = document.querySelector(".third-day-temp");
let tempToday = document.querySelector(".temp-today");
let btnC = document.querySelector(".btn-C");
let btnF = document.querySelector(".btn-F");
let temp = localStorage.getItem("temp");
if (temp == null) temp = "C";
export default function changeLang(position, country, lang = "en") {
  let paramWeather = {};
  if (lang == "en") {
    paramWeather = {
      feels: "FEELS LIKE",
      wind: "WIND",
      humidity: "HUMIDITY",
      latitude: "Latitude",
      longitude: "Longitude",
    };
  } else {
    paramWeather = {
      feels: "ОЩУЩАЕТСЯ",
      wind: "ВЕТЕР",
      humidity: "ВЛАЖНОСТЬ",
      latitude: "Широта",
      longitude: "Долгота",
    };
  }
  weatherToday(position, country, lang, paramWeather);
}
function weatherToday(position, country, lang, paramWeather) {
  let latitude = document.querySelector(".latitude");
  let longitude = document.querySelector(".longitude");
  temp = localStorage.getItem("temp");
  latitude.textContent = `${paramWeather.latitude}: ${parseInt(
    position[0]
  )}°${position[0].toFixed(2).slice(-2)}'`;
  longitude.textContent = `${paramWeather.longitude}: ${parseInt(
    position[1]
  )}°${position[1].toFixed(2).slice(-2)}'`;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position[0]}&lon=${position[1]}2&lang=${lang}&appid=0757c33071fd341244e92530be5e2462`)
    .then((response) => response.json())
    .then((data) => {
      getTimeDate(lang);
      if (lang == "ru") {
        let div = document.querySelector(".btn-en");
        document.querySelector(".btn-languages").append(div);
        document.querySelector(".search__field").placeholder = "Поиск города";
        document.querySelector(".btn-ru").classList.add("active");
        document.querySelector(".btn-en").classList.remove("active");
        document.querySelector(".wind-speed").textContent = `${paramWeather.wind}: ${data.wind.speed} м/с`;
        getCountry(data.sys.country)
          .then((response) => response.json())
          .then((result) => {
            document.querySelector(".name-country-city").textContent = `${data.name}, ${result.suggestions[0].value}`;
          })
          .catch((error) => console.log("error", error));
      } else {
        let div = document.querySelector(".btn-ru");
        document.querySelector(".btn-languages").append(div);
        document.querySelector(".search__field").placeholder = "Search city";
        document.querySelector(".wind-speed").textContent = `${paramWeather.wind}: ${data.wind.speed} m/s`;
        document.querySelector(".btn-ru").classList.remove("active");
        document.querySelector(".btn-en").classList.add("active");
        document.querySelector(".name-country-city").textContent = `${data.name}, ${country}`;
      }
      tempKelvinToday = data.main.temp;
      tempKelvinFeelLikes = data.main.feels_like;
      document.querySelector(".summary-weather").textContent = data.weather[0].description;
      document.querySelector(".humidity").textContent = `${paramWeather.humidity}: ${data.main.humidity}%`;
      if (temp == "C") {
        btnC.classList.add("active");
        btnF.classList.remove("active");
        tempToday.textContent = `${Math.round(data.main.temp - 273.15)}`;
        document.querySelector(".apparent-temperature").textContent = `${paramWeather.feels}: ${Math.round(data.main.feels_like - 273.15)}°`;
      } else {
        btnC.classList.remove("active");
        btnF.classList.add("active");
        tempToday.textContent = `${Math.round(data.main.temp * 1.8 - 459)}`;
        document.querySelector(".apparent-temperature").textContent = `${paramWeather.feels}: ${Math.round(data.main.feels_like * 1.8 - 459)}`;
      }
      document.querySelector(".icon-weather").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    });
  weatherTomorrow(position, lang);
  changeTemp(paramWeather);
}

function getTimeDate(lang) {
  let dateToday = new Date();
  let optionsToday = {
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  document.querySelector(".date-today").textContent = dateToday.toLocaleString(
    lang,
    optionsToday
  );
  setInterval(() => {
    let dateToday = new Date();
    let optionsToday = {
      hour12: false,
      timezone: "UTC",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    document.querySelector(".time-today").textContent = dateToday.toLocaleString(lang, optionsToday);
  }, 100);
}
function weatherTomorrow(position, lang) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position[0]}&lon=${position[1]}2&appid=0757c33071fd341244e92530be5e2462`)
    .then((response) => response.json())
    .then((data) => {
      tempKelvinFirstDay = data.list[6].main.temp;
      tempKelvinSecondDay = data.list[14].main.temp;
      tempKelvinThreeDay = data.list[22].main.temp;
      if (temp == "C") {
        firstDayTemp.textContent = `${Math.round(
          data.list[6].main.temp - 273.15
        )}°`;
        secondDayTemp.textContent = `${Math.round(
          data.list[14].main.temp - 273.15
        )}°`;
        thirdDayTemp.textContent = `${Math.round(
          data.list[22].main.temp - 273.15
        )}°`;
      } else {
        firstDayTemp.textContent = `${Math.round(
          data.list[6].main.temp * 1.8 - 459
        )}°`;
        secondDayTemp.textContent = `${Math.round(
          data.list[14].main.temp * 1.8 - 459
        )}°`;
        thirdDayTemp.textContent = `${Math.round(
          data.list[22].main.temp * 1.8 - 459
        )}°`;
      }
      document.querySelector(".first-day-icon").src = `http://openweathermap.org/img/wn/${data.list[6].weather[0].icon}@2x.png`;
      document.querySelector(".second-day-icon").src = `http://openweathermap.org/img/wn/${data.list[14].weather[0].icon}@2x.png`;
      document.querySelector(".third-day-icon").src = `http://openweathermap.org/img/wn/${data.list[22].weather[0].icon}@2x.png`;
      document.querySelector(".name-first-day").textContent = getDaysWeek(+(data.list[6].dt + "000"),lang);
      document.querySelector(".name-second-day").textContent = getDaysWeek(+(data.list[14].dt + "000"),lang);
      document.querySelector(".name-three-day").textContent = getDaysWeek(+(data.list[22].dt + "000"),lang);
    });
}
function getDaysWeek(day, lang) {
  let date = new Date(day);
  let options = {
    weekday: "long",
  };
  setTimeout(
    () => (document.querySelector(".page-load").style.display = "none"),
    500
  );
  return date.toLocaleString(lang, options);
}
function getCountry(countryCode) {
  let url =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/country";
  let token = "71a742922c5bad58329772e3c4f6c8a288cdb4e8";
  let query = countryCode;

  let options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify({ query: query }),
  };

  return fetch(url, options);
}
function changeTemp(paramWeather) {
  btnF.addEventListener("click", () => {
    localStorage.setItem("temp", "F");
    btnF.classList.add("active");
    btnC.classList.remove("active");
    firstDayTemp.textContent = `${Math.round(tempKelvinFirstDay * 1.8 - 459)}°`;
    secondDayTemp.textContent = `${Math.round(tempKelvinSecondDay * 1.8 - 459)}°`;
    thirdDayTemp.textContent = `${Math.round(tempKelvinThreeDay * 1.8 - 459)}°`;
    tempToday.textContent = `${Math.round(tempKelvinToday * 1.8 - 459)}`;
    document.querySelector(".apparent-temperature").textContent = `${paramWeather.feels}: ${Math.round(tempKelvinFeelLikes * 1.8 - 459)}°`;
  });
  btnC.addEventListener("click", () => {
    localStorage.setItem("temp", "C");
    btnC.classList.add("active");
    btnF.classList.remove("active");
    firstDayTemp.textContent = `${Math.round(tempKelvinFirstDay - 273.15)}°`;
    secondDayTemp.textContent = `${Math.round(tempKelvinSecondDay - 273.15)}°`;
    thirdDayTemp.textContent = `${Math.round(tempKelvinThreeDay - 273.15)}°`;
    tempToday.textContent = `${Math.round(tempKelvinToday - 273.15)}`;
    document.querySelector(".apparent-temperature").textContent = `${paramWeather.feels}: ${Math.round(tempKelvinFeelLikes - 273.15)}°`;
  });
}
