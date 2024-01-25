class Pregunta {
    constructor(pregunta, opciones, respuesta){
        this.pregunta = pregunta
        this.opciones = opciones
        this.respuesta = respuesta
    }
}


const Programacion = [
     new Pregunta ('¿Qué tipo de datos es "int"?', ['Entero', 'Alfabetico', 'Cadena de caracteres', 'Lista'], 0)

]

export {Programacion}