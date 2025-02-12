<script setup>
import { ref, computed, onMounted } from 'vue';

const offset = ref(0);
const limit = ref(50);
const allPokemon = ref([]);
const keyword = ref('');

const typeColors = {
  normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C',
  grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1',
  ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
  rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746',
  steel: '#B7B7CE', fairy: '#D685AD'
};

const fetchPromise = async (URL) => {
  try {
    const response = await fetch(URL);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getAllPokemon = async () => {
  const response = await fetchPromise(`https://pokeapi.co/api/v2/pokemon?offset=${offset.value}&limit=${limit.value}`);
  if (response?.results) {
    const pokemonList = response.results;
    const detailedPokemon = await Promise.all(pokemonList.map(pokemon => fetchPromise(pokemon.url)));

    allPokemon.value = [...allPokemon.value, ...detailedPokemon];
  }
};

const filteredPokemon = computed(() => {
  return allPokemon.value.filter(pokemon => pokemon.name.toLowerCase().includes(keyword.value.toLowerCase()));
});

const loadMore = () => {
  offset.value += limit.value;
  getAllPokemon();
};

onMounted(getAllPokemon);
</script>

<template>
   <div class="search">
    <input v-model="keyword" placeholder="Tìm kiếm Pokémon" />

   

    <div id="app">
      <div v-for="pokemon in filteredPokemon" :key="pokemon.name" class="card">
        <img :src="pokemon.sprites.front_default" alt="Pokemon">
        <h2>{{ pokemon.name }}</h2>
        <div class="divType">
          <span class="type" :style="{ backgroundColor: typeColors[pokemon.types[0].type.name] }">
            {{ pokemon.types[0].type.name }}
          </span>
          <span v-if="pokemon.types[1]" class="type2" :style="{ backgroundColor: typeColors[pokemon.types[1].type.name] }">
            {{ pokemon.types[1].type.name }}
          </span>
        </div>
      </div>
    </div>
    <div class="container-button"><button @click="loadMore">LoadMore</button></div>
  </div>
</template>
<style >
.card{
        border: 2px solid rgb(221, 214, 214);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color:white;
        width: 150px;
        height: 200px;
        border-radius: 20px;
        z-index: inherit;
        
        box-shadow: #0000001a 0 4px 12px;
        

    }
.card:hover{
        box-shadow: 3px 2px 2px 2px rgb(214, 210, 210);
        transform: translateZ(10px);
    }
#app{
    display: grid;
    grid-template-columns: auto auto auto auto auto auto  ;
    column-gap: 3px;
    row-gap: 3px;
    width: 80%;
}
button{
   
    width: 80px;
    height: 40px;
    border-radius: 12px;
    background-color: red;
    color: white;

   
}
.search{
  text-align: center;
  margin-top: 50px;
}
  
.search > input{
  margin-bottom: 50px;
}



p{
    font-weight: 400px;
    font-size: 50px;
}
input{
    width: 350px;
    height: 40px;
    border-radius: 25px;
}
.container-button{
  text-align: center;
  margin-top: 50px;
}
.container{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
}
.type{
    font-size: 15px;
    border: 2px;
    background-color: rgb(16, 210, 68);
    border-radius: 5px;
}
.type2{
    font-size: 15px;
    border: 2px;
    background-color: purple;
    padding-left: 10px;
    border-radius: 5px;
    

}
.type,.type2{
    display: block;
   
    height: 25px;
    text-align: center;
}
.name{
    font-size: 20px;
}
.divType{
    display: flex;
    gap: 5px;
}





header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
