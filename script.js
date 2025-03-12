let firstNumber = 0;
let secondNumber = null;
let operator = null;
let secondOperator = null;
let resultado = null;
let conta = [];

const tela = document.querySelector(".tela");
const botoesNumero = document.querySelectorAll(".botao-numero");
const botoesOperacao = document.querySelectorAll(".botao-operacao");
const botaoLimpar = document.querySelector(".botao-clear");
const botaoResultado = document.querySelector(".botao-resultado");

botoesNumero.forEach(button => {
    button.addEventListener("click", () => {
        tela.textContent = `${tela.textContent}${button.textContent}`;
        if (conta.includes("calculado")) {
            tela.textContent = button.textContent;
            limpar();
        }
        if (conta.includes("continuado")) {
            tela.textContent = button.textContent;
            conta.splice(0);
            conta.push(firstNumber);
        }

        if (conta.includes(firstNumber)) {
            secondNumber = +tela.textContent;
            console.log({secondNumber});
        } else {
            firstNumber = +tela.textContent;
            console.log({firstNumber});
        }
    })
})

botoesOperacao.forEach(button => {
    button.addEventListener("click", () => {
        if (operator === null) {
            operator = button.textContent;
        } else {
            secondOperator = button.textContent;
        }
        
        tela.innerHTML = '';
        
        if (conta.length >= 3) {
            conta.splice(0);
            conta.push(firstNumber);
        }

        if (conta.length === 1) {
            resultado = operate(firstNumber, operator, secondNumber);
            tela.textContent = resultado;
            firstNumber = resultado;
            conta.push("continuado");
            conta.push(resultado);
        }

        if (!conta.includes(firstNumber)) {
            conta.push(firstNumber);
        }

        console.log({operator});
        console.log({secondOperator});
    })
})

botaoLimpar.addEventListener("click", () => {
    tela.innerHTML = '';
    limpar();
})

botaoResultado.addEventListener("click", () => {
    let resultado = operate(firstNumber, operator, secondNumber);
    tela.textContent = resultado;
    firstNumber = resultado;
    conta.push("calculado");
    conta.push(resultado);
})

function limpar() {
    firstNumber = null;
    operator = null;
    secondOperator = null;
    secondNumber = null;
    conta = [];
    resultado = null;
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