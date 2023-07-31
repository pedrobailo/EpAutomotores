class Producto {
    constructor(id, nombre, precio, description){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.description = description;
    }
}

// productos 

const productos = [
    new Producto (1, "Peugeot 308", 3500000, "Peugeot 308 Sport 2.0"),
    new Producto (2, "Ford Fiesta Kinetic", 3200000, "Ford Fiesta Kinetic 1.6"),
    new Producto (3, "Honda Fit", 4150000, "Honda Fit 2.0"),
    new Producto (4, "Toyota Hilux", 15000000, "Toyota Hilux 2.8 SRV AT"),
    new Producto (5, "volkswagen Gol Trend", 3750000, "Volkswagen Gol Trend 1.6"),
    new Producto (6, "BMW 1181 Sport", 12000000, "BMW 1181 Sport 1.6 Sportline"),
    new Producto (7, "Ford Focus", 6350000, "Ford Focus 2.0 SE plus"),
    new Producto (8, "Honda Civic", 7800000, "Honda Civic 2.0 Turbo"),
];

const carrito = [];                                                  

const botonesAgregarCarrito = document.getElementsByClassName("agregar-carrito");

for (let i = 0; i < botonesAgregarCarrito.length; i++) {
const boton = botonesAgregarCarrito[i];

boton.addEventListener("click", function() {
    const productoIndex = this.getAttribute("data-producto-index");
    const producto = productos[productoIndex];
    carrito.push(producto);

    guardarCarrito(carrito);

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1500,
    })
});
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//MODAL

// Obtener referencias a los elementos del DOM
const btnOpenModal = document.getElementById('btnOpenModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const cartModal = document.getElementById('cartModal');

// Función para abrir el modal
function openModal() {
    const cartItemsModal = document.getElementById('cartItemsModal');
    const cartTotal = document.getElementById('cartTotal');
    const cartEmpty = document.getElementById('cartEmpty');

    cartItemsModal.innerHTML = '';

    if (carrito.length === 0) {
        Toastify({
            text: "El carrito está vacío",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "center",
            backgroundColor: "red",
        }).showToast();
    } else {
        cartModal.style.display = 'block';
        cartEmpty.style.display = 'none';
        cartTotal.style.display = 'block';

        let total = 0;
        carrito.forEach((producto) => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - Precio: $${producto.precio}`;
            cartItemsModal.appendChild(li);
            total += producto.precio;
        });

        cartTotal.textContent = `Total: $${total}`;
    }
}


// Funcion para cerrar el modal
function closeModal() {
cartModal.style.display = 'none';
}

// Asignar eventos a los botones
btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);

// Cerrar el modal cuando se haga clic fuera de él
window.addEventListener('click', (event) => {
if (event.target === cartModal) {
    closeModal();
}
});

// Funcion vaciar carrito
function vaciarCarrito() {
    carrito.length = 0;
    guardarCarrito(carrito);
    openModal();

    const cartTotal = document.getElementById('cartTotal');
    cartTotal.textContent = 'Total: $0';

    const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');
    
}
document.getElementById('btnVaciarCarrito').addEventListener('click', vaciarCarrito);


const productContainer = document.querySelector("#product-container");

// function getProducts(){
//     return fetch("../JSON/productos.json")    
//     .then(response => response.json())
//     .then(data => {
//         const productos = data.results;

//         characterDiv.innerHTML =`
//         <div class="card">
//             <h3>${product.name}</h3>
//             <p>price:${product.precio}</p>
//             <button class="agregar-carrito"> Agregar al carrito </button>
//         </div>
//         `
//         productContainer.appendChild(characterDiv)   
//     });
//     // .catch(err => console.error(err));
// }

// getProducts()