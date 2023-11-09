const carritoPS = []

const producto = [{ id: 1, nombre: 'Buzo Polar Piel Estampado T1', importe: 4000, categoria: 'Ropa' },
{ id: 2, nombre: 'Buzo Polar Piel Estampado T2', importe: 4500, categoria: 'Ropa' },
{ id: 3, nombre: 'Buzo Polar Piel Estampado T3', importe: 5000, categoria: 'Ropa' },
{ id: 4, nombre: 'Buzo Polar Piel Estampado T4', importe: 5500, categoria: 'Ropa' },
{ id: 5, nombre: 'Buzo de Friza T1', importe: 3500, categoria: 'Ropa' },
{ id: 6, nombre: 'Buzo de Friza T2', importe: 4000, categoria: 'Ropa' },
{ id: 7, nombre: 'Buzo de Friza T3', importe: 4500, categoria: 'Ropa' },
{ id: 8, nombre: 'Buzo de Friza T4', importe: 5000, categoria: 'Ropa' },
{ id: 9, nombre: 'Muñeco de tela', importe: 2500, categoria: 'Juguetes' },
{ id: 10, nombre: 'Hueso de soga', importe: 2000, categoria: 'Juguetes' },
{ id: 11, nombre: 'Oreja de cerdo', importe: 1000, categoria: 'Comida' },
{ id: 12, nombre: 'Balanceado Royal Canin 10kg', importe: 20000, categoria: 'Comida' },
{ id: 13, nombre: 'Balanceado Royal Canin 20kg', importe: 35000, categoria: 'Comida' },
{ id: 14, nombre: 'Balanceado Nutribon Plus 20kg', importe: 20000, categoria: 'Comida' }]

function buscarProducto(id) {
    let resultado = producto.find((productoBuscado) => productoBuscado.id === id)
    return resultado
}

function limpiarCarrito() {
    if (carritoPS.length > 4) {
        carritoPS[0].importe *= 2
    }
    carritoPS.length = 0
}

function obtenerIds(productos) {
    const identificadores = new Set()
    productos.forEach(producto => {
        identificadores.add(producto.id)
    })
    const identificaoresLista = Array.from(identificadores)
    return identificaoresLista
}

function corregirCarrito() {
    let corregirCompra = confirm("Si has agregado un articulo por error puedes quitarlo. Deseas hacerlo?")
    if (corregirCompra) {
        carritoCorregido = quitarProductos(carritoPS)
        let quitarProducto = confirm("Deseas quitar otro producto?")
        if (quitarProducto) {
            carritoCorregido = quitarProductos(carritoPS)
        }
    }
}

function quitarProductos(carrito) {
    let listaIds = obtenerIds(carrito)
    let id = prompt("Ingresa el ID del producto que quieres quitar del carrito:")
    let productoEliminado = false
    for (let i = 0; i < carritoPS.length; i++) {
        if (carrito[i].id === parseInt(id)) {
            carrito.splice(i, 1)
            productoEliminado = true
            break
        }
    }
    if (productoEliminado === false) {
        console.log("No se encontró ningún producto con ese ID en el carrito.")
    } else {
        return carrito
    }
}


function ordenarCarrito() {
    carritoPS.sort((a, b) => {
        if (a.importe > b.importe) {
            return 1
        }
        if (a.importe < b.importe) {
            return -1
        }
        return 0
    })
}

function medioDePago(importe) {
    let continuarCompra = true
    while (continuarCompra) {
        let medioDePago = parseInt(prompt("Ingrese medio de pago: \n1-Debito\n2-Credito\n3-Transferencia"))
        switch (medioDePago) {
            case 1:
                importe *= 1.1
                let debito = confirm("Este medio de pago tiene un recargo del 10% \nDesea continuar con la compra con este medio de pago?")
                if (debito) {
                    return importe
                }
                break
            case 2:
                importe *= 1.15
                let credito = confirm("Este medio de pago tiene un recargo del 15% \nDesea continuar con la compra con este medio de pago?")
                if (credito) {
                    return importe
                }
                break
            case 3:
                alert("Datos para el pago por transferencia bancaria.\nCBU: 0000029000090230491021\nBanco: BruBank\nTitular: Marisa Rodriguez\nEnviar comprobante por Whatsapp a +541155197866")
                return importe
            default:
                alert("Debe ingresar un medio de pago correcto")
                continuarCompra = confirm("Desea continuar con la compra?")
                if (!continuarCompra) {
                    limpiarCarrito()
                    return 0
                }
        }
    }
}


function comprar() {
    console.table(producto)
    let productoID = prompt("Ingresa el ID del producto que quieres comprar:")
    let seleccion = buscarProducto(parseInt(productoID))
    if (seleccion !== undefined) {
        carritoPS.push(seleccion)
        let confirmacionCarrito = confirm("Te interesa agregar otro producto?")
        if (confirmacionCarrito) {
            comprar()
        } else {
            corregirCarrito()
            const procesarCarrito = new Compra(carritoPS)
            let importePago = procesarCarrito.calcularImporte()
            importePago = (medioDePago(importePago)).toFixed(0)
            console.table(carritoPS)
            if (carritoPS.length > 4) {
                alert("El total de la compra es: " + importePago + "\nSe aplico un descuento del 50% sobre el producto: " + carritoPS[0].nombre)
                console.log("El total de la compra es: " + importePago + "\nSe aplico un descuento del 50% sobre el producto: " + carritoPS[0].nombre)
            } else {
                alert("El total de la compra es: " + importePago)
                console.log("El total de la compra es: " + importePago)
            }
            limpiarCarrito()
        }
    } else {
        alert("Error en el ID ingresado")
        limpiarCarrito()
    }
}