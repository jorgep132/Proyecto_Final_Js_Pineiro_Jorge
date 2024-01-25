import { Programacion } from "./assets/js/preguntas.js";

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


const preguntas = document.querySelector('#pregunta')
const op1 = document.querySelector('#op1')
const op2 = document.querySelector('#op2')
const op3 = document.querySelector('#op3')
const op4 = document.querySelector('#op4')

for (let nuevaPregunta of Programacion){

    console.log(nuevaPregunta.pregunta)
    console.log(nuevaPregunta.opciones)
    console.log(nuevaPregunta.respuesta)

    // let responder = prompt(`Pregunta: ${nuevaPregunta.pregunta} \n Opciones: ${nuevaPregunta.opciones}`)
    // if (responder === nuevaPregunta.respuesta){
    // alert('Buena')
    // } else{
    // alert('Alto malo')
    // }

    preguntas.innerText = nuevaPregunta.pregunta
    
    console.log(nuevaPregunta.opciones[0])
    
    op1.innerText = nuevaPregunta.opciones[0]
    op2.innerText = nuevaPregunta.opciones[1]
    op3.innerText = nuevaPregunta.opciones[2]
    op4.innerText = nuevaPregunta.opciones[3]

}
    


