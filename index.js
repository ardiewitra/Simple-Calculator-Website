const displayHistory = document.querySelector(".display-history");
const displayInput = document.querySelector(".display-input");
const displayTemp = document.querySelector(".display-temp");

const number = document.querySelectorAll(".number");
const operation = document.querySelectorAll(".operation");

const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const entityClear = document.querySelector(".entity-clear")

let disHistory = "";
let disInput = "";
let disTemp = "";
let lastOperation = "";
let haveDot = false;

number.forEach((number) => {
    number.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !haveDot) {
            if (!disInput){
                return;
            } else {
                haveDot = true;
            }
        } else if (e.target.innerText === "." && haveDot) {
            return;
        } 
        disInput += e.target.innerText;
        displayInput.innerText = disInput;
    });
});

operation.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        if (!disInput) return;
        haveDot = false;
        const operationName = e.target.innerText;

        if (disHistory && disInput && lastOperation) {
            mathOperation();
        } else {
            disTemp = parseFloat(disInput);
        }
        clearVar(operationName);
        lastOperation = operationName;
    });
});

equal.addEventListener("click", () => {
    if (!disHistory || !disInput) return;
    haveDot = false;
    mathOperation();
    clearVar();
    displayInput.innerText = disTemp;
    displayTemp.innerText = "";
    disInput = disTemp;
    disHistory = "";
});

clear.addEventListener("click", () => {
    disHistory = "";
    disInput = "";
    disTemp = "";
    haveDot = false;
    displayHistory.innerText = "";
    displayInput.innerText = "";
    displayTemp.innerText = "";
    lastOperation = "";
});

entityClear.addEventListener("click", () => {
    displayInput.innerText = "";
    disInput = "";
});

window.addEventListener("keydown", (e) => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9"
    ) {
        clickNumber(e.key);
    } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%" ) {
        clickOperation(e.key);
    } else if (e.key === "*") {
        clickOperation("X");
    } else if (e.key === "=" || e.key === "Enter") {
        clickEqual();
    } else if (e.key === "Backspace") {
        clickClearEntity();
    } else if (e.key === "Delete") {
        clickClear();
    }
});

function clearVar (name = "") {
    disHistory += disInput + " " + name + " ";
    displayHistory.innerText = disHistory;
    displayInput.innerText = "";
    disInput = "";
    displayTemp.innerText = disTemp; 
}

function mathOperation () {
    if (lastOperation === "X") {
        disTemp = parseFloat(disTemp) * parseFloat(disInput);
    } else if (lastOperation === "+") {
        disTemp = parseFloat(disTemp) + parseFloat(disInput);
    } else if (lastOperation === "-") {
        disTemp = parseFloat(disTemp) - parseFloat(disInput);
    } else if (lastOperation === "/") {
        disTemp = parseFloat(disTemp) / parseFloat(disInput);
    } else if (lastOperation === "%") {
        disTemp = parseFloat(disTemp) % parseFloat(disInput);
    }
}

function clickNumber(key) {
    number.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    });
}

function clickOperation(key) {
    operation.forEach((operation) => {
        if (operation.innerText === key) {
            operation.click();
        }
    });
}

function clickEqual() {
    equal.click();
}

function clickClear() {
    clear.click();
}

function clickClearEntity() {
    entityClear.click();
}