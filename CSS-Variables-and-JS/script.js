const inputs = document.querySelectorAll("input");
const imgMain = document.querySelector(".images__main img");
const imgChoice = document.querySelectorAll(".images__choice img");
inputs.forEach(input => input.addEventListener("change", inputUpdate));
inputs.forEach(input => input.addEventListener("mousemove", inputUpdate));
function inputUpdate(){
    let suffix = this.dataset.sizing || "";
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    console.log(this.value + suffix)
}
imgChoice.forEach(img => img.addEventListener("click", replaceImg));
function replaceImg(){
imgMain.src = this.src;
}