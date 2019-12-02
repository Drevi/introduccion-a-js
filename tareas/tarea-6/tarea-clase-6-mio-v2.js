/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

const $calcularEdades = document.querySelector("#calcular-edades");
const $resetear = document.querySelector("#resetear");


function agregarFamiliar(n) {
    const $div = document.createElement("div");
    $div.className = "familiar";
    const $label = document.createElement("label");
    $label.textContent = `Edad del familiar ${n + 1}:`;
    const $input = document.createElement("input");
    $input.className = "edad"
    $div.appendChild($label);
    $div.appendChild($input);
    const $familia = document.querySelector("#familia");
    $familia.appendChild($div);
}

function borrarFamiliares() {
    const $familia = document.querySelector("#familia")
    while ($familia.hasChildNodes()) {
        $familia.removeChild($familia.childNodes[0]);
    }
}

function agregarFamiliares(n) {
    for (let i = 0; i < n; i++) {
        agregarFamiliar(i)
    }
}

document.querySelector("#siguiente").onclick = function () {
    const $cantidadFamiliares = document.querySelector("#familiares");
    const cantidadFamiliares = Number($cantidadFamiliares.value);
    if (cantidadFamiliares !== 0) {
        borrarFamiliares();
        agregarFamiliares(cantidadFamiliares);
        mostrarBotones();
    } else {
        resetear();
    }

}


function mostrarBotones() {
    const $botones = document.querySelectorAll(".ocultar");
    for (let el of $botones) {
        el.className = "mostrar"
    }
}
function ocultarBotones() {
    const $botones = document.querySelectorAll(".mostrar");
    for (let el of $botones) {
        el.className = "ocultar"
    }
}



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

function redondear(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

function agregarALista(lista, texto) {
    const txt = document.createTextNode(texto);
    const div = document.createElement("div");
    lista.appendChild(txt);
    lista.appendChild(div);
}

$calcularEdades.onclick = function () {
    const $infoEdades = document.querySelector("#info-edades");
    const edades = document.querySelectorAll(".edad");
    while ($infoEdades.hasChildNodes()) {
        $infoEdades.removeChild($infoEdades.firstChild);
    }
    agregarALista($infoEdades, `La menor edad es ${(menorNodo(edades))}`);
    agregarALista($infoEdades, `La mayor edad es ${mayorNodo(edades)}`);
    agregarALista($infoEdades, `La edad promedio es ${redondear(promedioNodo(edades))}`);
    return false;
}

function resetear() {
    document.getElementById("familiares").value = "";
    borrarFamiliares();
    ocultarBotones();
    return false;
}
$resetear.onclick = function () {
    resetear();
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
    if (sueldos.childNodes.length > 1) {
        for (let i = 0; i < 3; i++) {
            sueldos.removeChild(sueldos.lastChild);
        }
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
    agregarALista(infoSueldos, `El sueldo anual promedio es $${redondear(promedioNodo(sueldosFiltrados))}`);
    agregarALista(infoSueldos, `El sueldo mensual promedio es $${redondear(promedioNodo(sueldosFiltrados) / 12)}`);
    return false;
}