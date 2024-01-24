// Funcion de popup de victoria y reinicio del juego.
function mensajeVictoria(reiniciarJuego) {
    var audio = new Audio('assets/Audio/gatitos_win.mp3')
    audio.play()

    Swal.fire({
        title: "VICTORIA",
        imageUrl: "assets/Gif/ganaste.gif",
        imageAlt: "Custom GIF",
        showCancelButton: true,
        confirmButtonText: 'Jugar de nuevo',
        cancelButtonText: 'Salir',
    }).then((result) => {
       if (result.isConfirmed) {
            reiniciarJuego();  // Llama a la función para reiniciar el juego
            audio.pause()
        } else {
            location.reload() // De no querer jugar mas, reiniciamos la pagina.
        }
    });
}

// Funcion popup de derrota
function mensajeDerrota (reiniciarJuego){
    Swal.fire({
        title: "DERROTA",
        imageUrl: "assets/Gif/perdiste.gif",
        imageAlt: "Custom GIF",
        showCancelButton: true,
        confirmButtonText: 'Jugar de nuevo',
        cancelButtonText: 'Salir',
    }).then((result) => {
       if (result.isConfirmed) {
            reiniciarJuego();  // Llama a la función para reiniciar el juego
        } else {
            location.reload() // De no querer seguir jugando , se reinicia la pagina.
        }
    });
}


// Funcion para mostrar cuando el usuario se loguee
function mensajeBienvenida(username){
        Toastify({
        text: `Bienvenido/a ${username}`,
        duration: 600,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        className: 'toast-login',
    }).showToast();
}

// Funcion para mostrar alerta si el usuario o la contraseña no fueron ingresados correctamente
function mensajeNoRegistrado(){
    Toastify({
        text: `⚠️ Usuario o contraseña incorrectos. ⚠️`,
        duration: 1800,
        style: {
            background: '#FC1F00',
          },
        className: 'toast-login',
    }).showToast();
}

// Funcion popup para notificar que el usuario se registro correctamente
function mensajeRegistrado(username){
    Toastify({
        text: `Usuario ${username} registrado con éxito.`,
        duration: 1000,
        style: {
            background: '#663399',
          },
        className: 'toast-login',
    }).showToast();
}

// Funcion para notificar que la tematica se encuentra en uso.
function mensajeTematicaRepetida (){
    Toastify({
        text: "La tematica ya se encuentra en uso.",
        duration: 600
        }).showToast();
}

// Funcion para notificar que se debe estar logueado para avanzar.
function mensajeDebeIniciarSesion (){
    Toastify({
        text: "Debe iniciar sesion",
        duration: 440
        }).showToast();
}

// Funcion popup de aviso que se debe elegir una tematica antes de la dificultad.
function mensajeDebElegirTematica (){
    Toastify({
        text: "Se debe elegir una tematica primero",
        duration: 440
        }).showToast();
}

export {mensajeBienvenida, mensajeDebElegirTematica, mensajeDebeIniciarSesion, mensajeDerrota, mensajeVictoria, mensajeNoRegistrado, mensajeRegistrado, mensajeTematicaRepetida}