'use strict';
const display = document.querySelector('.display');
const numbers = document.querySelectorAll('[id*=key]');
const operators = document.querySelectorAll('[id*=Operator]');

let numberAfterOperator = true;
let operatorInMemory;
let previousNumberInMemory;

const updateDisplay = (text) => {
    if (numberAfterOperator) {
        display.textContent = text.toLocaleString('BR');
        numberAfterOperator = false;
    } else {
        display.textContent += text.toLocaleString('BR');
    }
}

// insert number on display
const insertNumber = (event) => updateDisplay(event.target.textContent);
numbers.forEach(num => num.addEventListener('click', insertNumber));

const selectOperator = (event) => {
    if (!numberAfterOperator) {
        calculate();
        numberAfterOperator = true;
        operatorInMemory = event.target.textContent;
        previousNumberInMemory = parseFloat(display.textContent.replace(',', '.'));
    }
}

operators.forEach(operator => operator.addEventListener('click', selectOperator));

const pendingOperation = () => operatorInMemory !== undefined;
const calculate = () => {
    if (pendingOperation()) {
        const currentNumber = parseFloat(display.textContent.replace(',', '.'));
        numberAfterOperator = true;
        if (operatorInMemory === '+') {
            updateDisplay(previousNumberInMemory + currentNumber);
        }
        else if (operatorInMemory === '-') {
            updateDisplay(previousNumberInMemory - currentNumber);
        }
        else if (operatorInMemory === '*') {
            updateDisplay(previousNumberInMemory * currentNumber);
        }
        else if (operatorInMemory === '/') {
            updateDisplay(previousNumberInMemory / currentNumber);
        }
    }
}

const activeEquals = () => {
    calculate();
    operatorInMemory = undefined;
}
document.getElementById('Equals').addEventListener('click', activeEquals);

const clearDisplay = () => display.textContent = '';
document.getElementById('clearDisplay').addEventListener('click', clearDisplay);

const clearCalculus = () => {
    clearDisplay();
    operatorInMemory = undefined;
    numberAfterOperator = true;
    previousNumberInMemory = undefined;
}
document.getElementById('clearCalculus').addEventListener('click', clearCalculus);

const removeLastNumber = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removeLastNumber);

const toNegativeNumber = () => {
    numberAfterOperator = true;
    updateDisplay(display.textContent * -1);
}
document.getElementById('negativeNumber').addEventListener('click', toNegativeNumber);

const existDecimal = () => display.textContent.indexOf(',') !== -1;
const existValue = () => display.textContent.length > 0;
const insertDecimal = () => {
    if (!existDecimal()) {
        if (existValue()) {
            updateDisplay(',');
        } else {
            updateDisplay('0,');
        }
    }
};
document.getElementById('decimal').addEventListener('click', insertDecimal);

const mapingKeyboard = {
    '0': 'key0',
    '1': 'key1',
    '2': 'key2',
    '3': 'key3',
    '4': 'key4',
    '5': 'key5',
    '6': 'key6',
    '7': 'key7',
    '8': 'key8',
    '9': 'key9',
    '/': 'divisionOperator',
    '*': 'multiplicationOperator',
    '-': 'subtractOperator',
    '+': 'plusOperator',
    '?': 'negativeNumber',
    ',': 'decimal',
    'Delete': 'clearCalculus',
    'c': 'clearDisplay',
    'Backspace': 'backspace',
    'Enter': 'Equals',
    '=': 'Equals',
}

const keyboardClick = (event) => {
    const key = event.key;
    const isKey = () => Object.keys(mapingKeyboard).indexOf(key) !== -1;
    if (isKey()) {
        document.getElementById(mapingKeyboard[key]).click();
    }
}

document.addEventListener('keydown', keyboardClick);