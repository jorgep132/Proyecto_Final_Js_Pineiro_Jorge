import { login } from "../Juego de Memoria/js/usuario.js"

let fallos = 0
let pokemonAcertados = 0
let pokemonTotal = 0
let generacion = 151

const botonJuegoMemoria = document.querySelector('#juegoMemoria')
botonJuegoMemoria.addEventListener('click', ()=>{
  event.preventDefault()
  window.location.href = '../Juego de Memoria/index_juego_memoria.html'
  
})


document.querySelector('#respuesta').addEventListener('keydown', ()=> {
  if (event.key === 'Enter'){
    verificarRespuesta()
    document.querySelector('#respuesta').value = ''
  }

})

const botonNewGame = document.querySelector('#newGame')
botonNewGame.addEventListener('click', ()=>{
  event.preventDefault()
  location.reload()
})


// Utilizamos la Api, pokeapi.
const urlBase = 'https://pokeapi.co/api/v2/pokemon/';
  let pokemonActual = {};
  let pokemonAdivinados = new Set()

  // Función para obtener un Pokémon aleatorio de la primera generación (1-151)
  async function obtenerPokemon(generacion) {
    
    let numeroAleatorio
    do {
        numeroAleatorio = Math.floor(Math.random() * generacion) + 1
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
    resultados.innerText = `Aciertos: ${pokemonAcertados}/151
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

  } else {
    fallos++;
    pokemonTotal++
  }


  console.log(generacion)                      
  console.log(pokemonTotal)
      
  if (pokemonTotal === generacion ) {
      console.log('fin')
      document.getElementById('respuesta').disabled = true;
      resultados.innerText = `Resultados:
                              Aciertos: ${pokemonAcertados}/151
                              Fallos: ${fallos}`;
      if (pokemonAcertados === generacion){
        document.getElementById('respuesta').disabled = true;
        resultados.innerText = ` Sos un maestro pokemon
                              Resultados:
                              Aciertos: ${pokemonAcertados}/151
                              Fallos: ${fallos}`;
      }
      
    // Puedes realizar alguna acción adicional aquí, como reiniciar el juego o mostrar un mensaje de finalización.
  } else {
    obtenerPokemon(generacion);
  }
}

/////// TEST///////////















  // Iniciar el juego al cargar la página
  window.onload = () => obtenerPokemon(generacion);



login()
