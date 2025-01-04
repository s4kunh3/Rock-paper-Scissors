/*
Pasos:

Obtener el input del jugador (piedra papel o tijera)

Mostrar el input en id "player" 
*/

// Manejar la imagen del oponente
let oponent = document.getElementById("oponent");
let oponentImg = oponent.querySelector("img");
let index = 0;

let images = ['./images/piedra.png','./images/papel.png','images/tijera.png'];

// Loop de imagenes del oponente
let intervalo = setInterval(function() {
    oponentImg.src = images[index];
    index = (index + 1) % images.length;
}, 1000)

// Funcion para parar el loop
function stopInterval() {
    clearInterval(intervalo);
}

// Funcion para reiniciar el loop
function startInterval() {
    intervalo = setInterval(function() {
        oponentImg.src = images[index];
        index = (index + 1) % images.length;
    }, 1000);
}

//Manejar la imagen del jugador
let player = document.getElementById("player");
let playerImg = player.querySelector("img");

//Botones
let btnPiedra = document.getElementById("btnPiedra");
let btnPapel = document.getElementById("btnPapel");
let btnTijera = document.getElementById("btnTijera");

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
            cambiarColorFondo('rgb(253, 253, 150)');
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
            cambiarColorFondo('rgb(253, 253, 150)'); 
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
            cambiarColorFondo('rgb(253, 253, 150)'); 
            break;
        default:
            actualizarPuntos('lose')
            break;
    }

    if (turnos === 0 && wins > loses) {
    cambiarColorFondo('rgb(189, 236, 182)'); 
    btnConfirmar.style.display = 'none';
    }
    if (turnos === 0 && loses > wins) {
        cambiarColorFondo('rgb(255, 105, 97)');
        btnConfirmar.style.display = 'none';
}
});

btnReiniciar.addEventListener('click', function () {
    reiniciarPuntos();
    cambiarColorFondo('#FAF3E0');
    startInterval();
    playerImg.src = ''
    btnConfirmar.style.display = 'block';
    turnos = 3;
    wins = 0;
    loses = 0;
});

