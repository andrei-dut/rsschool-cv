const canvas = document.querySelector('#draw');
const color = document.querySelector('.color');
const range = document.querySelector('.range');
const lineWidth = document.querySelector('.line-width');
const claerCanvas = document.querySelector('.clear-canvas');
const ctx = canvas.getContext('2d');
let lastX;
let lastY;
let isDrawing = false;
canvas.width =document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
ctx.strokeStyle = `${color.value}` 
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = `${range.value}`
lineWidth.style.background = `${color.value}`;
lineWidth.style.height = `${range.value}px`;
lineWidth.style.width = `${range.value}px`  

function draw(e){
    if(!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX , lastY);
    ctx.lineTo(e.offsetX , e.offsetY);
    ctx.stroke();
lastX = e.offsetX;
lastY = e.offsetY;
}
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('mouseup', () => isDrawing = false);
claerCanvas.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true
lastX = e.offsetX;
lastY = e.offsetY;
});
color.addEventListener('change', () =>{
    ctx.strokeStyle = `${color.value}` 
    lineWidth.style.background = `${color.value}`;
});
range.addEventListener('change', () => {
    ctx.lineWidth = `${range.value}`
    lineWidth.style.height = `${range.value}px`;
    lineWidth.style.width = `${range.value}px`
});




