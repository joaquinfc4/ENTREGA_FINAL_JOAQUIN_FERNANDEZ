let carrito;

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
} else {
    carrito = [];
}


function agregarAlCarrito(trago) {
    if (carrito.some(el => el.id === trago.id)) {
        const indexTrago = carrito.findIndex(el => el.id === trago.id);
        carrito[indexTrago].cantidad += 1;
    } else {
        const nuevotrago = {
            ...trago,
            cantidad: 1,
        }
        carrito.push(nuevotrago);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));

    const randomPokemonId = Math.floor(Math.random() * 151) + 1;

    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
        .then(response => response.json())
        .then(data => {
            const pokemonName = data.name;
            const pokemonImage = data.sprites.other['official-artwork'].front_default;

            Toastify({
                text: `Agregado al carrito. ¡Te tocó ${pokemonName}!`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#4CAF50",
                stopOnFocus: true,
                style: {
                    borderRadius: "10px"
                }
            }).showToast();

            Swal.fire({
                title: `¡Te tocó ${pokemonName}!`,
                text: "¡Disfruta de tu compra!",
                imageUrl: pokemonImage,
                imageWidth: 100,
                imageHeight: 100,
                imageAlt: pokemonName,
                confirmButtonText: "¡Genial!"
            });
        })
        .catch(error => {
            console.error("Error al obtener el Pokémon:", error);
        });
}




function crearCard(trago, numeroId) {

    const contenedor = document.getElementById(`container${numeroId}`)

    const card = document.createElement("div");

    const image = document.createElement("img");
    image.className = "card-img-top img card";
    image.src = trago.image;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body bg-dark card";

    const title = document.createElement("h5");
    title.className = "card-title tituloHome";
    title.innerText = trago.title;

    const description = document.createElement("p");
    description.className = "card-text";
    description.innerText = trago.description;

    const comprar = document.createElement("div");
    comprar.className = "text-center ms-5";

    const botonComprar = document.createElement("a");
    botonComprar.className = "btn btn-primary btn-custom d-inline-block";
    botonComprar.innerText = "Comprar";
    botonComprar.addEventListener("click", () => agregarAlCarrito(trago));



    const precio = document.createElement("h4");
    precio.className = "d-inline-block";
    precio.innerText = `$${trago.precio}`;


    card.append(image);
    card.append(cardBody);

    cardBody.append(title);
    cardBody.append(description);
    cardBody.append(comprar);

    comprar.append(botonComprar);
    comprar.append(precio);

    contenedor.append(card);
}

tragosSinAlcohol.forEach(el => crearCard(el, 1));
tragosConAlcoholWhiskey.forEach(el => crearCard(el, 2));
tragosConAlcoholVodka.forEach(el => crearCard(el, 3));


