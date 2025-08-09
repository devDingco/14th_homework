function 전화번호가리기(){
const my_phone = document.getElementById("입력전번");

const split_result = my_phone.value.split("-");

if(split_result.length ===3) {
const front_phone = split_result[0];
const middle_phone = split_result[1];
const end_phone = split_result[2];


// const 가려진전번 = middle_phone.slice(0, 4) + "****";
// const 전번가리기 = front_phone + "-" + 가려진전번 + "-" + end_phone;
// my_phone.value = 전번가리기;
}
}