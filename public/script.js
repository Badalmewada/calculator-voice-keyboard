// making calculator using the javascript
let display = document.getElementById('display-box');
let currentNumber = '';
let previousNumber = '';
let operator = '';
let fullExpression = "";

const micBtn = document.getElementById('btn-18');
if(micBtn){

    micBtn.addEventListener('click', () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
    recognition.start();
    
    recognition.onresult = (event) => {
        const speech = event.results[0][0].transcript.toLowerCase();
        handleVoiceInput(speech);
    }
})
}else{
    console.error("Mic button not found");
}

function handleVoiceInput(speech){
    const map = {
         "zero": "0",
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
    "plus": "+",
    "minus": "-",
    "times": "*",
    "multiply": "*",
    "divide": "/",
    "by": "/",
    "equals": "=",
    "equal": "=",
    "clear": "c"
    };

    const words = speech.split(" ");

    words.forEach(word => {
        const key = map[word];
        if(key) {
            simulateButtonClick(key);
        }
    });
}

function adjustFontSize(){
    let fontSize = 48;
    display.style.fontSize = fontSize + 'px';
    while(display.scrollWidth > display.clientWidth && fontSize > 16){
        fontSize--;
        display.style.fontSize = fontSize + 'px';
    }
}

function handleNumberClick(number){
    currentNumber += number;
    fullExpression += number;
    display.innerText = fullExpression;
    adjustFontSize();

}

function handleOperatorClick(op){
    if(currentNumber === '') return;
    operator = op;
    previousNumber = parseFloat(currentNumber);
    fullExpression += ' '+ operator+ ' ';
    currentNumber = '';
    display.innerText = fullExpression;
    adjustFontSize();
}

function calculateResult(){
    let result;
    switch(operator){
        case '+': result = previousNumber + parseFloat(currentNumber); break;
        case '-': result = previousNumber - parseFloat(currentNumber); break;
        case '*': result = previousNumber * parseFloat(currentNumber); break;
        case '/': result = previousNumber / parseFloat(currentNumber); break;
        case '%': result = previousNumber % parseFloat(currentNumber); break;
    }

    display.innerText = result;
    adjustFontSize();
    currentNumber = result.toString();
    fullExpression = '';
}

//add event listener for the numbers
document.getElementById('btn-0').addEventListener('click', ()=> handleNumberClick('0'));
document.getElementById('btn-1').addEventListener('click', ()=> handleNumberClick('1'));
document.getElementById('btn-2').addEventListener('click', ()=> handleNumberClick('2'));
document.getElementById('btn-3').addEventListener('click', ()=> handleNumberClick('3'));
document.getElementById('btn-4').addEventListener('click', ()=> handleNumberClick('4'));
document.getElementById('btn-5').addEventListener('click', ()=> handleNumberClick('5'));
document.getElementById('btn-6').addEventListener('click', ()=> handleNumberClick('6'));
document.getElementById('btn-7').addEventListener('click', ()=> handleNumberClick('7'));
document.getElementById('btn-8').addEventListener('click', ()=> handleNumberClick('8'));
document.getElementById('btn-9').addEventListener('click', ()=> handleNumberClick('9'));

//add event listener for the operators
document.getElementById('btn-10').addEventListener('click', () => handleOperatorClick('+'));
document.getElementById('btn-11').addEventListener('click', () => handleOperatorClick('-'));
document.getElementById('btn-12').addEventListener('click', () => handleOperatorClick('/'));
document.getElementById('btn-13').addEventListener('click', () => handleOperatorClick('*'));
document.getElementById('btn-14').addEventListener('click', () => handleOperatorClick('%'));

document.getElementById('btn-15').addEventListener('click', () => handleNumberClick('.'));
document.getElementById('btn-16').addEventListener('click', () => {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    fullExpression = '';
    display.textContent = '';
    adjustFontSize();
});
document.getElementById('btn-17').addEventListener('click', calculateResult);


document.addEventListener("keydown", (event) => {
    const key = event.key;

    //match key number
    if(!isNaN(key) || "+-*/.=C".includes(key)){
        simulateButtonClick(key);
    }
});

function simulateButtonClick(key){
    const button = document.querySelector(`[data-key="${key}"]`);
    if(button){
        button.click();
    }

}



