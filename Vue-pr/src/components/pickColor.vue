<script setup>

</script>

<template>
  <div id="input_infor">
        <div id="data">
            <input type="text" id="ma_mau" placeholder="Nhập mã màu">
            <input type="text" id="chieu_ngang" placeholder="Nhập chiều ngang (w)">
            <input type="text" id="chieu_doc" placeholder="Nhập chiều dọc (h)">
        </div>
        <div id="submit">submit</div>

    </div>
    <div id="khung_mau">
    </div>
</template>

<style scoped>
    body{
    margin-left: 500px;
    display: flex;
    flex-direction: column;
    gap: 50px;
}
#submit{
        height: 80;
        width: 60px;
        border: 2px solid black;
        border-radius :5px;
        display: flex;
        justify-content: center;
        align-items: center;
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
  #khung_mau{


   justify-content: center;
   align-items: center;
   font-size: 20px;
   font-weight: 100px;
   display: none;
    
}

</style>
