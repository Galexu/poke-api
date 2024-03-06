let listaPokemon = document.getElementById("listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let api = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(api + i)
        .then(response => response.json())
        .then(data => mostrarPokemon(data))
};


function mostrarPokemon(data) {
    let tipos = data.types.map(type =>
        `<p class="tipo ${type.type.name}">${type.type.name}</p>`
    );
    tipos = tipos.join("");

    let pokeId = data.id.toString();
    if (pokeId.length == 2) {
        pokeId = "0" + pokeId;
    } else if (pokeId.length == 1) {
        pokeId = "00" + pokeId;
    };

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
                    <p class="pokemon-id-back">#0${data.id}</p>
                    <div class="pokemon-imagen">
                        <img src="${data.sprites.other["official-artwork"].front_default}"
                            alt="Ditto">
                    </div>
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">#${pokeId}</p>
                            <h2 class="pokemon-nombre">${data.name}</h2>
                        </div>
                        <div class="pokemon-tipos">
                            ${tipos}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${data.height}M</p>
                            <p class="stat">${data.weight}KG</p>
                        </div>
                    </div>
                    `;
    listaPokemon.append(div);
};

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    console.log(botonId);
    listaPokemon.innerHTML = "";


    for (let i = 1; i <= 151; i++) {
        fetch(api + i)
            .then(response => response.json())
            .then(data => {

                if (boton.id === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipos => tipos.includes(botonId))) {

                        mostrarPokemon(data);
                    }
                };
            });
    };
}));







// $(document).ready(function () {
//     const listaPokemon = $("#listaPokemon");
//     const botonesHeader = $(".btn-header");
//     let api = "https://pokeapi.co/api/v2/pokemon/";

//     for (let i = 1; i <= 151; i++) {
//         $.get(api + i, function (data) {
//             mostrarPokemon(data);
//         });
//     }

//     function mostrarPokemon(data) {
//         let tipos = data.types.map(type =>
//             `<p class="tipo ${type.type.name}">${type.type.name}</p>`
//         );
//         tipos = tipos.join("");

//         let pokeId = data.id.toString();
//         if (pokeId.length == 2) {
//             pokeId = "0" + pokeId;
//         } else if (pokeId.length == 1) {
//             pokeId = "00" + pokeId;
//         }

//         const div = $("<div>").addClass("pokemon").html(`
//             <p class="pokemon-id-back">#0${data.id}</p>
//             <div class="pokemon-imagen">
//                 <img src="${data.sprites.other["official-artwork"].front_default}" alt="Ditto">
//             </div>
//             <div class="pokemon-info">
//                 <div class="nombre-contenedor">
//                     <p class="pokemon-id">#${pokeId}</p>
//                     <h2 class="pokemon-nombre">${data.name}</h2>
//                 </div>
//                 <div class="pokemon-tipos">
//                     ${tipos}
//                 </div>
//                 <div class="pokemon-stats">
//                     <p class="stat">${data.height}M</p>
//                     <p class="stat">${data.weight}KG</p>
//                 </div>
//             </div>
//         `);
//         listaPokemon.append(div);
//     }

//     botonesHeader.on("click", function (event) {
//         const botonId = $(this).attr("id");
//         listaPokemon.empty();

//         for (let i = 1; i <= 151; i++) {
//             $.get(api + i, function (data) {
//                 if (botonId === "ver-todos") {
//                     mostrarPokemon(data);
//                 } else {
//                     const tipos = data.types.map(type => type.type.name);
//                     if (tipos.includes(botonId)) {
//                         mostrarPokemon(data);
//                     }
//                 }
//             });
//         }
//     });
// });
