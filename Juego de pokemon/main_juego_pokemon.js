import { login } from "../Juego de Memoria/js/usuario.js"

let fallos = 0
let pokemonAcertados = 0
let generacion = 151
let listPoke = []

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



  // Función para verificar la respuesta del usuario
  function verificarRespuesta() {
    const respuestaUsuario = document.getElementById('respuesta').value.toLowerCase();
    if (respuestaUsuario === pokemonActual.nombre || pokemonActual.nombre.includes("nidoran")) {
      pokemonAcertados++
      document.getElementById('mensaje').innerText = '¡Correcto! ¡Ese es el Pokémon!'
      obtenerPokemon(generacion); // Obtener otro Pokémon después de acertar
    } else {
      document.getElementById('mensaje').innerText = 'Incorrecto. ¡Sigue intentando!';
      fallos ++
      obtenerPokemon(generacion)
    }

    listPoke.push(pokemonActual.nombre)
    
    const resultados = document.querySelector('#resultados')
    resultados.innerText = `Pokémon acertados: ${pokemonAcertados}/151
                        Intentos: ${fallos}`
    
    const listaPokemon = document.querySelector('#listaPokemon')
    listaPokemon.innerText = `${listPoke.join(', ')}`
    
  }

  // Iniciar el juego al cargar la página
  window.onload = obtenerPokemon(generacion)
 













login()