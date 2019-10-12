/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

const $calcularEdades = document.querySelector("#calcular-edades");
const infoEdades = document.querySelector("#info-edades");
const $resetear = document.querySelector("#resetear");
const familia = document.querySelector("#familia");

function agregarFamiliares(n) {
    for (let i = 1; i <= n; i++) {
        const label = document.createElement("label");
        const edadFamiliar = document.createTextNode(`Edad del familiar ${i}:`);
        const input = document.createElement("input");
        input.type = "number";
        input.classList.add("edad");
        input.id = `edad-${i}`;
        const div = document.createElement("div");
        label.appendChild(edadFamiliar);
        familia.appendChild(label);
        familia.appendChild(input);
        familia.appendChild(div);

    }
}

agregarFamiliares(prompt("Cuantos miembros tiene la familia?"));

function menorNodo(edades) {
    let menor = Number(edades[0].value);
    for (let el of edades) {
        if (Number(el.value) < menor) {
            menor = Number(el.value);
        }
    }
    return menor;
}

function mayorNodo(nodo) {
    let mayor = Number(nodo[0].value);
    for (let el of nodo) {
        if (Number(el.value) > mayor) {
            mayor = Number(el.value);
        }
    }
    return mayor;
}

function promedioNodo(nodo) {
    let promedio = 0;
    for (let el of nodo) {
        promedio += Number(el.value);
    }
    return promedio / nodo.length;
}

function agregarALista(lista, texto) {
    const txt = document.createTextNode(texto);
    const div = document.createElement("div");
    lista.appendChild(txt);
    lista.appendChild(div);
}

$calcularEdades.onclick = function () {
    const edades = document.querySelectorAll(".edad");
    agregarALista(infoEdades, `La menor edad es ${menorNodo(edades)}`);
    agregarALista(infoEdades, `La mayor edad es ${mayorNodo(edades)}`);
    agregarALista(infoEdades, `La edad promedio es ${promedioNodo(edades)}`);
    return false;
}

$resetear.onclick = function () {
    document.getElementById("familia").reset();
    while (infoEdades.hasChildNodes()) {
        infoEdades.removeChild(infoEdades.childNodes[0]);
    }
    while (familia.hasChildNodes()) {
        familia.removeChild(familia.childNodes[0]);
    }
    agregarFamiliares(prompt("Cuantos miembros tiene la familia?"))
    return false;
}

/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/


const infoSueldos = document.querySelector("#info-sueldos");
const sueldos = document.querySelector("#sueldos");
const $agregarSueldo = document.querySelector("#agregar-sueldo");
const $quitarSueldo = document.querySelector("#quitar-sueldo");
const $calcularSueldos = document.querySelector("#calcular-sueldos");

function agregarSueldos() {
    let contadorSueldos = (sueldos.childNodes.length - 1) / 3;
    const label = document.createElement("label");
    const sueldoFamiliar = document.createTextNode(`Sueldo anual del familiar ${contadorSueldos + 1}:`);
    const input = document.createElement("input");
    input.type = "number";
    input.classList.add("sueldo");
    input.id = `sueldo-${contadorSueldos + 1}`;
    const div = document.createElement("div");
    label.appendChild(sueldoFamiliar);
    sueldos.appendChild(label);
    sueldos.appendChild(input);
    sueldos.appendChild(div);
}

function filtrarInputsVacios(nodo) {
    let filtrados = [];
    for (let i = 0; i < nodo.length; i++) {
        if (nodo[i].value !== "") {
            filtrados.push(nodo[i]);
        }
    }
    return filtrados;
}

$agregarSueldo.onclick = function () {
    agregarSueldos()
    return false;
}

$quitarSueldo.onclick = function () {
    for (let i = 0; i < 3; i++) {
        sueldos.removeChild(sueldos.lastChild);
    }
    return false;
}

$calcularSueldos.onclick = function () {
    while (infoSueldos.hasChildNodes()) {
        infoSueldos.removeChild(infoSueldos.childNodes[0]);
    }
    const sueldos = document.querySelectorAll(".sueldo");
    const sueldosFiltrados = filtrarInputsVacios(sueldos);
    agregarALista(infoSueldos, `El menor sueldo anual es $${menorNodo(sueldosFiltrados)}`);
    agregarALista(infoSueldos, `El mayor sueldo anual es $${mayorNodo(sueldosFiltrados)}`);
    agregarALista(infoSueldos, `El sueldo anual promedio es $${promedioNodo(sueldosFiltrados)}`);
    agregarALista(infoSueldos, `El sueldo mensual promedio es $${promedioNodo(sueldosFiltrados) / 12}`);
    return false;
}