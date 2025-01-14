// // call back 
// function sum(a,b, callback){
//    a = callback(a)
//    b = callback(b)
// }
// console.log(sum(3,5))
//ham for sẵn => 
//     const arr = [1,2,3,4];
// arr.forEach(function(value){
//     console.log(value)
// })
// forEach=>hàm này k trả về gì cả, mã 3 tham so value, index,array. chỉ có lặp qua từng phần tử trong mảng và kết thúc, vẫn giữ nguyên arr

// arr.forEach(function(value, index){
//     arr[index] *=2
// })
// hàm map=> tạo ra một arr mới từ arr cũ, 
// arr.map(function(value){
//     return value + "test"
// })
// hàm find=> tìm 1 phần tử trong mảng 
// hàm includes => tìm mảng có phần tử hay k, bắt đầu từ index thứ mấy => trả về true, false
// arr.reduce, lặp qua từng phần tử có giá trị trước, giá trị hiện tại , index hiện tại, arr=> trả về giá trị cuối cùng 
// arr.reduce(function(previousValue, currentValue, currentIndex, array){
//     return currentValue

// },0)
//prototype
const arr = [1,2,3,4,5]
function forEach(arr, callback){
    for(let i = 0; i< arr.length;i++){
        callback(arr[i], i, arr)
    }
}
function map(arr, callback){
    let arrTemp = []
    for(let i=0; i< arr.length; i++ ){
        arrTemp[i]= callback(arr[i])

    }
    return arrTemp;
}
function find(arr, value){
    for(let i = 0; i< arr.length; i++){
        if(arr[i]===value){
            return arr[i]
        }
    }
   return "undefined"
}
function includes(arr,value,callback){
    for(let i = 0; i< arr.length; i++){
        if(arr[i] === value){
            return callback(value, i, arr)
        }
    }
    return false
}
function reduce (previousValue, currentValue, currentIndex, arr, initialValue, callback){
    previousValue= initialValue
    for(let i = 0; i< arr.length; i++){
        
        currentIndex = i;
        currentValue = callback(previousValue, currentValue, currentIndex, arr)
        return currentValue
    }

}
forEach(arr, function(value, index, arr){
   console.log(value)
})
console.log("hihi")
console.log(map(arr, function(value){
    return value *2
}))
console.log(find(arr, 6))
// setTimeout
setTimeout(function(){
    console.log("mệt")
}, 3000)
//setInterval => luồng lặp
//Date 
//js event loop => bài tập về nhà về coi thử
// clearTimeout
// clearInterval 