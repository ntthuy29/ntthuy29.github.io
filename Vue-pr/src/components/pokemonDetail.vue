<script setup>
import {ref, onMounted,computed} from 'vue';

const typeColors = { 
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C', 
    grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1', 
    ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A', 
    rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746', 
    steel: '#B7B7CE', fairy: '#D685AD' 
};
    const props = defineProps({
        pokemonSelected:{
            type: Object,
            required: true
        },
        getPokemonImage:{
            type: Function,
            required: true
        }
    })
    const listType = ref([]);
    let renderSelected =ref({});
async function getAPI(){
    const response = await fetch(props.pokemonSelected.url);
    const data = await response.json();
    renderSelected.value=data;
    listType.value = data.types;
}
const id = computed(() => {
  if (props.pokemonSelected.url) {
    return props.pokemonSelected.url.split("/").filter(Boolean).pop();
  }
  return null;
});
let evolutionNumber = ref({});
let number = ref();
let listEvolution = ref({});
let listEvolutionTo = ref([]);
let listNumber = ref([]);

// Hàm lấy ID evolution chain từ species
async function fetchEvolutionNumber() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id.value}/`);
  const data = await response.json();

  evolutionNumber.value = data.evolution_chain.url;
  number.value = evolutionNumber.value.split("/").filter(Boolean).pop();
}

// Hàm lấy toàn bộ danh sách tiến hóa
// Sửa API lấy chuỗi tiến hóa
async function fetchEvolutionChain() {
  const evolutionChainId = evolutionNumber.value.split("/").filter(Boolean).pop();
  const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${evolutionChainId}/`);
  const data = await response.json();

  let currentEvolution = data.chain;
  while (currentEvolution) {
  const speciesUrl = currentEvolution.species.url;
  const pokemonId = speciesUrl.split("/").filter(Boolean).pop();
  const pokemonName = currentEvolution.species.name; // Lấy tên Pokémon

  listNumber.value.push({
    id: pokemonId,
    name: pokemonName
  });

  currentEvolution = currentEvolution.evolves_to[0]; // Tiến hóa tiếp theo
}
}


const listDesciption = ref([]);

async function getDescription() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id.value}/`);
    
    const data = await response.json();
  
    // Lọc ra các đoạn mô tả bằng tiếng Anh
    const englishDescriptions = data.flavor_text_entries.filter(
      entry => entry.language.name === "en"
    );
    // Lấy đoạn mô tả đầu tiên
    listDesciption.value = englishDescriptions.map(entry => entry.flavor_text);
    console.log(listDesciption.value[0])
  } catch (error) {
    console.error("Lỗi khi lấy mô tả:", error);
  }
}
function abbreviateStat(statName) {
  const parts = statName.split('-');

  if (parts.length === 2) {
    return (
      parts[0].substring(0, 2) + parts[1].slice(-1).toUpperCase()
    );
  }

  if (parts.length > 2) {
    return parts.map(part => part[0].toUpperCase()).join('');
  }

  return (
    (statName.substring(0, 2) + statName[statName.length - 1]).toUpperCase()
  );
}


onMounted(async () => {
  await getAPI();
  if (id.value) {
    await getDescription();
  }
  await fetchEvolutionNumber();
  await fetchEvolutionChain();
});
</script>
<template>
    <div class="detailContainer">
        <div class="popup">
        <!-- <CardPokemon :poke="pokemonSelected" 
        :getPokemonImage="getPokemonImage"
        stateId="none"/> -->
        <img :src="getPokemonImage(pokemonSelected.url)" alt="">
        <div class="types" >
                    <div  class="item_type" v-for="item in listType"
                    :style="{backgroundColor: typeColors[item.type.name]}">{{ item.type.name }}</div>

                </div>
        <h1 class="name">{{ pokemonSelected.name }}</h1>
        <div class="description">
  {{ listDesciption && listDesciption.length > 0 ? listDesciption[0].replace(/\n|\f/g, ' ') : 'Đang tải mô tả...' }}
</div>

<div class="height_weight">

 <div> <h2>Height</h2><div> {{ renderSelected.height ? renderSelected.height : 'Loading height...' }}</div></div>
 <div> <h2>Weight</h2><div>{{ renderSelected.weight ? renderSelected.weight : 'Loading weight...' }}</div></div>
 
</div>
<div >
  <div ><h2>Abilities</h2></div>
  <div  class="abilities"><div v-for="item in renderSelected.abilities" :key="item.ability.name">
  {{ item.ability.name }}
</div></div>
  
</div>


<div ><h2>Stats</h2>
    <div class="stats"><div v-for="item in renderSelected.stats">
      <div>
        <div>{{ abbreviateStat(item.stat.name) }}</div>
        <div>{{ item.base_stat }}</div>

      </div>
    </div></div>
  </div>
  <div class="evolution">
  <div class="imgEvolution" v-for="pokemon in listNumber" :key="pokemon.id">
    <div><h2>{{ pokemon.name }}</h2></div>
    <img :src="getPokemonImage(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`)" alt="Pokemon" />
    
  </div>
</div>

    </div>
    </div>
</template>
<style scoped>
h2{
  font-weight:bold;
  
}
.imgEvolution{
  display: flex;

}
.imgEvolution > div{
  padding-top: 40px;
}
.types{
  display: flex;
  gap: 8px;
  
  

}
.item_type{
  border-radius: 5px;
  padding-inline: 5px;
}
.popup{
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.stats{
  display: flex;
  gap: 20px;
}
.evolution{
  display: flex;
  gap: 20px;
}
.abilities{
  display: flex;
  gap: 100px;
}
    .height_weight{
      display: flex;
      gap: 100px;
    }
    .detailContainer{
        
        margin-left: 0px;
        max-width: 1280px;
  margin: 0 auto; 
   padding: 2rem;
   margin-left: 500px;

  
    }
  



</style>