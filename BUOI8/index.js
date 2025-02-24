function isPrime(a){
    if(a<2) return 0;
    if(a===2) return 1;
    for(let i = 2; i<Math.sqrt(a);i++){
        if(a%i===0) return 0;
    }
    return 1;
}

if(isPrime(12)){
    console.log("Là số nguyên tố")
} else {
    console.log("Không là số nguyên tố")
}
//bai2
function primeBetweenTwoNumber(a, b){
    if(a>b){
        let temp = a;
        a=b;
        b=temp;
    }
    for(let i = a; i < b; i++ ){
        if(i!=a){
            if(isPrime(i)){
                console.log(i);
            }
        }
    }

}
primeBetweenTwoNumber(5,17);
//bài 3
// function isInterger(a){
//     if(a%1===0) return 1
//     return 0
// }
// function month(a){
//     if(isInterger(a)){
//         if(a>0 & a < 13){
//             console.log("Tháng a")
//         }
//         else console.log("Không có tháng hợp lệ")
//     }
//     else { 
//         console.log("Không có tháng hợp lệ")
//     }
// }
// month(11)
//bài 4
// function findLongestString(chuoi){
//     let mang = chuoi.split(" ");
//     console.log(mang)



// }