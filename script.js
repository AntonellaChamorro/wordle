document.addEventListener('DOMContentLoaded', () => {
    const ideasBtn = document.getElementById('btn-modal');
    const popup = document.getElementById('popup'); // Obtener el contenedor del popup
    const popupWord = document.getElementById('popup-word'); // Obtener el elemento para mostrar la palabra en el popup
    const popupClose = document.querySelector('.contenedor label'); // Obtener el botón de cierre del popup

    let popupOpen = false; // Variable para rastrear si el popup está abierto

    ideasBtn.addEventListener('click', async () => {
        console.log('ingresa');
       try {
        // Verificar si el popup está cerrado
        if (!popupOpen) {
            const response = await fetch('https://random-word-api.herokuapp.com/word?lang=es');
            const data = await response.json();
           
            // Extraer la palabra aleatoria del array
            const word = data[0];
          
            // Mostrar la palabra aleatoria en el popup
            popupWord.textContent = `${word}`;

            // Actualizar el estado del popup a abierto
            popupOpen = true;
        }

        // Mostrar el popup
        popup.style.display = 'block';
        } catch (error) {
            console.error('Error al obtener la palabra aleatoria:', error);
        }
    });
    
    // Agregar un evento de clic al botón de cierre del popup para ocultar el popup
    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
        popupOpen = false;
    });

    // ----------***************----------

    const formulario = document.getElementById('miFormulario');

    formulario.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío del formulario

        const valorInput = document.getElementById('word-input').value;
        window.location.href = `juego.html?dato=${encodeURIComponent(valorInput)}`;
    });


        // Funcionalidad para el botón Aleatorio
        const aleatorioBtn = document.getElementById('aleatorio-btn');
        aleatorioBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('https://random-word-api.herokuapp.com/word?lang=es');
                const data = await response.json();
                
                // Extraer la palabra aleatoria del array
                const word = data[0];
                
                // Redirigir a juego.html con la palabra aleatoria como parámetro
                window.location.href = `juego.html?dato=${encodeURIComponent(word)}`;
            } catch (error) {
                console.error('Error al obtener la palabra aleatoria:', error);
            }
        });
    
});