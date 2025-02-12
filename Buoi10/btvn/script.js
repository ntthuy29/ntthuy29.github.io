const app = document.querySelector('#app'); 
const button = document.querySelector('button'); 
const input = document.querySelector('input');
const typeColors = { normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C', grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1', ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A', rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746', steel: '#B7B7CE', fairy: '#D685AD' };
let offset = 0; 
const limit = 50; 
let allPokemon = []; 
let filteredPokemon = [];

function fetchPromise(URL) {
    return fetch(URL)
        .then(response => response.json())
        .catch(error => {
            console.error(error);
            app.innerHTML = 'Oh no! Something went wrong.';
        });
}

function getGrassAndPoisonPokemon() {
    fetchPromise(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then(response => {
            const pokemonList = response.results;
            return Promise.all(
                pokemonList.map(pokemon => fetchPromise(pokemon.url))
            );
        })
        .then(detailedPokemon => {
            const grassPoisonPokemon = detailedPokemon.filter(function (pokemon) {
                return pokemon.types.some(function (value) {
                    return value.type.name === 'grass' || value.type.name === 'poison';
                });
            });

            allPokemon = allPokemon.concat(grassPoisonPokemon); 
            filteredPokemon = allPokemon; 
            render(filteredPokemon); 
        })
        .catch(error => {
            console.log('Something went wrong with Pokemon');
        });
}

function render(pokemonList) {
    app.innerHTML = ''; 
    pokemonList.forEach(pokemon => {
        const div = document.createElement('div');
        div.className = 'card';

        const img = document.createElement('img');
        img.src = pokemon.sprites.front_default;

        const name = document.createElement('h2');
        name.innerText = pokemon.name;

        const type = document.createElement('div');
        type.className = 'divType';
        const types1 = document.createElement('span');
        types1.innerText = pokemon.types[0].type.name;
        types1.className = 'type';
        types1.style.backgroundColor = typeColors[pokemon.types[0].type.name]

        const types2 = document.createElement('span');
        if (pokemon.types[1] ) {
            types2.innerText = pokemon.types[1].type.name;
            types2.className = 'type2';
            type.appendChild(types2);
            types2.style.backgroundColor = typeColors[pokemon.types[1].type.name]
        }
        type.appendChild(types1);
        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(type);
      
        app.appendChild(div);
    });
}


button.addEventListener('click', () => {
    offset += limit;
    getGrassAndPoisonPokemon();
});

input.addEventListener('input', function () {
    const keyword = input.value.toLowerCase(); 
    filteredPokemon = allPokemon.filter(function (pokemon) {
        return pokemon.name.toLowerCase().includes(keyword); 
    });
    render(filteredPokemon); 
});
getGrassAndPoisonPokemon();

