import { mensajeRegistrado, mensajeNoRegistrado, mensajeBienvenida} from "./alerts.js"


// Usuarios registrados en localStorage
const storedUsername = localStorage.getItem('username')
const storedUsuarios = JSON.parse(localStorage.getItem('usuarios')) || []
const usuarios = storedUsuarios


// Botones de login y logout
let botonLogin = document.querySelector('#botonLogin')
let botonLogout = document.querySelector('#botonLogout')
botonLogout.style.display = 'none' // El boton no esta a menos que tengamos la sesion iniciada.

// Boton para cerrar sesion
botonLogout.addEventListener('click', ()=>{ // Al cerrar sesión se recarga y aparece el boton de inicio de sesion
    localStorage.removeItem('username')
    console.log(localStorage)
    location.reload()

})

// Funcion principal para loguearse
function login (){
    botonLogin.addEventListener('click', () => { // El clickear sobre el boton iniciar sesion disparamos el evento de logueo
        Swal.fire({
            title: 'Iniciar Sesión',
            html: `
                <div class='swal-login'>
                    <label for="username">Usuario</label>
                    <input type="text" id="username" name="username" required>
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" required>
                    <p>¿No estás registrado? <a href="#" id="registroLink">Ingresa aquí</a></p>
                </div>`,
            confirmButtonText: 'Iniciar Sesión',
            preConfirm: () => { // Una vez completado los campos se valida si el usuario esta bien ingresado
                const username = document.getElementById('username').value.toLowerCase() // No discrimina de mayusculas y minusculas, una vez logueado el usuario siempre va a aparecer con la primer letra mayuscula
                const password = document.getElementById('password').value
    
                if (usuarios.some(usuario => usuario.username.toLowerCase() === username && usuario.password == password)) { // Flujo si el usuario se autenticó
                    mensajeBienvenida(username) 
                    guardarSesion(username) // Se guarda la sesion para que al recargar la pagina siga logueado
                    setTimeout(function() { // Una vez se inicia la sesion, se recarga la pagina automaticamente
                        location.reload()
                    }, 600) // 
                } else {
                    mensajeNoRegistrado() // En caso de ingresar datos erroneos, o inexistentes, se advierte con un popup.
                }
            }
        })
    
        const registroLink = document.querySelector('#registroLink') // Link para registrarse
        registroLink.addEventListener('click', () => {
            abrirPopupRegistro() // Funcion de registro
        })
    
    })
}

//Funcion para intercambiar el boton de login con nombre de usuario.
document.addEventListener('DOMContentLoaded', () => { // Si el usuario esta logueado, se vera el nombre de usuario y desaparece el boton de iniciar sesion, a su vez, aparece el boton de cerrar sesion.
    if (storedUsername) {
        // Si hay información de usuario en el localStorage, mostrar la información del usuario
        const textoUsuario = document.createElement('span')
        textoUsuario.classList.add('textoUsuario')
        textoUsuario.textContent = `Bienvenido/a: ${storedUsername.charAt(0).toUpperCase() + storedUsername.slice(1)}`
        botonLogout.style.display = 'block'

        // Reemplazar el botón con el nuevo elemento de texto
        botonLogin.parentNode.replaceChild(textoUsuario, botonLogin)
    } 
      
})


// Funcion para guardar el usuario hasta que cerremos sesión.-
function guardarSesion (username){
    localStorage.setItem('username', username)
}

// Funcion para registrarse
function abrirPopupRegistro() {
    Swal.fire({
        title: 'Registrarse',
        html: `
            <div class='swal-registro'>
                <label for="newUsername">Usuario:</label>
                <input type="text" id="newUsername" name="newUsername" placeholder="Debe contener entre 6 y 12 caracteres" required>
                <label for="newPassword">Contraseña:</label>
                <input type="password" id="newPassword" name="newPassword" placeholder="Debe contener entre 8 y 16 caracteres." required>
                <p id="registroError" style="color: red"></p>
            </div>`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Registrar',
        preConfirm: () => { // Se verifica que el usuario cumpla con las condiciones de registro.
            const newUsername = document.getElementById('newUsername').value.toLowerCase() 
            const newPassword = document.getElementById('newPassword').value
            
            if (!usuarioCaracteres(newUsername)){ // Se verifica que el usuario cumpla con la cantidad de caracteres correspondientes
                document.querySelector('#registroError').innerText = 'El usuario no cumple con las condiciones necesarias.'
                return false
            }
            
            else if (storedUsuarios.some(usuario => usuario.username === newUsername)) { // Validar si el nombre de usuario ya está en uso
                document.querySelector('#registroError').innerText = 'El usuario ya se encuentra en uso.'
                return false  // Impedir que se cierre el popup si hay un error

            } else if(!passwordCaracteres(newPassword)) { // Validar que la contraseña cumpla con la cantidad minima y maxima de caracteres
                document.querySelector('#registroError').innerText = 'La contraseña no cumple con las condiciones necesarias.'
                return false
                
            } else { // Si se cumplen todas las conidiciones, se crea el usuario
                mensajeRegistrado(newUsername)
                const nuevoUsuario = { username: newUsername, password: newPassword }
                storedUsuarios.push(nuevoUsuario)
                localStorage.setItem('usuarios', JSON.stringify(storedUsuarios))
            }
        }
    })
}


// Funcion para limitar cantidad de caracteres del usuario
function usuarioCaracteres (username){
    const min = 6
    const max = 12

    return username.length >= min && username.length <= max && username.trim() !== ''
}

// Funcion para limitear cantidad de caracteres de password
function passwordCaracteres (password){
    const min = 8
    const max = 16

    return password.length >= min && password.length <= max && password.trim() !== ''
}


// Funcion para confirmar que el usuario este logueado
function usuarioAutenticado() {
    return localStorage.getItem('username') !== null
}

export {login, usuarioAutenticado}