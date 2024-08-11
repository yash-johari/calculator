let expression = '';
let currentInput = '0';
let resultDisplayed = false;
let result = null;

function updateDisplay() {
    document.getElementById('expression').innerText = expression;
    document.getElementById('result').innerText = currentInput;
}

function clearAll() {
    expression = '';
    currentInput = '0';
    result = null;
    updateDisplay();
}

function clearEntry() {
    currentInput = '0';
    updateDisplay();
}

function inputDigit(digit) {
    if (resultDisplayed) {
        currentInput = String(digit);
        resultDisplayed = false;
    } else {
        if (currentInput === '0') {
            currentInput = String(digit);
        } else {
            currentInput = currentInput + digit;
        }   
    }
    updateDisplay();
}

function inputDecimal() {
    if (!currentInput.includes('.')) {
        currentInput = currentInput + '.';
    }
    updateDisplay();
}

function inputOperator(operator) {
    if (resultDisplayed) {
        expression = result + ' ' + operator + ' ';
        resultDisplayed = false;
    } else {
        if (currentInput !== '') {
            expression += currentInput + ' ' + operator + ' ';
        } else if (expression.length > 0 && isOperator(expression.slice(-2, -1))) {
            expression = expression.slice(0, -2) + operator + ' ';
        }
    }
    currentInput = '';
    updateDisplay();
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

function calculateResult() {
    try {
        if (currentInput === '') {
            currentInput = result;
        }
        expression += currentInput;
        result = String(eval(expression));
        currentInput = result;
        expression = '';
        resultDisplayed = true;
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
    }
}

// Key press handling
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        inputDigit(key);
    } else if (key === '.') {
        inputDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        inputOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Backspace') {
        clearEntry(); // Clear the last entry
    } else if (key.toLowerCase() === 'a') {
        clearAll(); // Clear all
    }
});