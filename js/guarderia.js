let precioPorDia = 2000

let banderaNombre = false
let banderaTamaño = false
let banderadias = false

console.log("Bienvenido a nuestra guardería canina")

let nombreCanino = prompt("Ingresa el nombre de tu canino:")

if (nombreCanino == "" || nombreCanino == null) {
    console.warn("Debe ingresar el nombre del canino")
} else {
    console.log("Nombre del canino: ", nombreCanino)
    banderaNombre = true
}

let tamaño = parseInt(prompt("Ingresa el número correspondiente al tamaño de tu mascota: 1 - Pequeño, 2 - Mediano, 3 - Grande"))

if (tamaño !== 1 && tamaño !== 2 && tamaño !== 3) {
    console.warn("Ingrese un número de tamaño valido")
} else {
    if (tamaño === 1) {
        console.log("Tamaño pequeño")
        banderaTamaño = true
    } else if (tamaño === 2) {
        precioPorDia = precioPorDia * 1.25
        console.log("Tamaño mediano")
        banderaTamaño = true
    } else if (tamaño === 3) {
        precioPorDia = precioPorDia * 1.5
        console.log("Tamaño grande")
        banderaTamaño = true
    }
}

let dias = parseInt(prompt("Indica el numero de días que nos acompañara en la guardería, de 10 a 19 días se aplica un descuento del 10% y 20 o mas días un 15%)"))

dias = Number(dias).toFixed(0)

if (dias > 0 && dias < 10) {
    console.log("Cantidad de dias: ", dias)
    banderadias = true
}
else if (dias >= 10 && dias < 20) {
    precioPorDia = precioPorDia * 0.9
    console.log("Cantidad de días: ", dias)
    banderadias = true
} else if (dias >= 20 && dias < 9999) {
    precioPorDia = precioPorDia * 0.85
    console.log("Cantidad de días: ", dias)
    banderadias = true
} else {
    console.warn("Ingrese un número de días!")
}
if (banderaNombre == true) {
    let cuidadosEspeciales = confirm(nombreCanino + " requiere cuidados especiales?")

    let costoAdicionalEspeciales = 0

    if (cuidadosEspeciales == true) {
        let opcionSeleccionada = parseInt(prompt("Ingrese el número correspondiente: 1 - Medicación, 2 - Cuidados por discapacidad"));
        switch (opcionSeleccionada) {
            case 1:
                costoAdicionalEspeciales = 1.1;
                console.log("10% adicional por medicación")
                break;
            case 2:
                costoAdicionalEspeciales = 1.25;
                console.log("25% adicional por discapacidad")
                break;
            default:
                costoAdicionalEspeciales = 1;
                console.warn("No ha ingresado la opcion correcta")
                break;
        }

        precioPorDia = precioPorDia * costoAdicionalEspeciales

    } else {
        console.log("Sin cuidados especiales")
    }
}


function calcularPrecioEstadia(diasEstadia) {
    let estadia = precioPorDia * diasEstadia
    return estadia
}

estadia = calcularPrecioEstadia(dias)

function mostrarPrecioDia(precioTotal) {
    console.log("El importe detallado es:")
    for (i = 1; i <= dias; i++) {
        console.log(i + "° dia. Costo: ", parseFloat(precioTotal / dias).toFixed(2))
    }
}

if (banderaNombre == true && banderaTamaño == true && banderadias == true) {
    mostrarPrecioDia(estadia)
    console.log("Costo total de la estadia: ", calcularPrecioEstadia(dias))
    alert("Costo total de la estadia: $" + calcularPrecioEstadia(dias))
} else {
    console.error("No ha ingresado los datos correctamente para el presupuesto")
}

