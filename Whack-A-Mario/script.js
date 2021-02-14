const mario = document.querySelectorAll('.game__mario');
const btnStart = document.querySelector('.start-game');
const result = document.querySelector('.result');
const record = document.querySelector('.record');
const level = document.querySelector('.level');
let lastMario;
let start = false;
let click = 0;
let endGame = 10;
record.textContent = localStorage.getItem('record');
btnStart.addEventListener('click', lookOut);
function appearenceMario(){
    const idx = Math.floor(Math.random() * mario.length);
    const mar =mario[idx];
    if(lastMario === mar){
        return appearenceMario();
    }
  lastMario = mar;
    return mar;
}
function lookOut(){
    start = false;
    let time = increaseLevel();
    const mar = appearenceMario();
    mar.classList.add('up');
    endGame--;
    finishGame()
    setTimeout(() => {
        mar.classList.remove('up');
       if(!start) lookOut();
    }, time);
     
}
mario.forEach(mar => mar.addEventListener('click', clickMario));

function clickMario(){
   endGame += 1;
    click++;
    result.textContent = `${click}`;
}
function finishGame(){
    if (endGame === 0){
        level.textContent = '0';
        start = true;
        endGame = 10;
        localStorage.setItem('record', click);
        record.textContent = localStorage.getItem('record');
        click = 0;
        result.textContent = `${click}`;
    }

}

function increaseLevel(){
    
   if( click >= 60){
    level.textContent = '0';
        start = true;
    }
    else if( click >= 50){
        level.textContent = '7';
        return 350;
    }
  else  if( click >= 30){
    level.textContent = '6';
    return 500;
}
else if( click >= 25){
    level.textContent = '5';
    return 700;
}
else if( click >= 15){
    level.textContent = '4';
    return 850;
}
else if( click >= 10){
    level.textContent = '3';
    return 1000;
}
else if( click >= 5){
    level.textContent = '2';
    return 1200;
   
    }
else{
    level.textContent = '1';
    return 1400;
    
}    
}



