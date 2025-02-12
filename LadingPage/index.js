const s5_item1 = document.querySelector('.js-customize-s5')
const s5_item2 =document.querySelector ('.js-easy-s5')
const s5_item3 = document.querySelector('.js-improve-s5')
const s5_img_1 = document.querySelector('.s5-img-1')
const s5_img_2 = document.querySelector('.s5-img-2')
const s5_img_3 = document.querySelector('.s5-img-3')
document.querySelector("a").addEventListener("click", function (event) {
    event.preventDefault(); 
  });

s5_item2.addEventListener(
    'click',
    function(){
        s5_img_1.style.display ='none'
        
        s5_img_2.style.display ='block'
        s5_img_3.style.display ='none'
    }
)
s5_item1.addEventListener(
    'click',
    function(){
        s5_img_2.style.display ='none'
        
        s5_img_1.style.display ='block'
        s5_img_3.style.display ='none'
    }
)
s5_item3.addEventListener(
    'click',
    function(){
        s5_img_1.style.display ='none'
        
        s5_img_3.style.display ='block'
        s5_img_2.style.display ='none'
    }
)
///section-7-js
const s7_item1 = document.querySelector('.js-item1-s7')
const s7_item2 =document.querySelector ('.js-item2-s7')
const s7_item3 = document.querySelector('.js-item3-s7')
//
const s7_card1 = document.querySelector('.js-card1-s7')
const s7_card2 = document.querySelector('.js-card2-s7')
const s7_card3 = document.querySelector('.js-card3-s7')
console.log(s7_item2)

s7_card1.addEventListener(
    'click',
    function(){
       if(s7_item1.style.display==='none'){
        s7_item1.style.display='block'
       } else {
        s7_item1.style.display ='none'
       }
       if(s7_item2.style.display==='block'){
        s7_item2.style.display='none'
       }
       if(s7_item3.style.display==='block'){
        s7_item2.style.display='none'
       }


    }
)

s7_card2.addEventListener(
    'click',
    function(){
       if(s7_item2.style.display==='none'){
        s7_item2.style.display='block'
       } else {
        s7_item2.style.display ='none'
       }
       if(s7_item1.style.display==='block'){
        s7_item2.style.display='none'
       }
       if(s7_item3.style.display==='block'){
        s7_item2.style.display='none'
       }
    }
)

s7_card3.addEventListener(
    'click',
    function(){
       if(s7_item3.style.display==='none'){
        s7_item3.style.display='block'
       } else {
        s7_item3.style.display ='none'
       }
       if(s7_item2.style.display==='block'){
        s7_item2.style.display='none'
       }
       if(s7_item1.style.display==='block'){
        s7_item2.style.display='none'
       }
    }
)
