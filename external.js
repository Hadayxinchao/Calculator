let operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "×": (a, b) => a * b,
    "÷": (a, b) => a / b,
}
function operate(){
    let split = screenLast.textContent.split(" ").slice(0, 3);
    let firstNumber = +split[0];
    let operator = split[1];
    let secondNumber = +split[2];
    return Math.round(operators[operator](firstNumber, secondNumber) * 10) / 10;
}
function addDigit(number){
    if (screenLast.textContent.slice(-1) in operators){
        screenCurrent.textContent = "0";
        screenLast.textContent += " ";
    }
    if (screenCurrent.textContent === "0"){
        screenCurrent.textContent = number;
    }
    else {
        screenCurrent.textContent += number;
    }
}

function addOperator(operator){
    if (screenLast.textContent.slice(-1) === " "){
        screenLast.textContent += `${screenCurrent.textContent} =`;
        screenCurrent.textContent = operate();
        screenLast.textContent = `${screenCurrent.textContent} ${operator}`;
    }
    if (screenLast.textContent.slice(-1) === "="){
        screenLast.textContent = `${screenCurrent.textContent} ${operator}`
    }
    
    screenLast.textContent = `${screenCurrent.textContent} ${operator}`
}

function printResult(){
    screenLast.textContent += `${screenCurrent.textContent} =`;
    screenCurrent.textContent = operate();
}

const numberBtn = document.querySelectorAll(".numberBtn")
const operatorBtn = document.querySelectorAll(".operatorBtn");
const equalBtn = document.querySelector("#equalBtn");
const dotBtn = document.querySelector("#dotBtn");
const screenLast = document.querySelector(".screen-last");
const screenCurrent = document.querySelector(".screen-current");
const clearBtn = document.querySelector(".clearBtn");
const deleteBtn = document.querySelector(".deleteBtn");

numberBtn.forEach(number => {
    number.addEventListener('click', () => {
        addDigit(number.textContent);
    });
})
dotBtn.addEventListener('click', () =>{
    if (screenCurrent.textContent.indexOf('.') === -1){
        screenCurrent.textContent += ".";
    }
})

operatorBtn.forEach(operator => {
    operator.addEventListener('click', () => {
        addOperator(operator.textContent);
    })
})

equalBtn.addEventListener('click', () => {
    printResult();
})

clearBtn.addEventListener('click', () => {
    screenLast.textContent = "";
    screenCurrent.textContent = "0";
})

deleteBtn.addEventListener('click', () => {
    screenCurrent.textContent = screenCurrent.textContent.slice(0, -1);
})

document.addEventListener("keydown", (e) => {
    if (e.key.match(/[0-9]/g)){
        addDigit(e.key);
    }
    else if (e.key in operators){
        addOperator(e.key);
    }
    else if (e.key === "*"){
        addOperator("×");
    }
    else if (e.key === "Enter"){
        printResult();
    }
})