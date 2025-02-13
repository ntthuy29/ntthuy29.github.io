const app = document.querySelector('#app');
const input = document.querySelector('input');
const button = document.querySelector('button');
const bug =document.querySelector('.bug')

let pokemons = [];
let limit = 20;
let offset = 0;
let filterPokemon=[];


const typeColors = { 
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C', 
    grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1', 
    ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A', 
    rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746', 
    steel: '#B7B7CE', fairy: '#D685AD' 
};


async function getDataPokemon() {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const jsonData = await data.json();
    pokemons = jsonData.results;
    filterPokemon = pokemons;
    renderPokemon();
}


function renderPokemon() {
    
   
    filterPokemon.forEach(pokemon => {
        
        const div = document.createElement('div');
        div.className = 'card';

        const idNumber = pokemon.url.split('/').slice(-2, -1)[0]; 
        const img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idNumber}.png`;
        const divImg=document.createElement('div');
        divImg.className='container_img';
        const id = document.createElement('div');
        id.innerHTML = `#${idNumber}`;
        id.className='id';

        const name = document.createElement('h3');
        name.innerHTML = pokemon.name;
        name.className='name';

        const divType = document.createElement('div');
        divType.className='type'

        
        fetch(pokemon.url)
            .then(res => res.json())
            .then(pokeData => {
                pokeData.types.forEach(typeObj => {
                    const cardType = document.createElement('div');
                    cardType.className='typeItem'
                    cardType.innerHTML = typeObj.type.name;
                    cardType.style.backgroundColor = typeColors[typeObj.type.name] || '#389484';
                    divType.appendChild(cardType);
                });
            });
        divImg.appendChild(img);
        div.appendChild(id);
        div.appendChild(divImg);
        div.appendChild(name);
        div.appendChild(divType);
        app.appendChild(div);
    });
}


button.addEventListener('click', function() {
    offset += limit;
    getDataPokemon();
});
//Search
input.addEventListener('input', async function () {
    const key = input.value.trim().toLowerCase();
    app.innerHTML = ''; 
    button.style.display = 'none'; 

    offset=0;
    if (key === '') {
        
        getDataPokemon();
        button.style.display = 'inline-block';
    } else {
      
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=898`);
            const jsonData = await response.json();
            pokemons = jsonData.results;

           
            filterPokemon = pokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(key)
            );
            if(filterPokemon.length===0){
                app.innerHTML='No pokemon matched with '+ `'${key}'`;
                
            } 

            renderPokemon();
        } catch (error) {
            app.innerHTML = '<p>Không thể tải dữ liệu Pokémon!</p>';
            
        }
    }
    
});



getDataPokemon();
