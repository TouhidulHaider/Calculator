const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentNumber = '0';
let previousNumber = null;
let operator = null;
let displayString = '0';
let justCalculated = false;

function updateDisplay(value) {
    display.textContent = value;
}

function handleNumberClick(number) {
    if (currentNumber === '0' || justCalculated) {
        currentNumber = number; 
        displayString = number;
        justCalculated = false;
    } else {
        currentNumber += number; 
        displayString += number;
    }
    updateDisplay(displayString);
}

function handleOperatorClick(op) {
    if (operator && previousNumber !== null && !justCalculated) {
        calculate();
        displayString = currentNumber + op;
    } else {
        displayString = currentNumber + op;
    }
    previousNumber = currentNumber;
    operator = op;
    currentNumber = '0';
    justCalculated = false;
    updateDisplay(displayString);
}

function handleEqualsClick() {
    if (operator) {
        calculate();
        operator = null;
        justCalculated = true;
        displayString = currentNumber;
        updateDisplay(displayString);
    }
}

function handleClearClick() {
    currentNumber = '0';
    previousNumber = null;
    operator = null;
    displayString = '0';
    justCalculated = false;
    updateDisplay(displayString);
}

function calculate() {
    let result = 0;
    const prev = parseFloat(previousNumber);
    const curr = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case 'x':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                result = 'Infinity';
            } else {
                result = prev / curr;
            }
            break;
        default:
            return;
    }
    currentNumber = String(result);
    previousNumber = null;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        if (buttonText >= '0' && buttonText <= '9') {
            handleNumberClick(buttonText);
        } else if (['+', '-', 'x', '/'].includes(buttonText)) {
            handleOperatorClick(buttonText);
        } else if (buttonText === '=') {
            handleEqualsClick();
        } else if (buttonText === 'C') {
            handleClearClick();
        }
    });
});