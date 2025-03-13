let firstNumber = 0;
let secondNumber = null;
let operator = null;
let secondOperator = null;
let resultado = null;
let isResultGiven = false;
let isOperatorActive = false;
let isSequenceCalc = false;

const tela = document.querySelector(".tela");
const botoesNumero = document.querySelectorAll(".botao-numero");
const botoesOperacao = document.querySelectorAll(".botao-operacao");
const botaoLimpar = document.querySelector(".botao-clear");
const botaoResultado = document.querySelector(".botao-resultado");

botoesNumero.forEach(button => {
    button.addEventListener("click", () => {
        if (tela.textContent === '0') {
            tela.innerHTML = "";
        }
        if (isOperatorActive) {
            tela.innerHTML = "";
            isOperatorActive = false;
        }
        tela.textContent = `${tela.textContent}${button.textContent}`;
    
        if (operator != null && isResultGiven) {
            isResultGiven = false;
        }

        if (isResultGiven && !isSequenceCalc) {
            tela.textContent = button.textContent;
            limpar();
        }
    
        if (isSequenceCalc) {
            tela.textContent = button.textContent;
            isSequenceCalc = false;
        }
    
        if (operator === null) {
            firstNumber = +tela.textContent;
        } else {
            secondNumber = +tela.textContent;
        }
    })
})

botoesOperacao.forEach(button => {
    button.addEventListener("click", () => {
        if (isSequenceCalc) {
            tela.innerHTML = "";
        }

        if (isResultGiven) {
            isSequenceCalc = true;
        }

        if (operator === null) {
            operator = button.textContent;
            isOperatorActive = true;
        } else {
            secondOperator = button.textContent;
            resultado = operate(firstNumber, operator, secondNumber);
            tela.textContent = resultado;
            firstNumber = resultado;
            operator = secondOperator;
            secondOperator = null;
            isSequenceCalc = true;
            isOperatorActive = true;
        }
    })
})

botaoLimpar.addEventListener("click", () => {
    tela.innerHTML = '';
    limpar();
})

botaoResultado.addEventListener("click", () => {
    if (firstNumber === null || operator === null) {
        return null
    } else {
        let resultado = operate(firstNumber, operator, secondNumber);
        tela.textContent = resultado;
        firstNumber = resultado;
        isResultGiven = true;
        operator = null;
    }
})

function limpar() {
    firstNumber = null;
    operator = null;
    secondOperator = null;
    secondNumber = null;
    resultado = null;
    isSequenceCalc = false;
    isResultGiven = false;
    isOperatorActive = false;
    tela.textContent = '0';
}

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) {
        return "calma calabreso"
    }
    return a / b;
}
function operate(number1, op, number2) {
    switch (op) {
        case '+':
            return add(number1, number2);
        case '-':
            return subtract(number1, number2);       
        case 'X':
            return multiply(number1, number2);
        case '/':
            return divide(number1, number2)        
        default:
            return "ERROR!";
    }
}