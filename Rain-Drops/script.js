let drops = document.querySelectorAll(".container-drops");
let drop = document.querySelector(".container-drops");
let gameWindow = document.querySelector(".game-window");
let sea = document.querySelector(".game-window__sea");
let keys = document.querySelectorAll(".key");
let display = document.querySelector(".display");
let counter = document.querySelector(".counter");
let btnPlay = document.querySelector(".play");
let howPlay = document.querySelector(".how-play");
let gameStatistics = document.querySelector(".game-statistics");
let btnContinue = document.querySelector(".continue");
let playAgain = document.querySelector(".play-again");
let btnsStartGame = document.querySelector(".menu");
let gameMode = document.querySelector(".menu__game-mode");
let gameModeExpand = document.querySelector(".game-mode__expand");
let operatorsSign = document.querySelectorAll('.operators__sign')
let rangeNumberMin = document.querySelector(".min");
let rangeNumberMax = document.querySelector(".max");
let li = document.querySelectorAll("ol > li");
let seaStyleTop = parseInt(getComputedStyle(sea).top);
let setAnswer = "";
let plusScore = 10;
let counterInvalidResponse = 0;
let speedFallDrops = 20;
let numberDrops = 0;
let addDrop = true;
let elem = drop;
let gameTimeStart = new Date();
let counterCorrectAnswers = 0;
let counterIncorrectAnswers = 0;
let count = 0;


function enterResponse(that) {
  let contextBtn = that.textContent;
  contextBtn == undefined ? (contextBtn = that) : "";
  if (+contextBtn >= 0) setAnswer += contextBtn;

  switch (contextBtn) {
    case "Clear":
      setAnswer = setAnswer.slice(0, setAnswer.length - 1);
      break;
    case "Backspace":
      setAnswer = setAnswer.slice(0, setAnswer.length - 1);
      break;
    case "Del":
      setAnswer = "";
      if (setAnswer.length == 0) display.textContent = "0";
      break;
    case "Delete":
      setAnswer = "";
      if (setAnswer.length == 0) display.textContent = "0";
      break;
    case "Enter":
      if (elem.firstElementChild.firstElementChild.resultExpression == setAnswer) {
        counter.textContent = +counter.textContent + plusScore;
        addDlow(elem);
        setAnswer = "";
        plusScore++;
        counterCorrectAnswers++;
        counter.textContent > 150 && addDrop === true ? setTimeout(() => startAddDrop(0, 0, 20), 1000) : "";
        counter.textContent > 500 && addDrop === 0 ? setTimeout(() => startAddDrop(0, 1, 18), 1000) : "";
        counter.textContent > 800 ? (speedFallDrops = 16) : "";
        counter.textContent > 1200 ? (speedFallDrops = 15) : "";
        counter.textContent > 1800 && addDrop === 1 ? setTimeout(() => startAddDrop(0, 2, 15), 2000) : "";
        counter.textContent > 2800 ? (speedFallDrops = 10) : "";
      } else {
        let soundWrongAnswer = document.querySelector('.sound-wrong-answer');
        soundWrongAnswer.play();
        counter.textContent = +counter.textContent - plusScore;
        counter.textContent < 0 ? (counter.textContent = 0) : "";
        setAnswer = "";
        elem.firstElementChild.classList.add("false-answer");
        setTimeout(() => {
          for (drop of drops){
          drop.firstElementChild.classList.remove("false-answer")}}, 300);
        counterIncorrectAnswers++;
      }
      break;
  }
  display.value = setAnswer;
  if (setAnswer.length == 0) display.textContent = "0";
}
function automaticMode() {
  let time = 0;
  counterInvalidResponse = 2;
  speedFallDrops = 10
  elem.firstElementChild.firstElementChild.resultExpression;
  let setIntervalId = setInterval(() => {
    time++;
    time == 3 ? clearInterval(setIntervalId) : '';
    display.value = elem.firstElementChild.firstElementChild.resultExpression;
    setAnswer = elem.firstElementChild.firstElementChild.resultExpression;
    setTimeout(() => {
      for (key of keys) {
        if (key.textContent == "Enter") {
          key.click();
        }
      }
    }, 500);
  }, 3000);
}

function startAddDrop(numb, n, time) {
  n == 0 ? setInterval(() => {elem.firstElementChild.classList.add('gold-drop')}, 30000) : "";
  speedFallDrops = time;
  addDrop = n;
  gameWindow.prepend(drop.cloneNode(true));
  drops = document.querySelectorAll(".container-drops");
  drops[numb].f = fallDrops;
  drops[numb].g = generatingExpression;
  drops[numb].g();
  drops[numb].f();
  drops[numb].addEventListener("animationiteration", (e) => {
    elem === null ? (elem = drop) : (elem = elem.previousElementSibling);
    elem === null ? (elem = drop) : "";
    e.target.g();
    upSea(e.target);
  });
}

function addDlow(that) {
  let theseSmallDrops = that.querySelectorAll(`.drop-small`);
  for (let drop of theseSmallDrops) {
    drop.classList.toggle("scatter");
  }
  that.firstElementChild.classList.toggle("blow");
  count = 0;
}

function countTime(gameTimeFinish) {
  let gameTime = document.querySelector(".game-time");
  let equationsShown = document.querySelector(".equations-shown");
  let correctAnswers = document.querySelector(".correct-answers");
  let incorrectAnswers = document.querySelector(".incorrect-answers");
  let points = document.querySelector(".points");
  let yourScore = document.querySelector(".your-score");
  yourScore.textContent = counter.textContent;
  points.textContent = counter.textContent;
  correctAnswers.textContent = counterCorrectAnswers;
  incorrectAnswers.textContent = counterIncorrectAnswers;
  equationsShown.textContent = numberDrops;
  let seconds =
    Math.round(gameTimeFinish - gameTimeStart.getTime() / 1000) % 60;
  let minutes = Math.floor(
    Math.round(gameTimeFinish - gameTimeStart.getTime() / 1000) / 60
  );
  let hours = Math.floor(
    Math.round(gameTimeFinish - gameTimeStart.getTime() / 1000) / 60 / 60
  );
  seconds < 10 ? (seconds = "0" + seconds) : seconds;
  minutes < 10 ? (minutes = "0" + minutes) : minutes;
  hours < 10 ? (hours = "0" + hours) : hours;
  let elapsedTime = `${hours}:${minutes}:${seconds}`;
  gameTime.textContent = elapsedTime;
  statistics();
}

function statistics() {
  let score = counter.textContent;
  for (let i = 0; i < li.length; i++) {
    if (+li[i].textContent == 0 || +li[i].textContent <= score) {
      localStorage.setItem(`place${i}`, score);
      li[i].textContent = localStorage.getItem(`place${i}`);
      break;
    }
  }
}
for (let i = 0; i < li.length; i++) {
  li[i].textContent = localStorage.getItem(`place${i}`);
}
drops.forEach((drop) => {
  drop.addEventListener("animationiteration", (e) => {
    elem === null ? (elem = drop) : (elem = elem.previousElementSibling);
    elem === null ? (elem = drop) : "";
    e.target.g();
    upSea(e.target);
  });
});

function fallDrops(TranslateY = sea.offsetTop) {
  for (let drop of drops) {
    drop.firstElementChild.style.border = "none";
    drop.style.zIndex = "1";
  }
  elem.firstElementChild.style.border = "2px solid blue";
  elem.style.zIndex = "10";
  numberDrops++;
  let minTranslateX = 1;
  let maxTranslateX = gameWindow.clientWidth - 50;
  let randomTranslateX = Math.floor(Math.random() * (maxTranslateX - minTranslateX) + minTranslateX);
  this.style.setProperty("--translateX", randomTranslateX + "px");
  this.style.setProperty("--translateY", TranslateY + "px");
  let theseSmallDrops = this.querySelectorAll(`.drop-small`);
  for (let drop of theseSmallDrops) {
    drop.classList.remove("scatter");
  }
  this.firstElementChild.classList.remove("blow");
  this.style.animation = `drop  ${speedFallDrops}s infinite linear`;
  this.lastElementChild.addEventListener("transitionend", (e) => {
    fallingAgain(e.target);
  });
  this.g();
}


function fallingAgain(that) {
  let soundDrop = document.querySelector('.sound-drop');
  count++;
  if (count === 1) {
soundDrop.play();
    if (elem.firstElementChild.classList.contains('gold-drop')) {
      for (let drop of drops) {
        drop.style.animation = "none";
        drop.offsetHeight;
        drop.style.animation = `drop  ${speedFallDrops}s infinite linear`;
        drop.firstElementChild.classList.remove('gold-drop');
      }
    }
    elem === null ? (elem = drop) : (elem = elem.previousElementSibling);
    elem === null ? (elem = drop) : "";
    that.parentElement.f();
    that.parentElement.style.animation = "none";
    that.parentElement.offsetHeight;
    that.parentElement.style.animation = `drop  ${speedFallDrops}s infinite linear`;
  }
}

function generatingExpression() {
  let numberMin = +rangeNumberMin.value;
  let numberMax = +rangeNumberMax.value;
  let firstNumber = Math.floor(Math.random() * (numberMax - numberMin) + numberMin);
  let secondNumber = Math.floor(Math.random() * (numberMax - numberMin) + numberMin);
  let operators = {
    addition: `${firstNumber}+${secondNumber}`,
    subtraction: `${firstNumber}-${secondNumber}`,
    multiplication: `${firstNumber}*${secondNumber}`,
    division: `${firstNumber}/${secondNumber}`,
  };
  let arrayOperators = [];
  for (operator of operatorsSign){
     operator.classList.contains('active-operator')? arrayOperators.push(operator.dataset.operator): '';
  }
  let randomOperator = arrayOperators[Math.floor(Math.random() * arrayOperators.length)];
  switch (randomOperator) {
    case "+":
      this.firstElementChild.firstElementChild.textContent = operators.addition;
      this.firstElementChild.firstElementChild.resultExpression = firstNumber + secondNumber;
      break;
    case "-":
      if (firstNumber - secondNumber >= 0) {
        this.firstElementChild.firstElementChild.textContent = operators.subtraction;
        this.firstElementChild.firstElementChild.resultExpression =
          firstNumber - secondNumber;
      } else this.g();
      break;
    case "*":
      this.firstElementChild.firstElementChild.textContent = operators.multiplication;
      this.firstElementChild.firstElementChild.resultExpression = firstNumber * secondNumber;
      break;
    case "/":
      if ( firstNumber > secondNumber && (firstNumber / secondNumber).toString().indexOf(".") === -1
      ) {
        this.firstElementChild.firstElementChild.textContent = operators.division;
        this.firstElementChild.firstElementChild.resultExpression =
          firstNumber / secondNumber;
      } else this.g();
      break;
  }
}

function upSea(that) {
  let soundDrop = document.querySelector('.sound-drop');
  let block = document.querySelector(".block-result-statistics");
  soundDrop.play();
  counterInvalidResponse++;
  sea.style.top = parseInt(getComputedStyle(sea).top) - sea.clientHeight * 0.12 + "px";
  counter.textContent = +counter.textContent - plusScore;
  counter.textContent < 0 ? (counter.textContent = 0) : "";
  let TranslateY = parseInt(getComputedStyle(sea).top) - sea.clientHeight * 0.12;
  if (counterInvalidResponse === 3) {
    let gameTimeFinish = new Date();
    countTime(gameTimeFinish.getTime() / 1000);
    for (let drop of drops) {
      drop.style.animation = "none";
    }
    block.classList.add("end-game");
  } else {
    that.f(TranslateY);
  }
}


function updateGame() {
    let block = document.querySelector(".block-result-statistics");
  counter.textContent = 0;
  btnsStartGame.classList.toggle("hide");
  gameTimeStart = new Date();
  block.classList.remove("end-game");
  gameStatistics.classList.remove("active");
  sea.style.top = seaStyleTop + "px";
  setAnswer = "";
  counterCorrectAnswers = 0;
  counterIncorrectAnswers = 0;
  plusScore = 10;
  counterInvalidResponse = 0;
  speedFallDrops = 20;
  numberDrops = 0;
  addDrop = true;
  elem = drop;
  for( let i = 0;i < drops.length - 1; i++){
    drops[i].remove();
  }
}
function openGameMode(){
  let lines = document.querySelectorAll('.lines')
  let gameModeHeader = document.querySelector(".game-mode__header");
  gameModeHeader.classList.toggle('version-touch-screen-header');
  gameMode.classList.toggle('version-touch-screen-game-mode');
  gameModeExpand.classList.toggle('mobile-v');
lines[0].classList.toggle('mobile-v-line-one');
lines[1].classList.toggle('mobile-v-line-two');
  gameMode.addEventListener('mouseout' , ()=>{ 
    gameMode.classList.remove('version-touch-screen-game-mode');
    gameModeHeader.classList.remove('version-touch-screen-header');
    gameModeExpand.classList.remove('mobile-v');
    lines[0].classList.remove('mobile-v-line-one');
lines[1].classList.remove('mobile-v-line-two');
})
}

playAgain.addEventListener("click", updateGame);
btnContinue.addEventListener("click", () => {
    gameStatistics.classList.add("active");
  });
  
  for (let drop of drops) {
    drop.f = fallDrops;
    drop.g = generatingExpression;
    drop.g();
  }
  
  btnPlay.addEventListener("click", () => {
    let soundSea = document.querySelector('.sound-sea');
    soundSea.play();
    btnsStartGame.classList.add("hide");
    drop.f();
    gameTimeStart = new Date();
    btnPlay.blur();
  });

  howPlay.addEventListener("click", () => {
  
    let soundSea = document.querySelector('.sound-sea');
    soundSea.play();
    btnsStartGame.classList.add("hide");
    drop.f();
    gameTimeStart = new Date();
    automaticMode();
  });
   
  for (key of keys) {
    key.addEventListener("click", (e) => enterResponse(e.target));
  }
  window.addEventListener("keydown", (e) => {
    enterResponse(e.key);
  });
  gameModeExpand.addEventListener('click' ,openGameMode )
  for (operator of operatorsSign){
    operator.addEventListener('click', (e)=> {
      e.target.classList.toggle('active-operator');
    })
  }
  rangeNumberMax.addEventListener('input', ()=> rangeNumberMin.max = rangeNumberMax.value)