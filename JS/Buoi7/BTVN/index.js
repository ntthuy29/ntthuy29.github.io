const getMaMau = document.querySelector("#ma_mau")
const getChieuNgang = document.querySelector("#chieu_ngang")
const getChieuDoc = document.querySelector("#chieu_doc")
const getSubmit = document.querySelector("#submit")
console.log(getSubmit)
const getKhungMau = document.querySelector("#khung_mau")
console.log(getKhungMau);
console.log("hihiahuhuhuhuuuuuuuuuuu")
getMaMau.addEventListener(
    "input",
    function(){
        getKhungMau.style.backgroundColor = "#"+getMaMau.value;
        getKhungMau.innerText = "#"+getMaMau.value;
    }
)
getChieuNgang.addEventListener(
    "input",
    function(){
getKhungMau.style.width = getChieuNgang.value + "px";
    }
)
getChieuDoc.addEventListener(
    "input",
    function(){
        getKhungMau.style.height = getChieuDoc.value+"px";
    }
)
getSubmit.addEventListener(
    "click",
    function(){
        if(getMaMau.value === ""){
            alert("Vui lòng nhập mã màu");
        } else if(getChieuNgang.value === ""){
            alert("Vui lòng nhập chiều ngang");
        }
        else if(getChieuDoc.value === ""){
            alert("Vui lòng nhập chiều cao")
        }
        else {
            getKhungMau.style.display = "flex";
        }
    }
)
getKhungMau.addEventListener(
    "click",
    function(){
        getMaMau.value=""
        getChieuNgang.value=""
        getChieuDoc.value=""
        getKhungMau.style.display="none"
    }
)