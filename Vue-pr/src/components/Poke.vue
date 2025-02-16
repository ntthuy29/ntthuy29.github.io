<script setup>
import { ref, onMounted } from 'vue';

const pokemon = ref([]);

async function getDataPokemon() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=898`);
    const data = await response.json();
    pokemon.value = data.results;
}

function getPokemonImage(url) {
    const id = url.split("/").slice(-2, -1)[0]; 
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}


onMounted(getDataPokemon);
</script>

<template>
    <div class="container">
        <div class="header">
            <h2>Pokemon API</h2>
        </div>
        <div id="app">
            <div v-for="(item, index) in pokemon" :key="index" class="card">
                <div class="id">#{{ index + 1 }}</div>
                <div class="img">
                    <img :src="getPokemonImage(item.url)" alt="Pokemon Image">
                </div>
                <div class="name">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<style>
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
#app{
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
            button{
            padding: 20px;
            color: white;
            background-color: #FF4D4F ;
            border-radius: 9px;
            border: none;
            font-size: 16px;
            font-family: Arial, Helvetica, sans-serif;
          
        }
        button:hover{
                background-color:#FF7875 ;
            }
            
        .header{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 50px;
       
       
    }
    .divButton{
        width: 100%;
        text-align: center;
        padding-block: 30px;  
    }
     
.container{
    padding-top: 60px;
    padding-left: 600px;
    
   
}

.name{
    font-size: 20px;
}
.divType{
    display: flex;
    gap: 5px;
}

</style>