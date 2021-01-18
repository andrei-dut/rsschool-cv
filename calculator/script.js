const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearBtns = document.querySelectorAll(".clear-btn");
const dotBtn = document.querySelector(".dot");
const display = document.querySelector(".display");
let memoryCurrentNumber = 0,
  memoryNewNumber = false,
  memoryPendingOperation = "";

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function (e) {
    numberPress(e.target.innerText);
  });
}

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", function (e) {
    operations(e.target.innerText);
  });
}

for (let i = 0; i < clearBtns.length; i++) {
  clearBtns[i].addEventListener("click", function (e) {
    clear(e.target.id);
  });
}
dotBtn.addEventListener("click", dot);

function numberPress(number) {
  if (memoryNewNumber) {
    display.value = number;
    memoryNewNumber = false;
  } else {
    if (display.value === "0") {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operations(operator) {
  let localOperationMemory = display.value;
  if (memoryNewNumber && memoryPendingOperation !== "=") {
    display.value = memoryCurrentNumber;
  } else {
    memoryNewNumber = true;
    if (memoryPendingOperation === "+") {
      memoryCurrentNumber += +localOperationMemory;
    } else if (memoryPendingOperation === "-") {
      memoryCurrentNumber -= +localOperationMemory;
    } else if (memoryPendingOperation === "*") {
      memoryCurrentNumber *= +localOperationMemory;
    } else if (memoryPendingOperation === "/") {
      memoryCurrentNumber /= +localOperationMemory;
    } else {
      memoryCurrentNumber = +localOperationMemory;
    }
    display.value = memoryCurrentNumber;
    memoryPendingOperation = operator;
  }
}

function dot() {
  let localDecimalMemory = display.value;

  if (memoryNewNumber) {
    localDecimalMemory = "0.";
    memoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf(".") === -1) {
      localDecimalMemory += ".";
    }
  }
  display.value = localDecimalMemory;
}

function clear(clearId) {
  if (clearId === "ce") {
    display.value = "0";
    memoryNewNumber = true;
  } else {
    memoryNewNumber = true;
    memoryCurrentNumber = 0;
    memoryPendingOperation = "";
    display.value = "0";
  }
}
