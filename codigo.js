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
function changeBodyColor(color) {
    body.style.backgroundColor = color;
}

console.log(bodyColor)

//TODO manejar cundo se presiona mas de una vez
btnReiniciar.addEventListener("click", function() {
    startInterval();
    playerImg.src= ''
    changeBodyColor('rgb(250, 243, 224)');
});

btnConfirmar.addEventListener("click", function () {
    let eleccionOponente = Math.floor(Math.random() * images.length);
    stopInterval();
    oponentImg.src = images[eleccionOponente];
    

    let playerChoice = playerImg.src;

    switch (true) {
        case playerChoice == '':
            changeBodyColor('rgb(255, 105, 97)')
            break;
        case playerChoice.includes('piedra.png') && oponentImg.src.includes('piedra.png'):
            // Empate
            changeBodyColor('rgb(253, 253, 150)');
            break;
        case playerChoice.includes('piedra.png') && oponentImg.src.includes('papel.png'):
            // Oponente gana
            changeBodyColor('rgb(255, 105, 97)');
            break;
        case playerChoice.includes('piedra.png') && oponentImg.src.includes('tijera.png'):
            // Jugador gana
            changeBodyColor('rgb(180, 211, 178)');
            break;
        case playerChoice.includes('papel.png') && oponentImg.src.includes('piedra.png'):
            // Jugador gana
            changeBodyColor('rgb(180, 211, 178)');
            break;
        case playerChoice.includes('papel.png') && oponentImg.src.includes('papel.png'):
            // Empate
            changeBodyColor('rgb(253, 253, 150)'); 
            break;
        case playerChoice.includes('papel.png') && oponentImg.src.includes('tijera.png'):
            // Oponente gana
            changeBodyColor('rgb(255, 105, 97)'); 
            break;
        case playerChoice.includes('tijera.png') && oponentImg.src.includes('piedra.png'):
            // Oponente gana
            changeBodyColor('rgb(255, 105, 97)'); 
            break;
        case playerChoice.includes('tijera.png') && oponentImg.src.includes('papel.png'):
            // Jugador gana
            changeBodyColor('rgb(180, 211, 178)');
            break;
        case playerChoice.includes('tijera.png') && oponentImg.src.includes('tijera.png'):
            // Empate
            changeBodyColor('rgb(253, 253, 150)'); 
            break;
        default:
            changeBodyColor('rgb(255, 105, 97)');
            break;
    }
});