/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

const cantidadFamiliares = prompt("Cuantos miembros tiene la familia?");
const $calcular = document.querySelector("#calcular");
const infoEdades = document.querySelector("#info-edades");
const $resetear = document.querySelector("#resetear");

function agregarFamiliares(n) {
    for (let i = 1; i <= n; i++) {
        const form = document.querySelector("#familia");
        const label = document.createElement("label");
        const edadFamiliar = document.createTextNode(`Edad del familiar ${i}:`);
        const input = document.createElement("input");
        input.type = "number";
        input.classList.add("edad");
        input.id = `edad-${i}`;
        const div = document.createElement("div");
        label.appendChild(edadFamiliar);
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(div);

    }
}

function menorEdad(edades) {
    let menor = Number(edades[0].value);
    for (let el of edades) {
        if (Number(el.value) < menor) {
            menor = Number(el.value);
        }
    }
    return menor;
}

function mayorEdad(edades) {
    let mayor = Number(edades[0].value);
    for (let el of edades) {
        if (Number(el.value) > mayor) {
            mayor = Number(el.value);
        }
    }
    return mayor;
}

function promedioEdad(edades) {
    let promedio = 0;
    for (let el of edades) {
        promedio += Number(el.value);
    }
    return promedio / edades.length;
}

function agregarALista(lista, texto) {
    const txt = document.createTextNode(texto);
    const div = document.createElement("div");
    lista.appendChild(txt);
    lista.appendChild(div);
}

agregarFamiliares(cantidadFamiliares);

$calcular.onclick = function () {
    const edades = document.querySelectorAll(".edad");
    agregarALista(infoEdades, `La menor edad es ${menorEdad(edades)}`);
    agregarALista(infoEdades, `La mayor edad es ${mayorEdad(edades)}`);
    agregarALista(infoEdades, `La edad promedio es ${promedioEdad(edades)}`);
    return false;
}

$resetear.onclick = function () {
    document.getElementById("familia").reset(); 
    while (infoEdades.hasChildNodes()) {
        infoEdades.removeChild(infoEdades.childNodes[0]);
    }
    return false;
}

/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/