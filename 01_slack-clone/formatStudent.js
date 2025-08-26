//로컬 스토리지로부터 학생 리스트 가져오는 함수
const getStudentList = () => {
  return JSON.parse(localStorage.getItem(LIST_KEY))
}

// 선택한 id(class가 body__main__menu__list__student일때만)를 가져오는 함수
const onClick = (e) => {
  if (e.target.classList[0] === "body__main__menu__list__student") {
    const clickedId = e.target.id
    alert(formatStudent(clickedId))
  }
}
document.addEventListener("click", onClick)

//선택한 학생 정보 가져오는 함수
const selectStudent = (id) => {
  return getStudentList().filter((student)=>student.id === +id)
}

const MAPPING_KEYS = {
  name: "이름",
  email: "이메일",
  password: "패스워드",
  phoneNumber: "전화번호",
  intro: "자기소개",
  gender: "성별",
  agree: "동의여부",
  enter: "가입 날짜"
}

//피그마 형식과 동일하게 학생 정보 포맷해서 alert 에 띄우는 함수
const formatStudent = (id) => {
  const entries = Object.entries(selectStudent(id)[0])
  let message = ""
  for (let [key, value] of entries) {
    if (key === "id") continue
    if (key === "password") {
      const passwordLen = value.length
      value = "*".repeat(passwordLen)
    }
    message += `${MAPPING_KEYS[key]} : ${value}`
    message += "\n"
  }
  return message.trim()
}

//수강생 배열 > 0일시,
//화면에 addEventListner로 수강생들 추가하는 함수
const addStudentsOnScreen = () => {
  const len = getStudentList().length
 
  for (let i = 0; i < len; i++){
    const currentStudent = getStudentList()[i]
    addStudentOnScreen(currentStudent.id, currentStudent.name)
  }
}

//수강생 div 만드는 함수
const addStudentOnScreen = (id, name) => {
  const container = document.getElementsByClassName("body__main__menu__list")[0]

  const newDiv = document.createElement("div")
  newDiv.classList.add("body__main__menu__list__student")

  const newImg = document.createElement("img")
  newImg.classList.add("body__main__menu__list__student__img")
  newImg.src = "./assets/images/my_profile.png"

  const newSpan = document.createElement("span")
  newSpan.innerHTML = name
  newSpan.classList.add("body__main__menu__list__student__span")

  newDiv.setAttribute("id", id)
  
  newDiv.appendChild(newImg)
  newDiv.appendChild(newSpan)
  container.appendChild(newDiv)
}

//윈도우 로드시, 학생 리스트가 있다면 수강생 배열 띄워주는 동작(반복문)
window.onload = function () {
  const len = getStudentList() === null ? 0 : getStudentList().length
  if (len > 0) {
    document.getElementsByClassName("body__main__menu__list__none")[0].style.display = "none"
    addStudentsOnScreen()
  }
}