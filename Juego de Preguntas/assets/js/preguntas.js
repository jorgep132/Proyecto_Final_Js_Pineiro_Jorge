class Pregunta {
    constructor(pregunta, opciones, respuesta){
        this.pregunta = pregunta
        this.opciones = opciones
        this.respuesta = respuesta
    }
}


const Programacion = [
    new Pregunta('¿Cuál es la palabra clave para declarar una variable en JavaScript?', ['a) var', 'b) int', 'c) variable', 'd) let'], 'A'),
    new Pregunta('¿Qué función se utiliza para imprimir en la consola en JavaScript?', ['a) console.log()', 'b) print()', 'c) log.console()', 'd) display()'], 'A'),
    new Pregunta('¿Cómo se llama el operador de comparación estricta en JavaScript?', ['a) ==', 'b) ===', 'c) =', 'd) !='], 'B'),
    new Pregunta('¿Cuál es el resultado de 5 + "5" en JavaScript?', ['a) 10', 'b) "55"', 'c) 55', 'd) Error'], 'B'),
    new Pregunta('¿Qué método se utiliza para agregar un elemento al final de un array en JavaScript?', ['a) push()', 'b) insert()', 'c) append()', 'd) addToEnd()'], 'A'),
    new Pregunta('¿Qué significa HTML?', ['a) Hyper Text Markup Language', 'b) High-level Text Machine Language', 'c) Hyper Transfer Markup Language', 'd) Hyperlink and Text Markup Language'], 'A'),
    new Pregunta('¿Cuál es el operador de módulo en JavaScript?', ['a) %', 'b) /', 'c) *', 'd) -'], 'A'),
    new Pregunta('¿Qué es JSON?', ['a) JavaScript Object Notation', 'b) JavaScript Oriented Notation', 'c) JavaScript Output Notation', 'd) Java Standard Object Notation'], 'A'),
    new Pregunta('¿Cuál es el método utilizado para obtener la longitud de un array en JavaScript?', ['a) size()', 'b) length()', 'c) count()', 'd) sizeOf()'], 'B'),
    new Pregunta('¿En JavaScript, cómo se llama la función que se utiliza para convertir una cadena a un número entero?', ['a) parseInt()', 'b) toInt()', 'c) parseNumber()', 'd) toInteger()'], 'A'),
    new Pregunta('¿Qué significa CSS?', ['a) Cascading Style Sheet', 'b) Computer Style Sheet', 'c) Creative Style Sheet', 'd) Colorful Style Sheet'], 'A'),
    new Pregunta('¿Cuál es la propiedad CSS que se utiliza para cambiar el color del texto?', ['a) text-color', 'b) font-color', 'c) color', 'd) textColor'], 'C'),
    new Pregunta('¿Qué es AJAX?', ['a) Asynchronous JavaScript and XML', 'b) Asynchronous Java and XML', 'c) Asynchronous JavaScript and XHTML', 'd) Asynchronous Java and XHTML'], 'A'),
    new Pregunta('¿En JavaScript, qué método se utiliza para agregar y eliminar elementos de un array?', ['a) add/remove', 'b) splice()', 'c) append/prepend', 'd) insert/delete'], 'B'),
    new Pregunta('¿Qué significa API?', ['a) Application Programming Interface', 'b) Advanced Programming Interface', 'c) Application Program Interface', 'd) Advanced Program Interface'], 'A')
];

const Historia = [
    new Pregunta('¿Quién fue el primer presidente de Estados Unidos?', ['a) Abraham Lincoln', 'b) George Washington', 'c) Thomas Jefferson', 'd) John Adams'], 'B'),
    new Pregunta('¿En qué año comenzó la Primera Guerra Mundial?', ['a) 1914', 'b) 1918', 'c) 1939', 'd) 1945'], 'A'),
    new Pregunta('¿Cuál fue la civilización que construyó las pirámides de Egipto?', ['a) Griegos', 'b) Romanos', 'c) Egipcios', 'd) Babilonios'], 'C'),
    new Pregunta('¿Cuál fue el evento histórico conocido como "La Revolución Rusa"?', ['a) 1905', 'b) 1917', 'c) 1920', 'd) 1933'], 'B'),
    new Pregunta('¿Quién fue el líder de la Revolución Cubana en 1959?', ['a) Fidel Castro', 'b) Che Guevara', 'c) Raúl Castro', 'd) Fulgencio Batista'], 'A'),
    new Pregunta('¿En qué año ocurrió la independencia de Estados Unidos?', ['a) 1776', 'b) 1789', 'c) 1804', 'd) 1812'], 'A'),
    new Pregunta('¿Quién fue el autor de "El Príncipe"?', ['a) Maquiavelo', 'b) Shakespeare', 'c) Platón', 'd) Dante'], 'A'),
    new Pregunta('¿Cuál fue la dinastía gobernante en China durante la mayor parte del período imperial?', ['a) Ming', 'b) Qing', 'c) Han', 'd) Song'], 'C'),
    new Pregunta('¿En qué año terminó la Segunda Guerra Mundial?', ['a) 1945', 'b) 1949', 'c) 1955', 'd) 1939'], 'A'),
    new Pregunta('¿Quién fue el líder de la Revolución Francesa?', ['a) Napoleón Bonaparte', 'b) Luis XVI', 'c) Robespierre', 'd) María Antonieta'], 'C'),
    new Pregunta('¿Qué país fue el primero en llegar a la luna?', ['a) Estados Unidos', 'b) Rusia', 'c) China', 'd) Alemania'], 'A'),
    new Pregunta('¿En qué año se firmó la Declaración de Independencia de México?', ['a) 1810', 'b) 1821', 'c) 1836', 'd) 1848'], 'B'),
    new Pregunta('¿Quién fue el presidente de Sudáfrica que luchó contra el apartheid?', ['a) Nelson Mandela', 'b) F.W. de Klerk', 'c) Thabo Mbeki', 'd) Desmond Tutu'], 'A'),
    new Pregunta('¿Cuál fue la primera civilización en Mesopotamia?', ['a) Sumeria', 'b) Acadios', 'c) Babilonios', 'd) Asirios'], 'A'),
    new Pregunta('¿Quién fue el líder de la Revolución Rusa de 1917?', ['a) Vladimir Lenin', 'b) León Trotsky', 'c) Josef Stalin', 'd) Rasputín'], 'A')
];

const Geografia = [
    new Pregunta('¿Cuál es el río más largo del mundo?', ['a) Nilo', 'b) Amazonas', 'c) Yangtsé', 'd) Misisipi'], 'B'),
    new Pregunta('¿En qué continente se encuentra el Desierto del Sahara?', ['a) África', 'b) Asia', 'c) América', 'd) Europa'], 'A'),
    new Pregunta('¿Cuál es la capital de Australia?', ['a) Sydney', 'b) Melbourne', 'c) Canberra', 'd) Brisbane'], 'C'),
    new Pregunta('¿Cuántos océanos hay en la Tierra?', ['a) 3', 'b) 4', 'c) 5', 'd) 6'], 'C'),
    new Pregunta('¿Cuál es el país más grande del mundo en términos de territorio?', ['a) China', 'b) Estados Unidos', 'c) Rusia', 'd) Canadá'], 'C'),
    new Pregunta('¿Cuál es el pico más alto del mundo?', ['a) Everest', 'b) K2', 'c) Kilimanjaro', 'd) Aconcagua'], 'A'),
    new Pregunta('¿Cuál es la capital de Japón?', ['a) Pekín', 'b) Seúl', 'c) Tokio', 'd) Bangkok'], 'C'),
    new Pregunta('¿En qué país se encuentra la Gran Barrera de Coral?', ['a) México', 'b) Australia', 'c) Brasil', 'd) Indonesia'], 'B'),
    new Pregunta('¿Cuál es la montaña más alta de América del Sur?', ['a) Aconcagua', 'b) Huascarán', 'c) Chimborazo', 'd) Fitz Roy'], 'A'),
    new Pregunta('¿En qué continente se encuentra el río Amazonas?', ['a) África', 'b) Asia', 'c) América', 'd) Europa'], 'C'),
    new Pregunta('¿Cuál es el lago más grande del mundo?', ['a) Baikal', 'b) Victoria', 'c) Superior', 'd) Titicaca'], 'A'),
    new Pregunta('¿En qué país se encuentra la ciudad de Petra?', ['a) Egipto', 'b) Grecia', 'c) Jordania', 'd) Turquía'], 'C'),
    new Pregunta('¿Cuál es la isla más grande del mundo?', ['a) Groenlandia', 'b) Borneo', 'c) Madagascar', 'd) Sumatra'], 'A'),
    new Pregunta('¿En qué país se encuentra la ciudad de Estambul?', ['a) Grecia', 'b) Italia', 'c) Turquía', 'd) Egipto'], 'C'),
    new Pregunta('¿Cuál es el desierto más grande del mundo?', ['a) Sahara', 'b) Atacama', 'c) Gobi', 'd) Kalahari'], 'A')
];



export {Programacion, Historia, Geografia}