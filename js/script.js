const words = {
    Fruta: ['melancia', 'jaca', 'jabuticaba', 'amora', 'caqui', 'cereja', 'framboesa', 'jambo', 'pitaya', 'roma', 'carambola', 'guarana', 'damasco', 'manga', 'pessego', 'abacaxi'],
    País: [ 'italia', 'moçambique', 'suiça', 'equador', 'peru', 'paraguai', 'ucrania', 'romenia', 'bulgaria', 'costa rica', 'inglaterra', 'nigeria', 'gana', 'marrocos', 'senegal', 'etiopia', 'uganda', 'madagascar', 'jamaica', 'camaroes', 'angola', 'tailandia', 'islandia' ],
    Animal: [ 'gato', 'cachorro', 'leão', 'tigre', 'macaco', 'cavalo', 'cobra', 'tartaruga', 'jacaré', 'girafa', 'lobo', 'cavalo', 'gato', 'cachorro', 'leão', 'tigre', 'macaco', 'cavalo', 'cobra', 'tartaruga', 'jacaré', 'girafa', 'lobo', 'anta', 'jaguar', 'puma',  'lince', 'javali', 'esperança', 'barata', 'grilo', 'girino'],
}

const category = Object.keys(words)[Math.floor(Math.random() * Object.keys(words).length)];

const secretWord = words[category][Math.floor(Math.random() * words[category].length)];

const rightLetters = [];
const wrongLetters = [];

document.addEventListener("keypress", (evento) => {
    const code = evento.key.toLowerCase; // alfabeto
    if (isLetra(code)) {
        const letter = evento.key.toLowerCase();
        if (wrongLetters.includes(letter) || rightLetters.includes(letter)) {
            showWarningRepeatedLetter();
        } else {
            if (secretWord.includes(letter)) {
                rightLetters.push(letter);
            } else {
                wrongLetters.push(letter);
            }
        }
        updateGame();
    }
});

function updateGame() {
    showWrongLetters();
    showRightLetters();
    showCategory();
    drawHangman();
    checkGameStatus();
}

function showCategory() {
    const div = document.querySelector('.category');
    div.innerHTML = `<h4>Categoria: ${category}</h4>`;
}

function showWrongLetters() {
    const div = document.querySelector(".wrong-letters");
    div.innerHTML = "<h5>Letras Erradas</h5>";
    wrongLetters.forEach((letter) => {
        div.innerHTML += `<span>${letter}</span>`;
    });
}

function showRightLetters() {
    const container = document.querySelector(".secret-word");
    container.innerHTML = "";
    secretWord.split("").forEach((letra) => {
        if (rightLetters.includes(letra)) {
            container.innerHTML += `<span>${letra}</span>`;
        } else {
            container.innerHTML += letra !== " " ? `<span>_</span>` : `<span> </span>`;
        }
    });
}

function checkGameStatus() {
    let message = "";
    const container = document.querySelector(".secret-word");
    const partesCorpo = document.querySelectorAll(".body-parts");

    if (wrongLetters.length === partesCorpo.length) {
        message = "Você perdeu!<br>";
        message += 'A palavra era: "' + secretWord + '"';
    }

    if (secretWord === container.innerText) {
        message = "Você ganhou!";
    }

    if (message) {
        document.querySelector("#message").innerHTML = message;
        document.querySelector(".popup-container").style.display = "flex";
    }
}

function drawHangman() {
    const partesCorpo = document.querySelectorAll(".body-parts");
    for (let i = 0; i < wrongLetters.length; i++) {
        partesCorpo[i].style.display = "block";
    }
}

function showWarningRepeatedLetter() {
    const aviso = document.querySelector(".repeated-letter");
    aviso.classList.add("show");
    setTimeout(() => {
        aviso.classList.remove("show");
    }, 4000);
}

function isLetra(codigo) {
    return codigo >= 'A' && codigo <= 'z';
}

function reiniciarJogo() {
    window.location.reload();
    
}