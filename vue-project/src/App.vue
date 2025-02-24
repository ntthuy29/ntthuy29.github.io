<script setup>
import { ref } from 'vue';
const maMau = ref('');
const chieuNgang = ref('');
const chieuDoc = ref('');
const khungMau = ref(null);

const updateBackgroundColor = () => {
  if (khungMau.value) {
    khungMau.value.style.backgroundColor = "#" + maMau.value;
    khungMau.value.innerText = "#" + maMau.value;
  }
};

const updateWidth = () => {
  if (khungMau.value) {
    khungMau.value.style.width = chieuNgang.value + "px";
  }
};

const updateHeight = () => {
  if (khungMau.value) {
    khungMau.value.style.height = chieuDoc.value + "px";
  }
};

const handleSubmit = () => {
  if (!maMau.value) {
    alert("Vui lòng nhập mã màu");
  } else if (!chieuNgang.value) {
    alert("Vui lòng nhập chiều ngang");
  } else if (!chieuDoc.value) {
    alert("Vui lòng nhập chiều cao");
  } else {
    if (khungMau.value) {
      khungMau.value.style.display = "flex";
    }
  }
};

const resetValues = () => {
  maMau.value = '';
  chieuNgang.value = '';
  chieuDoc.value = '';
  if (khungMau.value) {
    khungMau.value.style.display = "none";
  }
};
</script>


<template>
  <div class="main"> <div id="input_infor">
    <div id="data">
      <input type="text" v-model="maMau" placeholder="Nhập mã màu" @input="updateBackgroundColor" />
      <input type="number" v-model="chieuNgang" placeholder="Nhập chiều ngang (w)" @input="updateWidth" />
      <input type="number" v-model="chieuDoc" placeholder="Nhập chiều dọc (h)" @input="updateHeight" />
    </div>
    <button id="submit" @click="handleSubmit">Submit</button>
  </div>
  <div id="khung_mau" ref="khungMau" @click="resetValues"></div></div>
 
</template>
<style scoped>
body{
    margin-left: 500px;
    display: flex;
    flex-direction: column;
    gap: 50px;
   
   
}
input{
  border: 3px solid black;
  height: 40px;
  width: 300px;
}
#submit{
        height: 80;
        width: 60px;
        border: 2px solid black;
        border-radius :10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: cadetblue;
    }

  #khung_mau{


   justify-content: center;
   align-items: center;
   font-size: 20px;
   font-weight: 100px;
   display: none;
    
}

.main{
  display: flex;
  flex-direction: column;
  gap: 50px;
}
#data{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
#input_infor{
    display: flex;
    gap: 10px;
}
</style>
