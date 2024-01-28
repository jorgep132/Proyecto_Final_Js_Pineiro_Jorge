
class Pregunta {
    constructor(pregunta, opciones, respuesta){
        this.pregunta = pregunta
        this.opciones = opciones
        this.respuesta = respuesta
    }
}

// Preguntas que se ven a usar en el juego de quiz // 
const Programacion = [
    new Pregunta('¿Cuál es la palabra clave para declarar una variable en JavaScript?', ['a) var', 'b) int', 'c) variable', 'd) let'], 'A'),
    new Pregunta('¿Qué función se utiliza para imprimir en la consola en JavaScript?', ['a) console.log()', 'b) print()', 'c) log.console()', 'd) display()'], 'A'),
    new Pregunta('¿Cómo se llama el operador de comparación estricta en JavaScript?', ['a) ==', 'b) ===', 'c) =', 'd) !='], 'B'),
    new Pregunta('¿Cuál es el resultado de 5 + "5" en JavaScript?', ['a) 10', 'b) "55"', 'c) 55', 'd) Error'], 'B'),
    new Pregunta('¿Qué método se utiliza para agregar un elemento al final de un array en JavaScript?', ['a) push()', 'b) insert()', 'c) append()', 'd) addToEnd()'], 'A'),
    new Pregunta('¿Qué significa HTML?', ['a) Hyper Text Markup Language', 'b) High-level Text Machine Language', 'c) Hyper Transfer Markup Language', 'd) Hyperlink and Text Markup Language'], 'A'),
    new Pregunta('¿Cuál es el operador de módulo en JavaScript?', ['a) %', 'b) /', 'c) *', 'd) -'], 'A'),
];

const Historia = [
    new Pregunta('¿Quién fue el primer presidente de Estados Unidos?', ['a) Abraham Lincoln', 'b) George Washington', 'c) Thomas Jefferson', 'd) John Adams'], 'B'),
    new Pregunta('¿En qué año comenzó la Primera Guerra Mundial?', ['a) 1914', 'b) 1918', 'c) 1939', 'd) 1945'], 'A'),
    new Pregunta('¿Cuál fue la civilización que construyó las pirámides de Egipto?', ['a) Griegos', 'b) Romanos', 'c) Egipcios', 'd) Babilonios'], 'C'),
    new Pregunta('¿Cuál fue el evento histórico conocido como "La Revolución Rusa"?', ['a) 1905', 'b) 1917', 'c) 1920', 'd) 1933'], 'B'),
    new Pregunta('¿Quién fue el líder de la Revolución Cubana en 1959?', ['a) Fidel Castro', 'b) Che Guevara', 'c) Raúl Castro', 'd) Fulgencio Batista'], 'A'),
    new Pregunta('¿En qué año ocurrió la independencia de Estados Unidos?', ['a) 1776', 'b) 1789', 'c) 1804', 'd) 1812'], 'A'),
    new Pregunta('¿Quién fue el autor de "El Príncipe"?', ['a) Maquiavelo', 'b) Shakespeare', 'c) Platón', 'd) Dante'], 'A'),
];

const Geografia = [
    new Pregunta('¿Cuál es el río más largo del mundo?', ['a) Nilo', 'b) Amazonas', 'c) Yangtsé', 'd) Misisipi'], 'B'),
    new Pregunta('¿En qué continente se encuentra el Desierto del Sahara?', ['a) África', 'b) Asia', 'c) América', 'd) Europa'], 'A'),
    new Pregunta('¿Cuál es la capital de Australia?', ['a) Sydney', 'b) Melbourne', 'c) Canberra', 'd) Brisbane'], 'C'),
    new Pregunta('¿Cuántos océanos hay en la Tierra?', ['a) 3', 'b) 4', 'c) 5', 'd) 6'], 'C'),
    new Pregunta('¿Cuál es el país más grande del mundo en términos de territorio?', ['a) China', 'b) Estados Unidos', 'c) Rusia', 'd) Canadá'], 'C'),
    new Pregunta('¿Cuál es el pico más alto del mundo?', ['a) Everest', 'b) K2', 'c) Kilimanjaro', 'd) Aconcagua'], 'A'),
    new Pregunta('¿Cuál es la capital de Japón?', ['a) Pekín', 'b) Seúl', 'c) Tokio', 'd) Bangkok'], 'C'),
];



export {Programacion, Historia, Geografia}