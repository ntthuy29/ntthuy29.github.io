<!-- <script setup>
import { ref, onMounted, computed } from 'vue';
import CardPokemon from './components/CardPokemon.vue'
import ButtonPokemon from './components/ButtonPokemon.vue'
import search from './components/search.vue'
import pokemonDetail  from './components/pokemonDetail.vue';
const pokemon = ref([]);
const offset = ref(0);
const limit = 20;

let filterPokemon = ref([]);

async function getDataPokemon() {
    console.log(offset.value)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset.value}&limit=${limit}`);
    const data = await response.json();
    pokemon.value.push(...data.results);
    filterPokemon.value = pokemon.value;
    console.log("Đã chạy tới hàm getdatapokemon");
}
async function getInput(){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit+offset.value}`);
    const data = await response.json();
    pokemon.value.push(...data.results);
    filterPokemon.value = pokemon.value;
    console.log("đã chạy tới hàm get input");
    

}

function getPokemonImage(url) {
    const id = url.split("/").slice(-2, -1)[0]; 
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    

}

function increaseOffset(){
    offset.value +=limit;
    getDataPokemon();
}
function searchPoke(pokeList){
    filterPokemon.value = pokeList;
    
    
}

 async function checkInput(key){
    if(key===''){
        pokemon.value=[];
        getInput();
  
    }
}
const pokemonSelected = ref('');
const selectedPoke = ref(false);

// Hàm để thay đổi giá trị khi chọn Pokemon
function responsePoke(key) {
  pokemonSelected.value = key;
}
function back(){
    selectedPoke.value =false;
}
function clickCard(key) {
  selectedPoke.value = key;
}
onMounted(getDataPokemon);
</script>

<template>
    <button class="back" v-if="selectedPoke" @click="back()">back</button>
    <div class="container" v-if="!selectedPoke" >
        <div class="header">
            <h2>Pokemon API</h2>
            <search @renderPokemonSearch="searchPoke" @value="checkInput"/>
        </div>
        <div id="appp" >
            <CardPokemon v-for="poke in filterPokemon"
            :poke="poke"
            :getPokemonImage="getPokemonImage"
            @poke="responsePoke"
            @selected="clickCard"
            />
        </div>
        <ButtonPokemon 
        @increase="increaseOffset"/>

    </div>

        <pokemonDetail v-if="selectedPoke"
        :pokemonSelected="pokemonSelected"
        :getPokemonImage="getPokemonImage"
        /> 
        
</template>

<style scoped>
*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}
img{
    width: 100%;
    background-size: contain;
}
           .container_img{
            width: 100%;
            
           }
           .id{
            text-align: center;
            color: #475767;
            padding-top: 10px;
        }
        .name{
            font-weight: 700;
            text-transform: capitalize;
            text-align: center;
        }
        .type{
            display: flex;
            gap: 5px;
            padding-bottom: 10px;
           
        }
        .typeItem{
                padding-inline: 5px;
                padding-block: 5px;
                border-radius: 8px;

            }
#appp{
    display: grid;
    grid-template-columns: repeat(6,180px);
    column-gap:7px;
    row-gap: 7px;
    width: 100%;
    place-content: center;
   
    
}


.card{
        border: 2px solid rgb(221, 214, 214);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color:white;
        border-radius: 20px;
        z-index: inherit;
        box-shadow: #0000001a 0 4px 12px;
        border: none;
        gap: 8px;
       
        

    }
    .card:hover{
        box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.3);
        transform: scale(1);
        transition: all 0.6s ease-in-out;

        
    }
    .bug{
        font-size: 20px;
        display: none;
    }
    h2{
            
            color: rgb(44, 62, 80);
            font-weight: 400;
            font-size: 38px;
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
            padding-bottom: 60px;
        }
        
        .header{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 50px;
    }
    
.container{
    padding-top: 60px;
    margin-left: 200px;
}

.name{
    font-size: 20px;
}
.divType{
    display: flex;
    gap: 5px;
}
.back{
    height:25px;
    width: 80px;
    border-radius: 10px;
    margin-left: 20px;
    margin-top: 20px;
   
}

</style> -->
<template>
    <RouterView/>
</template>