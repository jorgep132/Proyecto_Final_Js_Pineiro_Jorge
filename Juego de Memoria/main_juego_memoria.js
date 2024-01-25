import { mensajeVictoria, mensajeDerrota, mensajeDebeIniciarSesion, mensajeDebElegirTematica, mensajeTematicaRepetida} from "./js/alerts.js"
import { login, usuarioAutenticado } from "./js/usuario.js"
import { cartas_gatitos, cartas_yugi } from "./js/tematicas_cartas.js"

// Variables
let totalCartas = 16
let cartas = []
let carElegidas = []
let carUsadas = []
let movActual = 0
let errores = 0
let partidasGanadas = 0
let partidasPerdidas = 0
let tematica = null
let tematicaDificultad = null
let tematicaSeleccionada = null
let dificultad = 1
let resultadoError = document.querySelector('.resultados')

const partidasRegistro = document.querySelector('#partidasRegistro')


// Template de las cartas
function crearTemplate(dorso) {
    return `<div class='carta'><div class='dorso' style="background-image: url('${dorso}')"></div><div class='cara'></div></div>`
}

// Contenedor del juego
const wrapper = document.querySelector('#wrapper')
const juego = document.querySelector('#juego')

// Botones
const botonYugi = document.querySelector('#yugi')
const botonGatitos = document.querySelector('#gatitos')
const botonDificultad = document.querySelector('#dificultad')
const botonInfo = document.querySelector('#info')
const botonPokeadivinanza = document.querySelector('#pokeadivinanza')

botonPokeadivinanza.addEventListener('click', ()=>{
    event.preventDefault()
    window.location.href = '../Juego de Pokemon/index_juego_pokemon.html'
    
})

// Bloque de evento de Botones
// Evento de botonYugi para elegir la tematica de Yu-gi-oh! al hacer click.
botonYugi.addEventListener('click', ()=>{
    event.preventDefault()
    if (!usuarioAutenticado()){ // Verifica que el usuario tenga la sesion iniciada.
       mensajeDebeIniciarSesion()
       
    }else if (tematica === cartas_yugi){ // Si esta logueado, continuara el flujo asignando la tematica elegida.
        mensajeTematicaRepetida()
    } else {
        Swal.fire({
            title: '¿Estás seguro de que deseas elegir la temática de Yu-Gi-Oh!?', // Popup de confirmacion.
            showCancelButton: true, 
            confirmButtonText: 'Cambiar',
            cancelButtonText: 'Cancelar',
            reverseButtons: false
        }).then((result) => { // Si confirma, se prodece al cambio de tematica. Si no confirma, se cierra el popup.
            if (result.isConfirmed) {
                tematicaSeleccionada = cartas_yugi
                tematica = tematicaSeleccionada
                reiniciarJuego(tematica, 'assets/Cartas/dorso_yugi.jpg')
            }
        })
    }
})

// Evento de botonGatitos para elegir la tematica de Gatitos al hacer click.
botonGatitos.addEventListener('click', ()=>{
    event.preventDefault()
    if (!usuarioAutenticado()){ // Verifica que el usuario tenga la sesion iniciada.
        mensajeDebeIniciarSesion()
    } else if (tematica === cartas_gatitos){ // Si esta logueado, continuara el flujo asignando la tematica elegida.
        mensajeTematicaRepetida()
    } else {
        Swal.fire({
            title: '¿Estás seguro de que deseas elegir la temática de Gatitos?', // Popup de confirmacion.
            showCancelButton: true,
            confirmButtonText: 'Cambiar',
            cancelButtonText: 'Cancelar',
            reverseButtons: false
        }).then((result) => { // Si confirma, se prodece al cambio de tematica. Si no confirma, se cierra el popup.
            if (result.isConfirmed) {
                tematicaSeleccionada = cartas_gatitos
                tematica = tematicaSeleccionada
                reiniciarJuego(tematica, 'assets/Cartas_gatos/gatitos_dorso.png')
            }
        })
    }
})

// Evento de botonDificultad, para elegir entre los 3 niveles de dificultad.
botonDificultad.addEventListener('click', ()=>{
    event.preventDefault()
    if (!usuarioAutenticado()){ // Tiene que estar logueado para elegir dificultad.
        mensajeDebeIniciarSesion()
    } else if (tematica == null){ // Si no hay tematica elegida, no se puede elegir la dificultad.
        mensajeDebElegirTematica() 
    } else {
    Swal.fire({ // Popup para elegir entre 1 y 3 (niveles de dificultad)
        title: "Elija el nivel de dificultad",
        input: "range",
        inputLabel: "Dificultad",
        inputAttributes: {
          min: "1",
          max: "3",
          step: "1"
        },
        inputValue: 1,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar', 
    }).then((result )=>{ // Si se confirma, se ajusta la dificultad del juego a la elegida, de cancelar se ajusta a la dificultad default (1)
        if (result.isConfirmed){
            dificultad = result.value
            reiniciarJuego() // Se reinicia el juego con la dificultad elegida.
        }
    })
    }
    nivelDificultad() // Se modifica el juego en base a la dificultad llamando a esta funcion.
})


// Evento de botonInfo, para leer informacion del juego, tales como una demo en video y un leve instructivo.
botonInfo.addEventListener('click', ()=>{
    event.preventDefault()
    Swal.fire({
        title: "Reglas",
        html: `<p>Primero selecciona una temática para comenzar a jugar. El juego consiste en encontrar los pares de cartas, cada vez que nos equivoquemos, sumará uno a la cuenta de fallos. Una vez encontrado todo los pares, ganarás la partida.</p>
        <p>Nivel 1: Fácil, 12 cartas y 10 intentos.</p>
        <p>Nivel 2: Intermedio, 16 cartas y 6 intentos.</p>
        <p>Nivel 3: Dificil, 20 cartas y 8 intentos.</p>`, // Instructivo de las reglas, objetivo del juego y diferentes niveles de dificultad.
        imageUrl: "assets/Gif/reglas.gif", // Video ilustrativo de como se juega.
        imageAlt: "Custom GIF"
      })
})

// Funcion para crear las cartas
function crearCartas (tematica, dorso){
    if (dificultad == 1){
        resultadoError.innerHTML = `Dificultad: fácil. Fallos: ${errores}` // Si la dificultad es 1, la cantidad de fallas a cometer es ilimitada.
    }
    if (dificultad == 2){
        resultadoError.innerHTML = `Dificultad: intermedio. Fallos: ${errores}/6` // Si la dificultad es 2, la cantidad de fallos maximos es de 6, por eso mostramos el /6
    }
    if (dificultad == 3){
        resultadoError.innerHTML = `Dificultad: difícil. Fallos: ${errores}/8` // Si la dificultad es 3, la cantidad de fallos maximos es de 8, por eso mostramos el /8
    }
    for (let i = 0; i < totalCartas; i++) { // Bucle para crear los div con las cartas. Dependiendo que dificultad elijamos, habran 12, 16 o 20 cartas.
        let div = document.createElement('div') // Creamos el 'div'.
        div.innerHTML = crearTemplate(dorso) // Creamos el dorso de la carta, dependiendo la tematica que eligio el usuario.
        cartas.push(div) 
        mezclar(tematica) // La cara de la carta cambiara dependiendo la tematica
        document.querySelector('#juego').append(cartas[i]) // Guardamos los div de las cartas dentro del contenedor #juego
        cartas[i].querySelectorAll('.cara')[0].style.backgroundImage = `url(${carUsadas[i]})` // Aplicamos el dorso de la carta
        cartas[i].querySelectorAll('.carta')[0].addEventListener('click', activar) // Le agregamos el evento de "activar" la carta. Esto implica que al hacer click sobre la carta, se cambie la clase, mostrando la cara de la carta.
    }
    
    // Funcion para mostrar las cartas al inicio
    dificultadTiempoVisualizacion(dificultad) // Las cartas comienzan boca arriba, dependiendo la dificultad tendremos mas o menos tiempo para visualizarlas, antes de que se den vuelta.
}

// Funcion para voltear las cartas
function activar(e) { 
    if (movActual < 2) { // Limitamos los movimientos a 2, dado que el juego consiste en buscar los pares (2).
        e.target.classList.add('activa') // Al elegir una carta, le cambiamos la clase a 'activa' permitiendo asi que se visualice la cara de la carta.

        if (!carElegidas[0] || carElegidas[0] !== e.target) { // Comparamos si las cartas elegidas coinciden
            carElegidas.push(e.target)

            if (++movActual === 2) { // Si ya elegimos dos cartas, se comparan, y en base a si son iguales o no sigue el flujo con diferentes alternativas.
                const imagen1 = carElegidas[0].querySelectorAll('.cara')[0].style.backgroundImage
                const imagen2 = carElegidas[1].querySelectorAll('.cara')[0].style.backgroundImage

                if (imagen1 === imagen2) { // Si son iguales, se guardaran en un array para indicar que ese par fue encontrado, por lo que permaneceran boca arriba y no tendran mas eventos de click.
                    carElegidas = [] // Array donde se guardan los pares, a medida se van encontrando
                    movActual = 0 // Una vez que se eligen 2 cartas, el movActual pasa a 0, para volver a elegir 2.

                   setTimeout(() => { 
                        if (todasCartasVolteadas()) { // Si estan todas las cartas boca arriba, se gano la partida.
                            partidasGanadas ++  
                            mensajeVictoria(reiniciarJuego) // Se llama a la funcion para mostrar el mensaje al ganar, y para reiniciar la partida si el usuario quiere.
                        }   
                    }, 300)

                } else { // Si no estan todas volteadas, se les remueve la clase 'activa', para que vuelvan a estar boca abajo.
                    setTimeout(() => { // Se establece Timeout para que tarde en voltearse la carta.
                        carElegidas[0].classList.remove('activa')
                        carElegidas[1].classList.remove('activa')
                        carElegidas = [] // El array sigue vacio, dado que no acertamos.
                        movActual = 0 // Se reinician los movimientos del jugador
                        errores++ // Se contabilizan los fallos
                        nivelDificultad(dificultad) // Se llama a la funcion, para determinar cuantos errores puede cometer y cuantos lleva cometidos.
                        dificultadCantidadFallos(dificultad, errores) // Se llama a la funcion para determinar que a X cantida de movimientos erroneos, la partida termina.
                    }, 300)
                }
            }
        }
    }
}

// Funcion para mezclar las cartas
function mezclar() {

   nivelDificultad(dificultad) // Dependiendo la dificultad tendremos entre 12, 16 o 20 cartas.

    let mezcla = Math.floor(Math.random() * tematicaDificultad.length) // Se randomiza la posicion de las cartas
    let imagen = tematicaDificultad[mezcla] // Se randomiza la posicion de cada carta

    let valores = carUsadas.filter(value => value === imagen)
    if (valores.length < 2) { // Bucle para evitar que las cartas se repitan
        carUsadas.push(imagen)
    } else {
        mezclar(tematicaDificultad) 
    }

    partidasRegistro.innerText = `Partidas totales: ${partidasGanadas + partidasPerdidas}
    Partidas ganadas: ${partidasGanadas}
    Partidas perdidas: ${partidasPerdidas}`
}

// Funcion para determinar si estan todas boca arriba
function todasCartasVolteadas(){
    return cartas.every(carta => carta.querySelectorAll('.carta')[0].classList.contains('activa'))
}

// Funcion para reiniciar el juego
function reiniciarJuego() {
    
    // Limpiar el tablero
    document.querySelector('#juego').innerHTML = ''

    // Se reinician las variables del juego
    cartas = []
    carElegidas = []
    carUsadas = []
    movActual = 0
    errores = 0
    // Se muestran nuevas cartas
    if (tematicaSeleccionada){
        crearCartas(tematicaSeleccionada, (tematicaSeleccionada === cartas_yugi) ? 'assets/Cartas/dorso_yugi.jpg' : 'assets/Cartas_gatos/gatitos_dorso.png') // Se crean en base a la tematica elegida, dado que cada una tiene su tematica.
    }
}

// Funcion para determinar el efecto de la dificultad sobre el juego.
function nivelDificultad(dificultad){ 
    if (dificultad == 1){ // En la primer dificultad tendremos intentos ilimitados y 12 cartas en el tablero.
        resultadoError.innerHTML = `Dificultad: Fácil. Fallos: ${errores}/10`
        totalCartas = 12
        tematicaDificultad = tematica.slice(0, 6)
        juego.className = ''
        wrapper.className = 'facil'
    }
    if (dificultad == 2){ // En la segunda dificultad tendremos 6 intentos y 16 cartas en el tablero.
        resultadoError.innerHTML = `Dificultad: Intermedio. Fallos: ${errores}/6`
        totalCartas = 16
        tematicaDificultad = tematica.slice(0, 8)
        juego.className = ''
        wrapper.className = 'intermedio'
    }
    if (dificultad == 3){ // En la tercer dificultad tendremos 8 intentos, pero 20 cartas en el tablero.
        resultadoError.innerHTML = `Dificultad: Difícil. Fallos: ${errores}/8`
        totalCartas = 20
        tematicaDificultad = tematica.slice(0, 10)
        juego.className = 'dificil'
        wrapper.className = 'dificil'
    }
}


// Funcion para determinar cuantos intentos por dificultad tenemos
function dificultadCantidadFallos(dificultad, errores){
    if (dificultad == 1 && errores == 10){ // A los 10 fallos perdemos.
        partidasPerdidas ++
        mensajeDerrota(reiniciarJuego) // Popup de derrota y se restablece la partida o se sale.
    }
    if (dificultad == 2 && errores == 6){ // A los 6 fallos perdemos.
        partidasPerdidas ++
        mensajeDerrota(reiniciarJuego) // Popup de derrota y se restablece la partida o se sale.
    }
    if (dificultad == 3 && errores == 8){ // A los 8 fallos perdemos
        partidasPerdidas ++
        mensajeDerrota(reiniciarJuego) // Popup de derrota y se reinicia la partida o se sale.
    } 
}


// Funcion para determinar cuanto tiempo podemos visualizar las cartas, antes de que se volteen.
function dificultadTiempoVisualizacion (dificultad){
    if (dificultad == 1){ // En la primer dificultad, las cartas permaneceran 900ms boca arriba. Esto se logra dejando la clase 'activa' en cada carta y luego removiendola.
    cartas.forEach(carta => {
        carta.querySelectorAll('.carta')[0].classList.add('activa')
            setTimeout(() => {
                carta.querySelectorAll('.carta')[0].classList.remove('activa')
        }, 900)
    })}
    if (dificultad == 2){ // En la segunda dificultad, las cartas permaneceran 1200ms boca arriba.
        cartas.forEach(carta => {
            carta.querySelectorAll('.carta')[0].classList.add('activa')
                setTimeout(() => {
                    carta.querySelectorAll('.carta')[0].classList.remove('activa')
        }, 1200)
    })}
        if (dificultad == 3){ // En la tercer dificultad, las cartas permaneceran 1400ms boca arriba.
            cartas.forEach(carta => {
                carta.querySelectorAll('.carta')[0].classList.add('activa')
                setTimeout(() => {
                    carta.querySelectorAll('.carta')[0].classList.remove('activa')
        }, 1400)
    })}
}


// Funcion para que el usuario inicie sesion, dado que si no esta logueado no podra jugar.
login()




