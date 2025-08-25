//TODO: 로컬스토리지에 저장할 경우, key값을 어떻게 줄 지

const form = document.querySelector('.body__main__signup__form')
const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
//영문자+숫자+특수문자 조합으로 8~25자리 사용
const phoneReg = /^010-?([0-9]{4})-?([0-9]{4})$/
const OUTLINE_CLASSNAME = 'outline-error'
const EMAIL_DOMAINS = [
  "naver.com",
  "gmail.com",
  "hanmail.com",
  "kakao.com"
]

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const userName = e.target.name.value
  const userEmail = e.target.email.value
  const userPassword = e.target.password.value
  const userPasswordConfirm = e.target.passwordConfirm.value
  const userPhoneNumber = e.target.phoneNumber.value
  const userIntro = e.target.intro.value
  const isMale = e.target.male.checked
  const isFemale =  e.target.female.checked
  const agreement = e.target.checkbox.checked

  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2,0)
  const day = String(now.getDate()).padStart(2,0)
  const enterDate = `${year}-${month}-${day}`

  const startNumber = userPhoneNumber.substr(0, 3)
  const signUpValidation = () => {
    let isValid = true

    const nameError = document.getElementById("name-error")
    const emailError = document.getElementById("email-error")
    const passwordError = document.getElementById("password-error")
    const passwordConfirmError = document.getElementById("passwordConfirm-error")
    const phoneNumberError = document.getElementById("phoneNumber-error")

    const nameClass = document.getElementById("name").classList
    const emailClass = document.getElementById("email").classList
    const passwordClass = document.getElementById("password").classList
    const passwordConfirmClass = document.getElementById("passwordConfirm").classList
    const phoneNumberClass = document.getElementById("phoneNumber").classList

    if (userName === "" || userName === null || userName == undefined) {
      nameError.style.display = "inline"
      nameError.innerText = "이름을 입력해주세요."
      nameClass.add(OUTLINE_CLASSNAME)
      isValid = false
    }
    if (userEmail === "" || userEmail === null || userEmail == undefined) {
      emailError.style.display = "inline"
      emailError.innerText = "이메일을 입력해주세요."
      emailClass.add(OUTLINE_CLASSNAME)
      isValid = false
    }
    if (!userEmail.includes("@")) {
      emailError.style.display = "inline"
      emailError.innerText = "이메일 형식에 맞지 않습니다."
      emailClass.add(OUTLINE_CLASSNAME)
      isValid = false
    }
    if (!EMAIL_DOMAINS.some(val => userEmail.includes(val))) {
      emailError.style.display = "inline"
      emailError.innerText = "도메인이 적합하지 않습니다."
      emailClass.add(OUTLINE_CLASSNAME)
      isValid = false
    }
    if (userPassword === "" || userPassword === null || userPassword == undefined) {
      passwordError.style.display = "inline"
      passwordError.innerText = "비밀번호를 입력해주세요."
      passwordClass.add(OUTLINE_CLASSNAME)
      isValid = false
    }
    if (!passwordReg.test(userPassword)) {
      passwordError.style.display = "inline"
      passwordError.innerText = "영문자+숫자+특수문자 조합으로 8~25자리 사용해주세요."
      passwordClass.add(OUTLINE_CLASSNAME)
      isValid = false
    }
    if (userPasswordConfirm === "" || userPasswordConfirm === null || userPasswordConfirm == undefined) {
      passwordConfirmError.style.display = "inline"
      passwordConfirmError.innerText = "비밀번호를 다시 한 번 입력해주세요."
      passwordConfirmClass.add(OUTLINE_CLASSNAME)
      isValid = false
    }
    if (!passwordReg.test(userPasswordConfirm)) {
      passwordConfirmError.style.display = "inline"
      passwordConfirmError.innerText = "영문자+숫자+특수문자 조합으로 8~25자리를 입력해주세요."
      passwordConfirmClass.add(OUTLINE_CLASSNAME)
      isValid = false
    }
    if (userPassword !== userPasswordConfirm) {
      passwordConfirmError.style.display = "inline"
      passwordConfirmError.innerText = "비밀번호와 일치하지 않습니다."
      passwordConfirmClass.add(OUTLINE_CLASSNAME)
      isValid = false
    }
    if (userPhoneNumber === "" || userPhoneNumber === null || userPhoneNumber == undefined) {
      phoneNumberError.style.display = "inline"
      phoneNumberError.innerText = "전화번호를 입력해주세요."
      phoneNumberClass.add(OUTLINE_CLASSNAME)
      isValid = false
    }
    if (startNumber !== "010") {
      phoneNumberError.style.display = "inline"
      phoneNumberError.innerText = "전화번호는 010으로 시작해야 합니다."
      phoneNumberClass.add(OUTLINE_CLASSNAME)
      isValid = false
    }
    if (!phoneReg.test(userPhoneNumber)) {
      phoneNumberError.style.display = "inline"
      phoneNumberError.innerText = "전화번호 형식에 맞지 않습니다."
      phoneNumberClass.add(OUTLINE_CLASSNAME)
      isValid = false
    }
    if (userPhoneNumber.length !== 13) {
      phoneNumberError.style.display = "inline" 
      phoneNumberError.innerText = "전화번호 길이가 맞지 않습니다."
      phoneNumberClass.add(OUTLINE_CLASSNAME)
      isValid = false
    }

    return isValid
  }
  
  const newStudent = {
    name: userName,
    email: userEmail,
    password: userPassword,
    phoneNumber: userPhoneNumber,
    intro: userIntro, //필수 아님
    gender: isMale && !isFemale ? "남성" : "여성",
    agree: agreement,
    enter: enterDate
  }
  
  //WANTED : validate.js 재사용 가능하게 하기
  const hasAll = (userName !== "") && (userEmail !== "") && (userPassword !== "")
    && (userPassword === userPasswordConfirm)
    && (isMale || isFemale) && agreement
  
  if (signUpValidation()){
    addStudent(newStudent)
    alert(`회원가입을 축하합니다.\n(가입일시:${enterDate})`)
    location.reload(true)
  } else {
    alert("모든 항목을 알맞게 채워주세요.")
  }

})

const LIST_KEY = "수강생리스트"
// INFO: 로컬스토리지에 학생정보 저장
// DRAWBACK: 수강생 삭제를 고려하지 않은 로직
function addStudent(object) {
  const students = JSON.parse(localStorage.getItem(LIST_KEY)) || []

  const newStudentWithId = { id: students.length, ...object }
  students.push(newStudentWithId)
  localStorage.setItem(LIST_KEY, JSON.stringify(students))
}
