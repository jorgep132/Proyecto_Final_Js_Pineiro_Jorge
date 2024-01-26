class Pregunta {
    constructor(pregunta, opciones, respuesta){
        this.pregunta = pregunta
        this.opciones = opciones
        this.respuesta = respuesta
    }
}


const Programacion = [
     new Pregunta ('¿Qué tipo de datos es "int"?', ['Entero', 'Alfabetico', 'Cadena de caracteres', 'Lista'], 'A'),
     new Pregunta ('¿Qué tipo de datos es "string"?', ['Entero', 'Alfabetico', 'Cadena de caracteres', 'Lista'], 'C')
]   

const Historia = [
    new Pregunta ('¿En que año nacio lucas nahuel cornejo?', ['Entero', 'Alfabetico', 'Cadena de caracteres', 'Lista'], 'A'),
    new Pregunta ('¿En que año nacio Maldo"?', ['Entero', 'Alfabetico', 'Cadena de caracteres', 'Lista'], 'C')
]   


export {Programacion, Historia}