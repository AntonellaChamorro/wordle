let currentRow = 0;  // Para rastrear la fila actual
let wordToGuess = "";  // Para almacenar la palabra a adivinar

function initBoard(dato) {
    let board = document.getElementById("tablero");

    // Verificar si se ha recibido el parámetro 'dato'
    if (dato) {
        wordToGuess = dato;
        // Obtener la longitud de la cadena 'dato'
        let datoLength = dato.length;

        for (let i = 0; i < 5; i++) {
            let row = document.createElement("div");
            row.className = "fila";

            for (let j = 0; j < datoLength; j++) {
                let box = document.createElement("div");
                box.className = "box";
                row.appendChild(box);
            }

            board.appendChild(row);
        }
    } else {
        console.error("No se ha recibido ningún dato.");
    }
}

function handleKeyPress(event) {
    const rows = document.querySelectorAll(".fila");
    if (currentRow >= rows.length) {
        return;  // No hacer nada si estamos fuera del límite de filas
    }

    const currentBoxes = rows[currentRow].querySelectorAll(".box");
    const key = event.key;

    // Asegurarse de que solo las letras (a-z) se manejen
    if (key.length === 1 && key.match(/[a-z]/i)) {
        for (let box of currentBoxes) {
            if (box.textContent === "") {
                box.textContent = key;
                break;
            }
        }
    }

    // Verificar si se ha presionado Enter
    if (key === 'Enter') {
        let currentWord = Array.from(currentBoxes).map(box => box.textContent).join("");
        if (currentWord.length === wordToGuess.length) {
            // Colorear los cuadros
            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i].toLowerCase() === wordToGuess[i].toLowerCase()) {
                    currentBoxes[i].style.backgroundColor = 'green';
                } else if (wordToGuess.toLowerCase().includes(currentWord[i].toLowerCase())) {
                    currentBoxes[i].style.backgroundColor = 'yellow';
                } else {
                    currentBoxes[i].style.backgroundColor = 'gray';
                }
            }

            if (currentWord.toLowerCase() === wordToGuess.toLowerCase()) {
                //alert("¡Correcto! Has adivinado la palabra.");
                return;  // Detener la ejecución si la palabra es correcta
            } else if (currentRow < rows.length - 1) {
                currentRow++;
            } else {
                alert("Has alcanzado el límite de intentos.");
            }
        }
    }
}

// Obtener el parámetro 'dato' de la URL y llamar a initBoard
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const dato = urlParams.get('dato');

    // Imprimir el dato en la consola
    console.log('Dato recibido:', dato);

    // Llamar a la función initBoard con el dato recibido
    initBoard(dato);

    // Agregar un evento de teclado para manejar la entrada de letras
    document.addEventListener('keypress', handleKeyPress);
});
