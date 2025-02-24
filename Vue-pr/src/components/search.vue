<script setup>
    
    import { defineEmits } from 'vue';
    const emit = defineEmits (['renderPokemonSearch','value']);
    
    async function handerSearch(key){
        const data = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=898');
        const jsonData = await data.json();
        const pokemonSearch = jsonData.results;
        
        const filter = pokemonSearch.filter(pokemon=>pokemon.name.toLowerCase().includes(key.toLowerCase()) );
        emit('renderPokemonSearch',filter);
    }
    function combine(event) {
      
  const key = event.target.value; // Lấy giá trị từ inp
  handerSearch(key);
  console.log(key);
  emit('value',key);
}

    
</script>
<template>
      <div class="search" >
        <input 
       @input="combine($event)"
        type="text"  placeholder="Search some Pokemon...">
        </div>
</template>
<style scoped>
input{
                width: 500px;
                border: none;
                border-radius: 30px;
                outline: 1px solid #00000036;
                box-shadow: #64646f33 0 7px 29px;
                font-size: 16px;
                transition: all .2s ease;
                padding: 20px;
                padding-left: 15px;
            }
            </style>