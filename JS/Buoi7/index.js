const getInput = document.querySelector("#input_number")
const getButton = document.querySelector("#my_button")
const getSpan = document.querySelector("#my_span")
console.log(getInput)
const number= getInput.value
console.log(number);
getInput.addEventListener(
    "input",
    function(){
        getSpan.innerText = getInput.value
    
       
        
    }

)
getButton.addEventListener(
    "click",
    function(){
        if(getInput.value == "abc"){
            alert("Chúc mừng bạn đã trúng thưởng")
        }
        else 
        alert ("Chúc bạn may mắn lần sau")
    }
)