import { login, usuarioAutenticado } from "../Juego de Memoria/js/usuario.js"
import { mensajeDebeIniciarSesion } from "../Juego de Memoria/js/alerts.js"

let fallos = 0
let pokemonAcertados = 0
let pokemonTotal = 0
let generacion = 151
let pokemonListaCorrectos = []
let PokemonListaIncorrectos = []

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


const botonJuegoMemoria = document.querySelector('#juegoMemoria')
botonJuegoMemoria.addEventListener('click', ()=>{
  event.preventDefault()
  window.location.href = '../Juego de Memoria/index_juego_memoria.html'
  
})


document.querySelector('#respuesta').addEventListener('keydown', () => {
  if (!usuarioAutenticado()){ // Verifica que el usuario tenga la sesion iniciada.
    mensajeDebeIniciarSesion()
   } else if (event.key === 'Enter') {
    verificarRespuesta();
    document.querySelector('#respuesta').value = '';
    
  }
}); 

const botonNewGame = document.querySelector('#newGame');
botonNewGame.addEventListener('click', () => {
  event.preventDefault();
  console.log('Generacion ' + generacion);
  console.log('Pokemon total ' + pokemonTotal);
  nuevaPartida(() => obtenerPokemon(generacion)); // Pasar obtenerPokemon como devolución de llamada
});



const botonKanto = document.querySelector('#kanto')
botonKanto.addEventListener('click', ()=>{
  event.preventDefault()
  generacion = 151
  console.log('Generacion ' +  generacion)
  console.log('Pokemon total ' + pokemonTotal)
  nuevaPartida(() => obtenerPokemon(generacion)); // Asegurar reiniciar y obtenerPokemon después
})

const botonJohto = document.querySelector('#johto')
botonJohto.addEventListener('click', ()=>{
  event.preventDefault()
  generacion = 100
  console.log('Generacion ' +  generacion)
  console.log('Pokemon total ' + pokemonTotal)
  nuevaPartida(() => obtenerPokemon(generacion)); // Asegurar reiniciar y obtenerPokemon después
})  

const botonHoenn = document.querySelector('#hoenn')
botonHoenn.addEventListener('click', ()=>{
  event.preventDefault()  
  generacion = 135
  console.log('Generacion ' +  generacion)
  console.log('Pokemon total ' + pokemonTotal)
  nuevaPartida(() => obtenerPokemon(generacion)); // Asegurar reiniciar y obtenerPokemon después
})  


// Utilizamos la Api, pokeapi.
const urlBase = 'https://pokeapi.co/api/v2/pokemon/';
  let pokemonActual = {};
  let pokemonAdivinados = new Set()

  // Función para obtener un Pokémon aleatorio de la primera generación (1-151)
  async function obtenerPokemon(generacion) {
    
    let numeroAleatorio
    let rangoInicial
    let rangoFinal

    if (generacion === 151) {
      rangoInicial = 1;
      rangoFinal = 151;
    } else if (generacion === 100) {
      rangoInicial = 152;
      rangoFinal = 252;
    } else if (generacion === 135){
      rangoInicial = 253
      rangoFinal = 388
    }


    do {
        numeroAleatorio = Math.floor(Math.random() *(rangoFinal - rangoInicial + 1)) + rangoInicial
    } while (pokemonAdivinados.has(numeroAleatorio))

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
    const resultados = document.querySelector('#resultados');
    resultados.innerText = `Aciertos: ${pokemonAcertados}/${generacion}
    Fallos: ${fallos}`;
    document.getElementById('mensaje').innerText = '';
    document.getElementById('imagenPokemon').src = pokemonActual.imagen;
    document.getElementById('respuesta').value = '';

    pokemonAdivinados.add(pokemonActual.id)
    
  }

  function obtenerPokemonIdDesdeUrl(url) {
    // La URL tiene el formato 'https://pokeapi.co/api/v2/pokemon/{id}/'
    const idMatch = url.match(/\/(\d+)\/$/);
    if (idMatch && idMatch[1]) {
      return parseInt(idMatch[1], 10);
    }
    return null;
  }

function verificarRespuesta() {
  const respuestaUsuario = document.getElementById('respuesta').value.toLowerCase();

  if (respuestaUsuario === pokemonActual.nombre) {
    pokemonAcertados++;
    pokemonTotal++
    const pokemonCorrecto = document.querySelector('#pokemonCorrecto')
    pokemonListaCorrectos.push({ nombre: pokemonActual.nombre, imagen: pokemonActual.imagen });

    // Construir la cadena de imágenes
    let listaHtml = '';
    for (const pokemon of pokemonListaCorrectos) {
      listaHtml += `<img src="${pokemon.imagen}" alt="${pokemon.nombre}"> ${pokemon.nombre}`;
    }

    // Asignar la cadena de imágenes al contenido del elemento HTML
    pokemonCorrecto.innerHTML = listaHtml;

  } else {
    fallos++;
    pokemonTotal++
    const pokemonIncorrecto = document.querySelector('#pokemonIncorrecto')
    PokemonListaIncorrectos.push({ nombre: pokemonActual.nombre, imagen: pokemonActual.imagen });

    // Construir la cadena de imágenes
    let listaHtml = '';
    for (const pokemon of PokemonListaIncorrectos) {
      listaHtml += `<img src="${pokemon.imagen}" alt="${pokemon.nombre}"> ${pokemon.nombre}`;
    }

    // Asignar la cadena de imágenes al contenido del elemento HTML
    pokemonIncorrecto.innerHTML = listaHtml;
  }


  console.log('Generacion ' +  generacion)
  console.log('Pokemon total ' + pokemonTotal)
      
  if (pokemonTotal === generacion ) {
      console.log('fin')
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
    obtenerPokemon(generacion);
  }
}


function nuevaPartida(callback) {
  fallos = 0;
  pokemonAcertados = 0;
  pokemonTotal = 0;
  pokemonAdivinados.clear();
  pokemonCorrecto.innerHTML = '';
  pokemonIncorrecto.innerHTML = '';

  // Habilitar el campo de entrada si estaba deshabilitado en el juego anterior
  document.getElementById('respuesta').disabled = false;

  // Limpiar los resultados mostrados
  const resultados = document.querySelector('#resultados');
  resultados.innerText = '';

  // Limpiar la entrada del usuario
  document.getElementById('respuesta').value = '';

  if (callback && typeof callback === 'function') {
    callback(); // Llamar a la devolución de llamada proporcionada
  }
}


window.onload = () => obtenerPokemon(generacion);

login()
