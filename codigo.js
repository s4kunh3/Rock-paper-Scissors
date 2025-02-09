const COLOR_WIN = 'rgb(189, 236, 182)';
const COLOR_LOSE = 'rgb(255, 105, 97)';
const COLOR_TIE = 'rgb(253, 253, 150)';
const COLOR_RESET = '#FAF3E0';

// Manejar la imagen del oponente
const oponent = document.getElementById("oponent");
const oponentImg = oponent.querySelector("img");
let index = 0;

const images = ['./images/piedra.png', './images/papel.png', './images/tijera.png'];

let isLooping = false;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startImageLoop(imgElement, imgArray) {
    isLooping = true;
    while (isLooping) {
        imgElement.src = imgArray[index];
        index = (index + 1) % imgArray.length;
        await delay(1000);
    }
}
// Funcion para parar el loop
function stopInterval() {
    isLooping = false;
}

// Funcion para reiniciar el loop
function startInterval() {
    if (!isLooping) {
        startImageLoop(oponentImg, images);
    }
}

//Manejar la imagen del jugador
const player = document.getElementById("player");
const playerImg = player.querySelector("img");

//Botones
const btnPiedra = document.getElementById("btnPiedra");
const btnPapel = document.getElementById("btnPapel");
const btnTijera = document.getElementById("btnTijera");

let punto = 1;
function actualizarPuntos(resultado) {
    const puntoElemento = document.getElementById(`punto${punto}`);
    if(resultado === 'win'){
        puntoElemento.classList.add('win');
    }
    else if(resultado === 'lose'){
        puntoElemento.classList.add('lose');
    }
    punto ++;
}

function reiniciarPuntos() {
    punto = 1;
    for (let i = 1; i <= 3; i++) {
        const puntoElemento = document.getElementById(`punto${i}`);
        if (puntoElemento){
            puntoElemento.className = 'punto';
        }
    }
}

btnPiedra.addEventListener("click", function() {
    playerImg.src = images[0];
});

btnPapel.addEventListener("click", function() {
    playerImg.src = images[1];
});

btnTijera.addEventListener("click", function() {
    playerImg.src = images[2];
});


//Manejar resultado
let btnConfirmar = document.getElementById("btnConfirmar");
let btnReiniciar = document.getElementById("btnReiniciar");

//Extraer color fondo
let body = document.querySelector("body");
let bodyColor = window.getComputedStyle(body).backgroundColor;

//Cambiar color fondo
function cambiarColorFondo(color) {
    body.style.backgroundColor = color;
    setTimeout(() => {
        body.style.backgroundColor = '#FAF3E0'
    }, 800);
}

var wins = 0;
var loses = 0;
var turnos = 3;

btnConfirmar.addEventListener("click", function () {
    let eleccionOponente = Math.floor(Math.random() * images.length);
    stopInterval();
    oponentImg.src = images[eleccionOponente];
    
    let playerChoice = playerImg.src;

    switch (true) {
        case playerChoice == '':
            actualizarPuntos('lose');
            turnos--;
            break;
        case playerChoice.includes('piedra.png') && oponentImg.src.includes('piedra.png'):
            // Empate
            cambiarColorFondo(COLOR_TIE);
            break;
        case playerChoice.includes('piedra.png') && oponentImg.src.includes('papel.png'):
            // Oponente gana
            loses++;
            actualizarPuntos('lose')            
            turnos--;
            break;
        case playerChoice.includes('piedra.png') && oponentImg.src.includes('tijera.png'):
            // Jugador gana
            wins++;
            actualizarPuntos('win')
            turnos--;
            break;
        case playerChoice.includes('papel.png') && oponentImg.src.includes('piedra.png'):
            // Jugador gana
            wins++;
            actualizarPuntos('win')
            turnos--;
            break;
        case playerChoice.includes('papel.png') && oponentImg.src.includes('papel.png'):
            // Empate
            cambiarColorFondo(COLOR_TIE); 
            break;
        case playerChoice.includes('papel.png') && oponentImg.src.includes('tijera.png'):
            // Oponente gana
            loses++;
            actualizarPuntos('lose') 
            turnos--
            break;
        case playerChoice.includes('tijera.png') && oponentImg.src.includes('piedra.png'):
            // Oponente gana
            loses++;
            actualizarPuntos('lose') 
            turnos--;
            break;
        case playerChoice.includes('tijera.png') && oponentImg.src.includes('papel.png'):
            // Jugador gana
            wins++;
            actualizarPuntos('win')
            turnos--;
            break;
        case playerChoice.includes('tijera.png') && oponentImg.src.includes('tijera.png'):
            // Empate
            cambiarColorFondo(COLOR_TIE); 
            break;
        default:
            actualizarPuntos('lose')
            break;
    }


    if (turnos === 0){
        if (wins > loses){
            cambiarColorFondo(COLOR_WIN);
        }
        else if (loses > wins){
            cambiarColorFondo(COLOR_LOSE);
        }
        btnConfirmar.style.display = 'none';
    }
});

btnReiniciar.addEventListener('click', function () {
    stopInterval();
    startInterval();
    reiniciarPuntos();
    cambiarColorFondo(COLOR_RESET);
    playerImg.src = '';
    btnConfirmar.style.display = 'block';
    turnos = 3;
    wins = 0;
    loses = 0;
});

