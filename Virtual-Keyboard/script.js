const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: document.querySelectorAll(".keyboard__key"),
  },
  textArea: {
    inputField: document.querySelector(".use-keyboard-input"),
    capslock: false,
  },
  init() {
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");
    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboard__keys");
    document.body.appendChild(this.elements.main);
    this.elements.main.appendChild(this.elements.keysContainer);
    Keyboard.createKeys();
  },
  createKeys() {
    const keyLayout = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      "done",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "space",
    ];
    keyLayout.forEach((key) => {
      const createIconHTML = (icon_name) => {
        return `<i class="material-icons">${icon_name}</i>`;
      };
      let nextRow = ["backspace", "p", "enter", "?"].includes(key);
      const keyElement = document.createElement("button");
      keyElement.classList.add("keyboard__key");
      this.elements.keysContainer.appendChild(keyElement);
      keyElement.textContent = key;
      if (nextRow) {
        this.elements.keysContainer.appendChild(document.createElement("br"));
      }
      switch (key) {
        case "backspace":
          keyElement.classList.add("key-active");
          keyElement.innerHTML = createIconHTML("backspace");
          keyElement.addEventListener("click", () => {
            this.textArea.inputField.value = this.textArea.inputField.value.slice(
              0,
              this.textArea.inputField.value.length - 1
            );
          });
          break;
        case "enter":
          keyElement.classList.add("key-active");
          keyElement.innerHTML = createIconHTML("keyboard_return");
          keyElement.addEventListener("click", () => {
            this.textArea.inputField.value += "\n";
          });
          break;
        case "space":
          keyElement.classList.add("key-space");
          keyElement.innerHTML = createIconHTML("space_bar");
          keyElement.addEventListener("click", () => {
            this.textArea.inputField.value += " ";
          });
          break;
        case "caps":
          keyElement.classList.add("key-active");
          keyElement.classList.add("upper-case-off");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          keyElement.addEventListener("click", () => {
            keyElement.classList.toggle("upper-case-on");
            this.toggleCapsLock();
            this.textArea.capslock = !this.textArea.capslock;
          });
          break;
        case "done":
          keyElement.classList.add("key-background");
          keyElement.addEventListener("click", () => {
            this.elements.main.classList.remove("keyboard-hidden");
          });
          keyElement.classList.add("key-active");
          keyElement.innerHTML = createIconHTML("check_circle");
          break;
        default:
          keyElement.addEventListener("click", () => {
            key = this.textArea.capslock
              ? key.toUpperCase()
              : key.toLowerCase();
            this.textArea.inputField.value += key;
          });
          break;
      }
      this.textArea.inputField.addEventListener("click", () =>
        this.elements.main.classList.add("keyboard-hidden")
      );
    });
  },
  toggleCapsLock() {
    let keys = document.querySelectorAll(".keyboard__key");
    for (key of keys) {
      key.classList.toggle("upper-case");
    }
  },
};
Keyboard.init();

