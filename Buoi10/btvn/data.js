(async function(){
    const app = document.querySelector('#app')
    const button = document.querySelector('button')
    const input = document.querySelector('input')
    let counter = 0;
    let limit = 20
    filteredPokemons = []
    async function cFetch(URL){
        try{
            const response = await fetch(URL);
            const promise = await response.json();
            return promise;
        }
        catch(error){
            console.log('error',error)
        }
    }
    const (results: pokemons) = await cFetch("")

  
})()