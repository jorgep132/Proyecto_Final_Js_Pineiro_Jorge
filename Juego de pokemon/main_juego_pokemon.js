import { login, usuarioAutenticado } from "../Juego de Memoria/js/usuario.js"
import { mensajeDebeIniciarSesion } from "../Juego de Memoria/js/alerts.js"

// Variables globales //
let fallos = 0
let pokemonAcertados = 0
let pokemonTotal = 0
let generacion = 151
let pokemonActual = {};
let pokemonAdivinados = new Set()
const cancion = document.getElementById('cancion');
const botonMusica = document.getElementById('musica');
const urlBase = 'https://pokeapi.co/api/v2/pokemon/'; // Url con la Api de pokemon
// Fin del bloque variables globales //

// Bloque para que se reproduzca, o se pause, la musica de la pagina //
cancion.play()
botonMusica.addEventListener('click', () => {
  event.preventDefault()
  if (cancion.paused) {
    cancion.play();
  } else {
    cancion.pause();
  }
});
// Fin del bloque // 

// Evento de botones //
// Boton para ir al juego de Memoria
document.querySelector('#juegoMemoria').addEventListener('click', ()=>{
  event.preventDefault()
  window.location.href = '../Juego de Memoria/index_juego_memoria.html'
  
})
// Boton para ir al juego de quiz (juego de preguntas)
document.querySelector('#quiz').addEventListener('click', ()=>{
  event.preventDefault()
  window.location.href = '../Juego de Preguntas/index_quiz.html'
  
})
// Boton para nueva partida 
const botonNewGame = document.querySelector('#newGame');
botonNewGame.addEventListener('click', () => {
  event.preventDefault();
  nuevaPartida(() => obtenerPokemon(generacion)); // Se reinicia la partida y se muestra un nuevo pokemon de la generacion actual (la ultima elegida)
})

// Boton para elegir la generación de Kanto
const botonKanto = document.querySelector('#kanto')
botonKanto.addEventListener('click', ()=>{
  event.preventDefault()
  generacion = 151
  nuevaPartida(() => obtenerPokemon(generacion)); // Se reinicia la partida y se muestra un nuevo pokemon de la generacion de Kanto
})
// Boton para elegir la generación de Johto
const botonJohto = document.querySelector('#johto')
botonJohto.addEventListener('click', ()=>{
  event.preventDefault()
  generacion = 100
  nuevaPartida(() => obtenerPokemon(generacion)); // Se reinicia la partida y se muestra un nuevo pokemon de la generacion de Johto
})  
// Boton para elegir la generación de Hoenn
const botonHoenn = document.querySelector('#hoenn')
botonHoenn.addEventListener('click', ()=>{
  event.preventDefault()  
  generacion = 135
  nuevaPartida(() => obtenerPokemon(generacion)); // Se reinicia la partida y se muestra un nuevo pokemon de la generacion de Hoenn
})  
// Fin del bloque de eventos de botones // 

// Evento para la tecla enter, la cual usamos para ingresar el nombre del pokemon
document.querySelector('#respuesta').addEventListener('keydown', () => {
  if (!usuarioAutenticado()){ // Verifica que el usuario tenga la sesion iniciada.
    mensajeDebeIniciarSesion()
   } else if (event.key === 'Enter') {
    verificarRespuesta();
    document.querySelector('#respuesta').value = '';
    
  }
}); 


// Función asíncrona obtener un Pokémon aleatorio en base a la generación de pokemon elegida
async function obtenerPokemon(generacion) {
    
  let numeroAleatorio
  let rangoInicial
  let rangoFinal

  // Dependiendo la generacion elegida, tendremos mas o menos pokemon. Se toma en consideracion el ID del pokemon, siendo el que respeta en la pokedex.
  // Entendiendo que la primer generacion va del 1 al 151, la segunda del 152 al 251 y la tercera de 252 a 386.
  if (generacion === 151) {
    rangoInicial = 1;
    rangoFinal = 151;

  } else if (generacion === 100) {
    rangoInicial = 152;
    rangoFinal = 251;

  } else if (generacion === 135){
    rangoInicial = 252
    rangoFinal = 386
  }

  // De esta manera aseguramos que no se repitan los pokemons aleatorios que salen, y los limitamos a que salgan todos los pokemons de la generacion elegida.
  do {
    numeroAleatorio = Math.floor(Math.random() * (rangoFinal - rangoInicial + 1)) + rangoInicial
  } while (pokemonAdivinados.has(numeroAleatorio))

  pokemonAdivinados.add(numeroAleatorio);

  const urlPokemon = `${urlBase}${numeroAleatorio}`
  
  try {
    const respuesta = await fetch(urlPokemon);
    const datos = await respuesta.json();
    const id = datos.id || obtenerPokemonIdDesdeUrl(urlPokemon);

    pokemonActual = {
      nombre: datos.name,
      imagen: datos.sprites.front_default,
      id: id
    };
    mostrarPokemon();

  } catch (error) {
      console.error('Missing', error);
  }
}


// Función para mostrar el Pokémon actual
function mostrarPokemon() {
  // Mostramos cuantos vamos acertando del total de la generacion, y cuantos no hemos acertado.
  const resultados = document.querySelector('#resultados');
  resultados.innerText = `Aciertos: ${pokemonAcertados}/${generacion}
  Fallos: ${fallos}`;

  document.getElementById('mensaje').innerText = '';
  document.getElementById('imagenPokemon').src = pokemonActual.imagen;
  document.getElementById('respuesta').value = '';
}

// Funcion para verificar si el usuario acierta o falla
function verificarRespuesta() {
  // El usuario puede escribir con mayusculas o minisculas y lo va a tomar siempre comparando en minusculas
  const respuestaUsuario = document.getElementById('respuesta').value.toLowerCase();
  
  if (respuestaUsuario === pokemonActual.nombre) {
    pokemonAcertados++;
    pokemonTotal++

  // En caso de que el jugador falle al adivinar, se mostrara la foto y el nombre del pokemon, para asi saber cual era el que no acerto.
  } else {
    fallos++;
    pokemonTotal++
    document.querySelector('#pokemonIncorrectoNombre').innerText = pokemonActual.nombre
    document.querySelector('#pokemonIncorrectoImagen').src = pokemonActual.imagen

  }

  // Con este codigo evitamos que el jugador pueda seguir enviando respuestas cuando ya no quedan pokemons por adivinar.
  // Sin este bloque el juego se congela, dado que se ingresa una respuesta pero no tiene con que comparar, ya que no quedan mas pokemon de esa generacion por adivinar.
  // Esto se ejecuta siempre al final de la partida
  if (pokemonTotal === generacion ) {
      document.getElementById('respuesta').disabled = true;
      resultados.innerText = `Resultados:
                              Aciertos: ${pokemonAcertados}/${generacion}
                              Fallos: ${fallos}`;

      if (pokemonAcertados === generacion){
        document.getElementById('respuesta').disabled = true;
        resultados.innerText = ` Sos un maestro pokemon
                              Resultados:
                              Aciertos: ${pokemonAcertados}/${generacion}
                              Fallos: ${fallos}`;
      }

  } else {
    obtenerPokemon(generacion)
    iniciarContadorYObtenerPokemon(generacion);
  }
}


// Funcion para empezar una nueva partida, el equivalente a reiniciar el juego.
function nuevaPartida(callback) {
  fallos = 0;
  pokemonAcertados = 0;
  pokemonTotal = 0;
  pokemonAdivinados.clear();
  document.querySelector('#pokemonIncorrectoNombre').innerText = ''
  document.querySelector('#pokemonIncorrectoImagen').src = ''

  // Habilitar el campo de entrada si estaba deshabilitado en el juego anterior, dado que al terminar se bloquea el ingreso por teclado.
  document.getElementById('respuesta').disabled = false;

  // Limpiar los resultados mostrados, para comenzar de 0 la patida.
  const resultados = document.querySelector('#resultados');
  resultados.innerText = '';

  // Limpiar la entrada del usuario, para que no aparezca lo ultimo que escribio en el game anterior.
  document.getElementById('respuesta').value = '';

  if (callback && typeof callback === 'function') {
    callback();
  }
}

window.onload = () => obtenerPokemon(generacion);

login() // Llamamos a la funcion de login, dado que hay acciones en el juego que no van a estar habilitadas si el usuario no esta logueado.