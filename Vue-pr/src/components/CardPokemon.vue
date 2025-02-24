<script setup>
import {ref,onMounted} from 'vue'
let selected = ref(false);
const emits = defineEmits(['poke','selected']);
const typeColors = { 
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C', 
    grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1', 
    ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A', 
    rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746', 
    steel: '#B7B7CE', fairy: '#D685AD' 
};
function selectedPokemon(){
    selected.value = true;
    emits('selected',selected.value);
    emits('poke',props.poke)
}
const props = defineProps({
    poke:{
        type: Object,
        required: true

    },
    getPokemonImage:{
        type: Function,
        required: true
    }
    ,
    stateId:{
        type: String
    }
});
import { computed } from 'vue';

const id = computed(() => {
  return props.poke.url.split("/").slice(-2, -1)[0];
});
const listType = ref([]);
async function getAPI(){
    const response = await fetch(props.poke.url);
    const data = await response.json();
    listType.value = data.types;
}
onMounted(() => {
  getAPI();
});
</script>
<template>
  <div class="card" :id="poke.name" @click="selectedPokemon">
                <div class="id" :style="{display: stateId}">#{{id}}</div>
                <div class="img">
                    <img :src="getPokemonImage(poke.url)" alt="Pokemon Image">
                </div>
                <div class="type" >
                    <span  v-for="item in listType"
                    :style="{backgroundColor: typeColors[item.type.name]}">{{ item.type.name }}</span>

                </div>

                <div class="name">{{ poke.name }}</div>

            </div> 

</template>
<style scoped>
.type{
    display: flex;
    gap: 5px;

}
.type>span{
    display: inline-block;
    border-radius: 6px;
}
img{
    width: 100%;
    background-size: contain;
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
       
    

.name{
    font-size: 20px;
}
.divType{
    display: flex;
    gap: 5px;
}

</style>