

// //type , xin hon thi 
const app = document.querySelector('#app')
const button = document.querySelector('button')
const input = document.querySelector('input')

function fetchPromise(URL) {
    return new Promise(
        function(resolve) {
            fetch(URL)
            .then(
                function(response) {
                    const promise = response.json()
                    resolve(promise)
                }
            )
            .catch(function(error) {
                console.log(error)
                app.innerHTML = 'Oh no! Some thing went wrong.'
            })
        }
    )
}

let offset = 0
const limit = 6
let pokemons = JSON.parse(localStorage.getItem('pokemonsData'))
let filteredPokemon = pokemons
let pokemonType = []
var poke=[];

if (pokemons && Array.isArray(pokemons) && pokemons.length) {
    render()
} else {
   
    fetchPromise('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898')
        .then(function (value) {
            app.innerHTML = '';
            pokemons = value.results;
            localStorage.setItem('pokemonsData', JSON.stringify(pokemons));
            return Promise.all(
                pokemons.map((pokemon) => fetchPromise(pokemon.url)) // Lấy chi tiết từng Pokémon
            );
        })
        .then((results) => {
            // Lọc Pokémon có kiểu Grass hoặc Poison
            filteredPokemon = results.filter((pokemon) =>
                pokemon.types.some(
                    (type) => type.type.name === 'grass' || type.type.name === 'poison'
                )
                
            );
            render();
        });
}

function render() {
    const renderLimit = offset + limit
    for (; offset < renderLimit; offset++) {
        const pokemon = filteredPokemon[offset]
        if (!pokemon) {
            button.style.display = 'none'
            break
        } else {
            button.style.display = 'block'
        }
        pokemonType.push(
            fetchPromise(pokemon.url)
        )


        // const div = document.createElement('div')
        // div.innerText = pokemon.name
        // app.appendChild(div)
        const div = document.createElement('div')
        div.className="card"
        const img = document.createElement('img')
        img.src=pokemon.sprites.front_default;
        const id = document.createElement('div')
        id.innerText=`#${offset+1}`
        const name = document.createElement("h2")
        name.innerText=pokemon.name
        div.appendChild(img)
        div.appendChild(name)
        div.appendChild(id)
        console.log("huhu")
        name.className = 'name'
        // const divGrass = document.createElement('div')
        // divGrass.innerText = pokemon.types.type.name

        document.querySelector("#app").appendChild(div)

    }
}

button.addEventListener('click', render)


input.addEventListener('input', function() {
    offset = 0;
    app.innerHTML = ''
    filteredPokemon = pokemons.filter(
        function(pokemon) {
            return pokemon.name.includes(input.value)
        }
    )
    render()
})

Promise.all(pokemonType)
.then(results => {
    console.log(results)
    results.forEach(pokemon => {
        console.log(pokemon.types)
    })
})

console.log(pokemons)
console.log(".........")
console.log(poke)

