const display = document.querySelector('.display'); 
const buttons = document.querySelectorAll('button'); 

let currentNumber = '0';  
let previousNumber = null; 
let operator = null;   
let displayString = '0';  
let justCalculated = false;  // Flag for when a calculation was just done


function updateDisplay(value) {
    display.textContent = value;  
}

function handleNumberClick(number) {
    if (currentNumber === '0' || justCalculated) {
        justCalculated = false;  
    } else {
        currentNumber += number;    
        displayString += number; 
    }
    updateDisplay(displayString);
}

function handleOperatorClick(op) {
    if (operator && previousNumber !== null && !justCalculated) {
        calculate();   // Calculate if there's a previous operation
        displayString = currentNumber + op; 
    }
    else if (previousNumber === null){
         displayString = currentNumber + op;
    }
    else{
        displayString += op;
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
        updateDisplay(currentNumber);  
        displayString = currentNumber;
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

// Function to perform the calculation
function calculate() {
    let result = 0;
    const prev = parseFloat(previousNumber);  
    const curr = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(curr)) return;  // Exit if not valid numbers

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
            // Handle division by zero
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

// Add event listeners to all buttons
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
