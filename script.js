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
const botaoDecimal = document.querySelector(".botao-decimal");
const botaoSinal = document.querySelector(".botao-sinal");
const botaoPorcentagem = document.querySelector(".botao-porcentagem");

botoesNumero.forEach(button => {
    button.addEventListener("click", () => {
        // Substitui o valor inicial pelo primeiro valor clicado
        if (tela.textContent === '0') {
            tela.innerHTML = "";
        }
        // Se o operador foi selecionado, tira o primeiro numero da tela e insere o valor clicado
        if (isOperatorActive) {
            tela.innerHTML = "";
            isOperatorActive = false;
        }
        // Se o comprimento do numero for menor do que o suportado, ele eh adicionado ao valor atual
        if (tela.textContent.length < 11) { 
            tela.textContent = `${tela.textContent}${button.textContent}`;
        }
        // Continuar a conta qnd pressiona um operador apos o "=" 
        if (operator != null && isResultGiven) {
            isResultGiven = false;
        }
        // Pressionar o numero apos o "=", limpando TUDO
        if (isResultGiven && !isSequenceCalc) {
            limpar();
            tela.textContent = button.textContent;
        }
        // Continuar a conta sem a necessidade do "="
        if (isSequenceCalc) {
            tela.textContent = button.textContent;
            isSequenceCalc = false;
        }
        // Se nenhum operador foi pressionado, altera o primeiro numero da operacao
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
        // Se o operador for pressionado depois do "=", considera como sequencia
        if (isResultGiven) {
            isSequenceCalc = true;
        }
        // Se o segundo numero nao estiver definido, cancela a conta
        if (secondNumber === null) {
            operator = null;
            secondOperator = null;
        }
        // Se nao tem nenhum operador ativo, usa o primeiro, depois disso comeca a usar o segundo
        if (operator === null) {
            operator = button.textContent;
            isOperatorActive = true;
        } else {
            secondOperator = button.textContent;
            resultado = operate(firstNumber, operator, secondNumber);
            tela.textContent = formatarResultado(resultado);
            firstNumber = resultado;
            // Reseta o segundo operador
            operator = secondOperator;
            secondOperator = null;
            // Sempre que o segundo operador for usado, eh pq eh sequencia de conta
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
    // Se o botao for pressionado com algum dos valores indefinidos, nao faz nada
    if (firstNumber === null || operator === null || secondNumber === null) {
        return null;
    } else {
        let resultado = operate(firstNumber, operator, secondNumber);
        tela.textContent = formatarResultado(resultado);
        firstNumber = resultado;
        secondNumber = null;
        isResultGiven = true;
        // Reseta o operador
        operator = null;
    }
})

botaoDecimal.addEventListener("click", () => {
    if (isResultGiven) {
        isResultGiven = false;
    }
    
    if (!tela.textContent.includes(".")) {
        let formatado = formatarResultado(+tela.textContent);
        tela.textContent = `${formatado}.`
    }
})

botaoSinal.addEventListener("click", () => {
    tela.textContent = -tela.textContent;
    if (secondNumber === null) {
        firstNumber = +tela.textContent;
    } else {
        secondNumber = +tela.textContent;
    }
})

botaoPorcentagem.addEventListener("click", () => {
    tela.textContent = formatarResultado(tela.textContent * 0.01);
    if (secondNumber === null) {
        firstNumber = +tela.textContent;
    } else {
        secondNumber = +tela.textContent;
    }
})

function limpar() {
    // Reseta todos valores
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

function formatarResultado(num) {
    // Garante que o resultado nao tenha mais de 9 digitos
    num = String(num);
    if (num.length > 11) {
        num = num.slice(0, 11);
    }
    return +num;
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