document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContenedor = document.getElementById('carrito');
    let subtotal = 0;

    function actualizarSubtotal() {
        const subtotalText = document.getElementById('subtotalText');
        subtotalText.innerText = `Subtotal: $${subtotal}`;
    }

    function eliminarProducto(id) {
        carrito = carrito.filter(producto => producto.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));

        Toastify({
            text: "Producto eliminado del carrito",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "right", 
            backgroundColor: "#FF6347", 
            stopOnFocus: true, 
            style: {
                borderRadius: "10px"
            }
        }).showToast();

        actualizarCarrito();
    }

    function comprar() {
        if (carrito.length > 0) {
            Swal.fire({
                title: "Compra realizada con éxito!",
                icon: "success"
            }).then(() => {
                carrito = [];
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarrito();
            });
        } else {
            Swal.fire({
                title: "El carrito está vacío",
                icon: "info"
            });
        }
    }

    function actualizarCarrito() {
        carritoContenedor.innerHTML = '';
        subtotal = 0;

        carrito.forEach(producto => {
            const item = document.createElement('div');
            item.className = 'carrito-item';

            const imagen = document.createElement('img');
            imagen.src = producto.image;
            imagen.alt = producto.title;

            const info = document.createElement('div');
            info.className = 'carrito-item-info';

            const titulo = document.createElement('h5');
            titulo.innerText = producto.title;

            const precioInicial = document.createElement('p');
            precioInicial.innerText = `Precio: $${producto.precio}`;

            const cantidad = document.createElement('p');
            cantidad.innerText = `Cantidad: ${producto.cantidad}`;

            const subtotalProducto = producto.precio * producto.cantidad;
            subtotal += subtotalProducto;

            const subtotalElemento = document.createElement('div');
            subtotalElemento.className = 'carrito-item-subtotal';
            subtotalElemento.innerText = `$${subtotalProducto}`;

            const botonEliminar = document.createElement('button');
            botonEliminar.className = 'eliminar-btn';
            botonEliminar.innerText = 'Eliminar';
            botonEliminar.addEventListener('click', () => eliminarProducto(producto.id));

            info.appendChild(titulo);
            info.appendChild(precioInicial);
            info.appendChild(cantidad);

            item.appendChild(imagen);
            item.appendChild(info);
            item.appendChild(subtotalElemento);
            item.appendChild(botonEliminar);

            carritoContenedor.appendChild(item);
        });

        actualizarSubtotal();
    }

    actualizarCarrito();

    const comprarBtn = document.getElementById('comprarBtn');
    comprarBtn.addEventListener('click', comprar);
});



