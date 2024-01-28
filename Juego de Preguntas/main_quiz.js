import { Programacion, Historia, Geografia} from "./assets/js/preguntas.js"
import { mensajeDerrotaQuiz, mensajeSeleccionaOpcionQuiz, mensajeVictoriaQuiz, mensajeDebeIniciarSesion } from "../Juego de Memoria/js/alerts.js"
import { login, usuarioAutenticado } from "../Juego de Memoria/js/usuario.js"

// Variables globales //
const categoriaProgramacion = document.querySelector('#programacion')
const categoriaHistoria = document.querySelector('#historia')
const categoriaGeografia = document.querySelector('#geografia')
const preguntas = document.querySelector('#pregunta')
const op1 = document.querySelector('#op1')
const op2 = document.querySelector('#op2')
const op3 = document.querySelector('#op3')
const op4 = document.querySelector('#op4')
const siguiente = document.querySelector('#siguiente')
const opcionesRadio = document.querySelectorAll('input[type="radio"]')
let categoria = Programacion
let preguntaTotal = 0
let preguntaActualIndex = 0
let correctas = 0
let incorrectas = 0
// Fin del bloque de variables globales //


// Bloque para cancion de la web // 
const cancion = document.getElementById('cancion')
const botonMusica = document.getElementById('musica')

cancion.play()
botonMusica.addEventListener('click', () => {
  event.preventDefault()
  if (cancion.paused) {
    cancion.play()
  } else {
    cancion.pause()
  }
})
// Fin del bloque para la cancion // 


// Bloque de eventos de botones //
// Evento para cambiar al juego de memoria // 
document.querySelector('#juegoMemoria').addEventListener('click', ()=>{
  event.preventDefault()
  window.location.href = '../Juego de Memoria/index_juego_memoria.html'
})

// Evento para cambiar al juego de Pokemon // 
document.querySelector('#pokeadivinanza').addEventListener('click', ()=>{
  event.preventDefault()
  window.location.href = '../Juego de Pokemon/index_juego_pokemon.html'
})

// Evento para cambiar a la categoria de programacion //
categoriaProgramacion.addEventListener('click', ()=>{
  event.preventDefault()
  reiniciarJuego()
  document.querySelector('#categoria').innerText = `Programacion`
  categoria = Programacion
  preguntaActualIndex = 0
  mostrarPregunta()
})

// Evento para cambiar a la categoria de Historia // 
categoriaHistoria.addEventListener('click', ()=>{
  event.preventDefault()
  reiniciarJuego()
  document.querySelector('#categoria').innerText = `Historia`
  categoria = Historia
  preguntaActualIndex = 0
  mostrarPregunta()
})

// Evento para cambiar a la categoria de geografia // 
categoriaGeografia.addEventListener('click', ()=>{
event.preventDefault()
reiniciarJuego()
document.querySelector('#categoria').innerText = `Geografía`
categoria = Geografia
preguntaActualIndex = 0
mostrarPregunta()
})

// Evento del boton 'siguiente' para avanzar a la proxima pregunta
siguiente.addEventListener('click', () => {
  event.preventDefault()
  if (!usuarioAutenticado()){ // Verifica que el usuario tenga la sesion iniciada.
    mensajeDebeIniciarSesion()
  } else {
    
    const opcionSeleccionada = Array.from(opcionesRadio).find(opcion => opcion.checked)
    if (opcionSeleccionada){
      verificarRespuesta(categoria[preguntaActualIndex])
      preguntaTotal++
      preguntaActualIndex++
      mostrarPregunta()
      } else {
        mensajeSeleccionaOpcionQuiz()
      }
    }
})   
// Fin del bloque de botones //

// Mostramos el titulo de la categoria por defecto, que es programacion.
document.querySelector('#categoria').innerText = `Programacion`

// Funcion para mostrar la pregunta, con sus opciones
function mostrarPregunta() {
  opcionesRadio.forEach(opcion => {
    opcion.checked = false
  })

  // Son 7 preguntas en total 
  if (preguntaActualIndex < categoria.length && preguntaTotal < 7) {
    const preguntaActual = categoria[preguntaActualIndex]

    preguntas.innerText = preguntaActual.pregunta
    op1.innerText = preguntaActual.opciones[0]
    op2.innerText = preguntaActual.opciones[1]
    op3.innerText = preguntaActual.opciones[2]
    op4.innerText = preguntaActual.opciones[3]

  // Dependiendo si acertamos mas o menos del total, aparecera el mensaje de ganar o perder.
  } else if (incorrectas > correctas) {
    mensajeDerrotaQuiz(correctas, incorrectas)
  } else {
    mensajeVictoriaQuiz(correctas, incorrectas)
  }
  // Se mostraran en pantalla el total de preguntas, respondidas bien y mal 
  document.querySelector('#resultadoFinal').innerText = `Correctas: ${correctas}. Incorrectas: ${incorrectas}. Total de preguntas: 7`
  document.querySelector('#totalPreguntas').innerText = `Respondidas: ${preguntaTotal}/7`
}

mostrarPregunta()



function verificarRespuesta(nuevaPregunta) {
  // Verificamos si la opcion elegida es correcta
  opcionesRadio.forEach(opcion => {
    if (opcion.checked === true && opcion.dataset.respuesta === nuevaPregunta.respuesta) {    
      correctas++
    } else if (opcion.checked === true) {
      incorrectas++
    }
  })
}

// Funcion para reiniciar el juego 
function reiniciarJuego() {

  preguntaTotal = 0
  preguntaActualIndex = 0
  correctas = 0
  incorrectas = 0
  mostrarPregunta()

}
  
// Funcion heredada para iniciar sesion
login()