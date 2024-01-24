import { login } from "../Juego de Memoria/js/usuario.js"

const botonJuegoMemoria = document.querySelector('#juegoMemoria')
botonJuegoMemoria.addEventListener('click', ()=>{
  event.preventDefault()
  window.location.href = '../Juego de Memoria/index_juego_memoria.html'
  
})




const urlBase = 'https://pokeapi.co/api/v2/pokemon/';
  let pokemonActual = {};

  // Función para obtener un Pokémon aleatorio de la primera generación (1-151)
  async function obtenerPokemonAleatorio() {
    const numeroAleatorio = Math.floor(Math.random() * 151) + 1; // Primera generación
    const urlPokemon = `${urlBase}${numeroAleatorio}`;

    try {
      const respuesta = await fetch(urlPokemon);
      const datos = await respuesta.json();
      pokemonActual = {
        nombre: datos.name,
        imagen: datos.sprites.front_default
      };
      mostrarPokemon();
    } catch (error) {
      console.error('Error al obtener el Pokémon', error);
    }
  }

  // Función para mostrar el Pokémon actual
  function mostrarPokemon() {
    document.getElementById('mensaje').innerText = '';
    document.getElementById('imagenPokemon').src = pokemonActual.imagen;
    document.getElementById('respuesta').value = '';
  }

  // Función para verificar la respuesta del usuario
  function verificarRespuesta() {
    const respuestaUsuario = document.getElementById('respuesta').value.toLowerCase();
    if (respuestaUsuario === pokemonActual.nombre) {
      document.getElementById('mensaje').innerText = '¡Correcto! ¡Ese es el Pokémon!';
      obtenerPokemonAleatorio(); // Obtener otro Pokémon después de acertar
    } else {
      document.getElementById('mensaje').innerText = 'Incorrecto. ¡Sigue intentando!';
    }
  }

  // Iniciar el juego al cargar la página
  window.onload = obtenerPokemonAleatorio;













login()