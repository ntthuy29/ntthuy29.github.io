// function displayPokemon(data){
//     data.forEach((element, index, data) => {
//         let card=document.createElement('div');
//         card.setAttribute('class','card');
//         let id=document.createElement('p');
//         id.setAttribute('class','id-pokemon');
//         id.textContent=`#${index+1}`;
//         let img=document.createElement('img');
//         img.setAttribute('class','img-pokemon');
//         img.setAttribute('src',`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`);
//         let name=document.createElement('h2');
//         name.setAttribute('class','name-pokemon');
//         name.textContent=element.name;
//         card.appendChild(id);
//         card.appendChild(img);
//         card.appendChild(name);
//         document.querySelector('.container-pokemon').appendChild(card);

//     });
// }
// displayPokemon(data);
function showProduct(data){
    data.forEach((value, index)=>{
        const div = document.createElement("div")
        div.className="product"
        const id = document.createElement("div")
        id.innerText = `#${index+1}`
        const img = document.createElement("img")
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
        const name = document.createElement("h2")
        name.innerText = value.name
        div.appendChild(id)
        div.appendChild(img)
        div.appendChild(name)
        document.querySelector(".container-pokemon").append(div)
    }

    )
}

showProduct(data)