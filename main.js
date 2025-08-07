document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("phoneNumber");
  const tokenButton = document.getElementById("Token_Button");

  phoneInput.addEventListener("input", function () {
    const formattedValue = formatPhoneNumber(this.value);
    if (this.value !== formattedValue) this.value = formattedValue;

    const phoneNumber = formattedValue;
    const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

    if (
      phoneNumber.startsWith("010") &&
      phoneNumber.includes("-") &&
      phoneRegex.test(phoneNumber.trim())
    ) {
      tokenButton.removeAttribute("");
      tokenButton.style.cursor = "pointer";
      document.getElementById("Token__Timer").style.display = "block";
    } else {
      tokenButton.setAttribute("", "true");
      tokenButton.style.color = "#491449";
      tokenButton.style.cursor = "default";
      document.getElementById("Token__Timer").style.display = "none";
    }
    checkSignupButton();
  });

  ["name", "email", "password__check", "agreement"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", checkSignupButton);
    if (el && el.type === "checkbox")
      el.addEventListener("change", checkSignupButton);
  });
});

function formatPhoneNumber(value) {
  const numbers = value.replace(/[^\d]/g, "");
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
    7,
    11
  )}`;
}

function checkSignupButton() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const password = document.getElementById("password__check").value.trim();
  const agreement = document.getElementById("agreement").checked;
  const confirmButton = document.getElementById(
    "Token__Timer__Confirm__Button"
  );
  const isVerified = confirmButton && confirmButton.innerText === "인증완료";

  const signupButton = document.getElementById("Signup_Button");
  if (name && email && phoneNumber && password && agreement && isVerified) {
    signupButton.removeAttribute("disabled");
    signupButton.style.backgroundColor = "#491449";
    signupButton.style.color = "#FFFFFF";
    signupButton.style.cursor = "pointer";
  } else {
    signupButton.setAttribute("disabled", "true");
    signupButton.style.backgroundColor = "#c7c7c7";
    signupButton.style.color = "#f2f2f2";
    signupButton.style.cursor = "default";
  }
}

function emailCheck(email_address) {
  const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  const allowed_domains = [
    "naver.com",
    "gmail.com",
    "daum.net",
    "hanmail.net",
    "kakao.com",
  ];
  if (!email_regex.test(email_address)) return false;
  const domain = email_address.split("@")[1].toLowerCase();
  return allowed_domains.includes(domain);
}

function validateEmail() {
  const email = document.getElementById("email").value;
  const resultDiv = document.getElementById("result");
  if (emailCheck(email)) {
    resultDiv.innerHTML = "유효한 이메일 주소입니다.";
    resultDiv.className = "success";
  } else {
    resultDiv.innerHTML =
      "유효하지 않은 이메일 주소입니다. (naver.com, gmail.com, daum.net, hanmail.net, kakao.com만 허용)";
    resultDiv.className = "error";
  }
}

function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
  return (
    phoneNumber &&
    phoneNumber.startsWith("010") &&
    phoneNumber.includes("-") &&
    phoneRegex.test(phoneNumber.trim())
  );
}

function getToken() {
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const tokenButton = document.getElementById("Token_Button");
  const errorPhone = document.getElementById("error__phone");

  if (!isValidPhoneNumber(phoneNumber)) {
    document.getElementById("phoneNumber").style.border = "1px solid red";

    if (phoneNumber === "") {
      errorPhone.innerText = "전화번호를 입력해 주세요.";
    } else if (!phoneNumber.startsWith("010")) {
      errorPhone.innerText = "전화번호는 010으로 시작해야 합니다.";
    } else if (!phoneNumber.includes("-")) {
      errorPhone.innerText =
        "전화번호 입력시 '-'를 입력해주세요 ex)010-1234-1234";
    } else {
      errorPhone.innerText =
        "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)";
    }

    tokenButton.setAttribute("disabled", "true");
    tokenButton.style.color = "#491449";
    tokenButton.style.cursor = "default";
    return;
  } else {
    document.getElementById("phoneNumber").style.border = "none";
    errorPhone.innerText = "";
  }

  const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  document.getElementById("Token").innerText = token;
  tokenButton.style =
    "background-color: #FFFFFF; color: #491449; cursor: default;";
  tokenButton.setAttribute("disabled", "true");
  document.getElementById("Token__Timer__Confirm__Button").style =
    "background-color: #491449; color: #FFFFFF; cursor: pointer;";
  document
    .getElementById("Token__Timer__Confirm__Button")
    .removeAttribute("disabled");
  document.getElementById("Token_Button").removeAttribute("disabled");
  getTokenTimer();
}

let interval;
function getTokenTimer() {
  let timer = 180;
  interval = setInterval(() => {
    if (timer >= 0) {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      document.getElementById("Token__Timer").innerText = `${minutes}:${String(
        seconds
      ).padStart(2, "0")}`;
      timer -= 1;
    } else {
      document.getElementById("Token").innerText = "000000";
      document.getElementById("Token_Button").style = "";
      document.getElementById("Token_Button").setAttribute("disabled", "true");
      document.getElementById("Token__Timer").innerText = "3:00";
      document.getElementById("Token__Timer__Confirm__Button").style = "";
      // 시간 만료 시 확인 버튼 비활성화
      document
        .getElementById("Token__Timer__Confirm__Button")
        .setAttribute("disabled", "true");
      clearInterval(interval);
    }
  }, 1000);
}

function getTokenTimerConfirm() {
  clearInterval(interval);
  const confirmBtn = document.getElementById("Token__Timer__Confirm__Button");
  confirmBtn.style =
    "background-color: #c7c7c7; color: #f2f2f2; cursor: default;";
  confirmBtn.setAttribute("disabled", "true");
  confirmBtn.innerText = "인증완료";
  alert("인증이 완료되었습니다.");
  checkSignupButton();
  const tokenButton = document.getElementById("Token_Button");
  tokenButton.setAttribute("disabled", "true");
  tokenButton.style =
    "background-color: #c7c7c7; color: #f2f2f2; cursor: default; border: none;";
  // 인증완료 시 타이머 숨기기
  document.getElementById("Token__Timer").style.display = "none";
}

function signin() {
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const password = document.getElementById("password__check").value;

  let isValid = true;

  const errorFields = ["email", "name", "phoneNumber", "password__check"];
  errorFields.forEach((id) => {
    document.getElementById(id).style.border = "1px solid #c7c7c7";
    const errorEl = document.getElementById(
      `error__${id.replace("__check", "")}`
    );
    if (errorEl) errorEl.innerText = "";
  });

  if (!emailCheck(email)) {
    document.getElementById("email").style.border = "1px solid red";
    document.getElementById("error__email").innerText =
      "이메일은 naver.com, gmail.com, hanmail.net, kakao.com만 사용 가능합니다.";
    isValid = false;
  }

  if (name === "") {
    document.getElementById("name").style.border = "1px solid red";
    document.getElementById("error__name").innerText =
      "이름은 필수 작성입니다.";
    isValid = false;
  }

  const passwordPattern = /^(?=.*[!@#$%^&*])(?=.{10,})/;
  if (password === "") {
    document.getElementById("password__check").style.border = "1px solid red";
    document.getElementById("error__password__check").innerText =
      "비밀번호를 입력해 주세요.";
    isValid = false;
  } else if (!passwordPattern.test(password)) {
    document.getElementById("password__check").style.border = "1px solid red";
    document.getElementById("error__password__check").innerText =
      "비밀번호는 특수문자를 포함하여 10자 이상이어야 합니다.";
    isValid = false;
  }

  if (isValid) {
    if (isValid) {
      const today = new Date();
      const year = today.getFullYear();
      const month = ("0" + (today.getMonth() + 1)).slice(-2);
      const day = ("0" + today.getDate()).slice(-2);
      const dateString = year + "-" + month + "-" + day;

      // 회원 정보 저장
      const gender =
        document.querySelector('input[name="gender"]:checked')
          ?.nextElementSibling?.innerText || "";
      const agreement = document.getElementById("agreement").checked
        ? "Y"
        : "N";
      const introduce = document.querySelector(".Textarea").value;
      const maskedPhone = phoneNumber.replace(
        /(\d{3})-(\d{2,4})-(\d{4})/,
        "$1-****-$3"
      );

      // 첫 번째 모달 메시지
      document.getElementById(
        "modalMessage"
      ).innerHTML = `회원가입을 축하합니다.<br>(가입일시 : ${dateString})`;
      document.getElementById("signupModal").style.display = "flex";

      // 확인 버튼 클릭 시 두 번째 모달로 변경
      document.getElementById("modalConfirmBtn").onclick = function () {
        // 첫 번째 모달 숨기기
        document.getElementById("signupModal").style.display = "none";

        // 두 번째 모달에 상세 정보 표시
        document.getElementById("modalMessage2").innerHTML =
          `이름 : ${name}<br>` +
          `이메일 : ${email}<br>` +
          `비밀번호 : ******<br>` +
          `성별 : ${gender}<br>` +
          `전화번호 : ${maskedPhone}<br>` +
          `동의여부 : ${agreement}<br>` +
          `자기소개 : ${introduce}<br>` +
          `(가입일시 : ${dateString})`;

        // 두 번째 모달 표시
        document.getElementById("signupModal2").style.display = "flex";

        // 두 번째 모달의 확인 버튼 클릭 시 모달 종료
        document.getElementById("modalConfirmBtn2").onclick = function () {
          document.getElementById("signupModal2").style.display = "none";

          // 회원가입 성공 시 Contents_Area 숨기고 User_List_Wrapper 표시
          document.getElementById("Signup_Btn").style.display = "none";
          document.querySelector(".Contents_Area").style.display = "none";
          document.querySelector(".User_List_Wrapper").style.display = "block";

          // 새로운 User_List 생성 및 추가
          const userListWrapper = document.querySelector(".User_List_Wrapper");
          const existingUserLists =
            userListWrapper.querySelectorAll(".User_List");
          const newUserNumber = existingUserLists.length + 1;

          const newUserList = document.createElement("div");
          newUserList.className = "User_List";
          newUserList.innerHTML = `
            <img id="User_Icon" src="./public/icons/Mask group.png">수강생 ${newUserNumber}
          `;

          userListWrapper.appendChild(newUserList);
        };
      };
    }
  }
}
