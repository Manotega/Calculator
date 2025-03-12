let firstNumber = 0;
let operator = '';
let secondNumber = 0;
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

        if (conta.includes(firstNumber)) {
            tela.innerHTML - '';
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
        operator = button.textContent;
        conta.push(firstNumber);
        tela.innerHTML = '';
        console.log({operator});
    })
})

botaoLimpar.addEventListener("click", () => {
    tela.innerHTML = '';
    limpar()
})

botaoResultado.addEventListener("click", () => {
    tela.textContent = operate(firstNumber, operator, secondNumber);
    firstNumber = operate(firstNumber, operator, secondNumber);
    conta.push("calculado");
})

function limpar() {
    firstNumber = 0;
    operator = '';
    secondNumber = 0;
    conta = [];
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