import { Programacion, Historia, Geografia} from "./assets/js/preguntas.js"
import { mensajeDerrotaQuiz, mensajeSeleccionaOpcionQuiz, mensajeVictoriaQuiz } from "../Juego de Memoria/js/alerts.js"
import { login, usuarioAutenticado } from "../Juego de Memoria/js/usuario.js";

const cancion = document.getElementById('cancion');
const botonMusica = document.getElementById('musica');

cancion.play()
botonMusica.addEventListener('click', () => {
  event.preventDefault()
  if (cancion.paused) {
    cancion.play();
  } else {
    cancion.pause();
  }
});

document.querySelector('#juegoMemoria').addEventListener('click', ()=>{
  event.preventDefault()
  window.location.href = '../Juego de Memoria/index_juego_memoria.html'
})

document.querySelector('#pokeadivinanza').addEventListener('click', ()=>{
  event.preventDefault()
  window.location.href = '../Juego de Pokemon/index_juego_pokemon.html'
})

const categoriaProgramacion = document.querySelector('#programacion')
const categoriaHistoria = document.querySelector('#historia')
const categoriaGeografia = document.querySelector('#geografia')
const preguntas = document.querySelector('#pregunta')
const op1 = document.querySelector('#op1')
const op2 = document.querySelector('#op2')
const op3 = document.querySelector('#op3')
const op4 = document.querySelector('#op4')
const siguiente = document.querySelector('#siguiente')
const opcionesRadio = document.querySelectorAll('input[type="radio"]');
let categoria = Programacion
let preguntaTotal = 0
let preguntaActualIndex = 0
let correctas = 0
let incorrectas = 0

document.querySelector('#categoria').innerText = `Programacion`

function mezclarPreguntas(preguntaAleatoria) {
  for (let i = preguntaAleatoria.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [preguntaAleatoria[i], preguntaAleatoria[j]] = [preguntaAleatoria[j], preguntaAleatoria[i]];
  }
  return preguntaAleatoria;
}

// SE REPITEN PREGUNTAS - CORREGIR
function mostrarPregunta() {
    opcionesRadio.forEach(opcion => {
      opcion.checked = false;
    });

    const preguntasMezcladas = mezclarPreguntas(categoria);

    const preguntaActual = preguntasMezcladas[preguntaActualIndex];

    if (preguntaActual && preguntaTotal < 5) {
        preguntas.innerText = preguntaActual.pregunta;
        op1.innerText = preguntaActual.opciones[0];
        op2.innerText = preguntaActual.opciones[1];
        op3.innerText = preguntaActual.opciones[2];
        op4.innerText = preguntaActual.opciones[3];
    } else if (incorrectas > correctas) {
        console.log('Fin')
        mensajeDerrotaQuiz(correctas, incorrectas)
    } else{
      mensajeVictoriaQuiz(correctas, incorrectas)
    }
    document.querySelector('#resultadoFinal').innerText = `Correctas: ${correctas}. Incorrectas: ${incorrectas}. Total de preguntas: 5`
    document.querySelector('#totalPreguntas').innerText = `Respondidas: ${preguntaTotal}/5`
}


categoriaProgramacion.addEventListener('click', ()=>{
    event.preventDefault()
    document.querySelector('#categoria').innerText = `Programacion`
    categoria = Programacion
    preguntaActualIndex = 0
    mostrarPregunta()
})

categoriaHistoria.addEventListener('click', ()=>{
    event.preventDefault()
    document.querySelector('#categoria').innerText = `Historia`
    categoria = Historia
    preguntaActualIndex = 0
    mostrarPregunta()
})

categoriaGeografia.addEventListener('click', ()=>{
  event.preventDefault()
  document.querySelector('#categoria').innerText = `Geografía`
  categoria = Geografia
  preguntaActualIndex = 0
  mostrarPregunta()
})

mostrarPregunta()

siguiente.addEventListener('click', () => {
    event.preventDefault();
    const opcionSeleccionada = Array.from(opcionesRadio).find(opcion => opcion.checked);
    if (opcionSeleccionada){
        verificarRespuesta(categoria[preguntaActualIndex]);
        preguntaActualIndex++;
        preguntaTotal++
        mostrarPregunta();
    } else {
        mensajeSeleccionaOpcionQuiz()
    }

});   


  function verificarRespuesta(nuevaPregunta) {
    // Iterar sobre los elementos input
    opcionesRadio.forEach(opcion => {
      // Verificar si la opción está seleccionada y es la respuesta correcta
      if (opcion.checked === true && opcion.dataset.respuesta === nuevaPregunta.respuesta) {    
        correctas++
      } else if (opcion.checked === true) {
        incorrectas++
      }
    });
  }



  login()