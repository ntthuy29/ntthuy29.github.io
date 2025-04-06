<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const typeColors = { 
  normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C', 
  grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1', 
  ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A', 
  rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746', 
  steel: '#B7B7CE', fairy: '#D685AD' 
};

const pokemon = ref([]);
const pokemonSelected = ref(null);
const renderSelected = ref(null);
const listType = ref([]);
const listDescription = ref([]);
const listNumber = ref([]);
const evolutionNumber = ref('');
const route = useRoute();

async function getDataPokemon() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=896`);
    const data = await response.json();
    pokemon.value = data.results; 
    pokemonSelected.value = pokemon.value.find(poke => poke.name === route.params.id);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách Pokémon:", error);
  }
}

const id = ref('');
async function setPokemonId() {
  if (pokemonSelected.value) {
    const response = await fetch(pokemonSelected.value.url);
    const data = await response.json();
    id.value = data.id;
    await getAPI();
    await fetchEvolutionNumber();
    await fetchEvolutionChain();
    await getDescription();
  }
}
function getID(url){
  return  url.split("/").slice(-2, -1)[0];
}
function getPokemonImage(a) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${a}.png`;
}

async function getAPI() {
  if (!id.value) return;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id.value}`);
    const data = await response.json();
    renderSelected.value = data;
    listType.value = data.types;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin Pokémon:", error);
  }
}

async function fetchEvolutionNumber() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id.value}/`);
    const data = await response.json();
    evolutionNumber.value = data.evolution_chain.url;
  } catch (error) {
    console.error("Lỗi khi lấy Evolution Number:", error);
  }
}
const listChain = ref('');
async function fetchEvolutionChain() {
  console.log("chayj voo day roi nhe huhu")
  if (!evolutionNumber.value) return;
  try {
    const evolutionChainId = evolutionNumber.value.split("/").filter(Boolean).pop();
    const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${evolutionChainId}/`);
    const data = await response.json();

    let currentEvolution = data.chain;
    listNumber.value = [];

    while (currentEvolution) {
      const speciesUrl = currentEvolution.species.url;
      const pokemonId = speciesUrl.split("/").filter(Boolean).pop();
      const pokemonName = currentEvolution.species.name;

      listNumber.value.push({ id: pokemonId, name: pokemonName });
      currentEvolution = currentEvolution.evolves_to[0];
      listChain.value= listNumber.value;
    }
    console.log(listNumber.value);
  } catch (error) {
    console.error("Lỗi khi lấy chuỗi tiến hóa:", error);
  }
}
// console.log("huh"+listNumber.value)
async function getDescription() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id.value}/`);
    const data = await response.json();
    const englishDescriptions = data.flavor_text_entries.filter(entry => entry.language.name === "en");
    listDescription.value = englishDescriptions.map(entry => entry.flavor_text);
  } catch (error) {
    console.error("Lỗi khi lấy mô tả Pokémon:", error);
  }
}
function text(name) {
  const arr = name.split("-");

  if (arr.length === 1) {
    if (arr[0].length === 2) return arr[0];
    if (arr[0][arr[0].length - 1] !== arr[0][1]) {
      return arr[0].slice(0, 2) + arr[0][arr[0].length - 1];
    }
    return arr[0].slice(0, 3);
  }

  if (arr.length === 2) {
    return arr[0].slice(0, 2) + arr[1][0];
  }

  if (arr.length > 3) {
    return arr[0][0] + arr[1][0] + arr[2][0];
  }

  return "hihi";
}

onMounted(async () => {
  await getDataPokemon();
  await setPokemonId();
});
</script>

<template>
  <RouterLink to="/" class="backk">Back</RouterLink>
  <div class="detailContainer">
    <div class="popup">
     <img :src="getPokemonImage(id)" alt="">
      <div class="types">

        <div class="item_type" v-for="item in listType" :key="item.type.name" :style="{ backgroundColor: typeColors[item.type.name] }">
          {{ item.type.name }}
        </div>
      </div>
      <h1 class="name">{{ pokemonSelected?.name || 'Loading...' }}</h1>
      <div class="description">
        {{ listDescription.length > 0 ? listDescription[0].replace(/\n|\f/g, ' ') : 'Đang tải mô tả...' }}
      </div>
      <div class="height_weight">
        <div>
          <h2>Height</h2>
          <div>{{ renderSelected?.height || 'Loading height...' }}</div>
        </div>
        <div>
          <h2>Weight</h2>
          <div>{{ renderSelected?.weight || 'Loading weight...' }}</div>
        </div>
      </div>
      <div>
        <h2>Abilities</h2>
        <div class="abilities">
          <div v-for="item in renderSelected?.abilities" :key="item.ability.name">
            {{ item.ability.name }}
          </div>
        </div>
      </div>
      <div>
        <h2>Stats</h2>
        <div class="stats">
          <div v-for="item in renderSelected?.stats" :key="item.stat.name">
            <div>
              <div>{{ text(item.stat.name) }}</div>
              <div>{{ item.base_stat }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="evolution">
        <div class="imgEvolution" v-for="item in listNumber" :key="item.id">
       
          <div><h2>{{ item.name }}</h2></div>
          <img :src="getPokemonImage(item.id)" alt="Pokemon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.types {
  display: flex;
  gap: 8px;
}
.item_type {
  border-radius: 5px;
  padding-inline: 5px;
}
.popup {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stats,.evolution, .abilities {
  display: flex;
  gap: 20px;
}
.detailContainer {
  max-width: 1280px;
  margin: 0 auto;
  padding-left: 500px;
  
}
.backk{
  color: black;
  margin-left: 20px;
  border: 2px solid rgb(75, 72, 72);
  border-radius: 10px;
}
</style>
