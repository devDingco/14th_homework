let 시간;
let intervalID;

function auth() {
  const number = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  document.getElementById("auth-number").innerText = number;
  시간 = 180;

  intervalID = setInterval(timer, 1000);
}

function timer() {
  const 분 = Math.floor(시간 / 60);
  const 초 = String(시간 % 60).padStart(2, "0");
  const 남은시간 = `${분}:${초}`;
  console.log("남은 시간:", 남은시간);

  document.getElementById("timer").style.display = "inline";
  document.getElementById("timer").innerText = 남은시간;

  document.getElementById("auth-button").disabled = false;
  시간 -= 1;

  if (시간 === 0) clearInterval(intervalID);
}

function authComplete() {
  if (document.getElementById("auth-button").disabled === false) {
    document.getElementById("auth-button").disabled = true
    document.getElementById("auth-button").innerText = "인증 완료"
    document.getElementById("request-button").disabled = true
    clearInterval(intervalID)
    document.getElementById("signup-button").removeAttribute("disabled")
  }
}