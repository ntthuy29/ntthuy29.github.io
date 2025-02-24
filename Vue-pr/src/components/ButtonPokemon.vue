
<script setup>
import { defineEmits } from 'vue';

// Lưu hàm emit
const emit = defineEmits(['increase']);

function handleClick() {
    console.log("Đã click")
  emit('increase'); // Phát sự kiện khi click
}
</script>

<template>
  <div class="divButton">
    <button class="loadmore" @click="handleClick">
    Load More 
  </button>
  </div>
  
</template>

<style scrope>
.divButton{
        width: 100%;
        text-align: center;
        padding-block: 30px;

    }
     
    .loadmore{
            padding: 20px;
            color: white;
            background-color: #FF4D4F ;
            border-radius: 9px;
            border: none;
            font-size: 16px;
            font-family: Arial, Helvetica, sans-serif;
            margin-top: 50px;
          
        }
        .loadmore:hover{
                background-color:#FF7875 ;
            }
            

</style>