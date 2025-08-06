// 가입버튼 활성화 함수
function checkSignUpButton() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const tel = document.getElementById("tel").value;
    
    const sexRadios = document.querySelectorAll('input[name="sex"]');
    let sexChecked = false;
    sexRadios.forEach(radio => {
        if (radio.checked) sexChecked = true;
    });
    
    const checkbox = document.querySelector('.main-checkbox');
    const checkboxChecked = checkbox.checked;
    
    const emailValidation = validateEmail(email);
    const isEmailValid = email === '' || emailValidation.isValid;
    
    const signupButton = document.getElementById("signupButton");
    
    if (name !== "" && email !== "" && password !== "" && password2 !== "" && tel !== "" && sexChecked && checkboxChecked && isAuthCompleted && isEmailValid) {
        signupButton.disabled = false;
        signupButton.style.backgroundColor = '#491449';
        signupButton.style.color = '#FFFFFF';
        signupButton.style.cursor = 'pointer';
    } else {
        signupButton.disabled = true;
        signupButton.style.backgroundColor = '#C7C7C7';
        signupButton.style.color = '#F2F2F2';
        signupButton.style.cursor = 'not-allowed';
    }
}

// 각 입력값들 이벤트리스너 추가
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("name").addEventListener('input', checkSignUpButton);
    document.getElementById("email").addEventListener('input', function() {
        const email = this.value;
        const errorMsg = document.getElementById('error-msg');
        const input = document.getElementById("email");
        
        if (email === '') {
            errorMsg.style.display = 'none';
            input.style.border = '';
            input.style.outline = '';
            input.style.boxShadow = '';
        } else {
            const validation = validateEmail(email);
            if (!validation.isValid) {
                errorMsg.textContent = validation.message;
                errorMsg.style.display = 'block';
                input.style.border = '1px solid #E84F4F';
                input.style.outline = 'none';
                input.style.boxShadow = '0 0 0 1px #E84F4F';
            } else {
                errorMsg.style.display = 'none';
                input.style.border = '';
                input.style.outline = '';
                input.style.boxShadow = '';
            }
        }
        
        checkSignUpButton();
    });
    document.getElementById("password").addEventListener('input', function() {
        const password = this.value;
        const password2 = document.getElementById("password2").value;
        const errorMsg = document.getElementById('error-msg-password');
        const input = document.getElementById("password2");
        
        if (password === '') {
            errorMsg.style.display = 'none';
            input.style.border = '';
            input.style.outline = '';
            input.style.boxShadow = '';
        } else if (password2 !== password) {
            errorMsg.textContent = "비밀번호가 일치하지 않습니다.";
            errorMsg.style.display = 'block';
            input.style.border = '1px solid #E84F4F';
            input.style.outline = 'none';
            input.style.boxShadow = '0 0 0 1px #E84F4F';
        } else {
            errorMsg.style.display = 'none';
            input.style.border = '';
            input.style.outline = '';
            input.style.boxShadow = '';
        }
        
        checkSignUpButton();
    });
    document.getElementById("password2").addEventListener('input', function() {
        const password = document.getElementById("password").value;
        const password2 = this.value;
        const errorMsg = document.getElementById('error-msg-password');
        const input = document.getElementById("password2");
        
        if (password2 === '') {
            errorMsg.style.display = 'none';
            input.style.border = '';
            input.style.outline = '';
            input.style.boxShadow = '';
        } else if (password2 !== password) {
            errorMsg.textContent = "비밀번호가 일치하지 않습니다.";
            errorMsg.style.display = 'block';
            input.style.border = '1px solid #E84F4F';
            input.style.outline = 'none';
            input.style.boxShadow = '0 0 0 1px #E84F4F';
        } else {
            errorMsg.style.display = 'none';
            input.style.border = '';
            input.style.outline = '';
            input.style.boxShadow = '';
        }
        
        checkSignUpButton();
    });
    document.getElementById("tel").addEventListener('input', function() {
        let tel = this.value;
        const errorMsg = document.getElementById('error-msg-tel');
        const input = document.getElementById("tel");
        const authRequestBtn = document.getElementById('authRequestBtn');
        
        const numbers = tel.replace(/[^0-9]/g, '');
        
        let formattedTel = '';
        if (numbers.length <= 3) {
            formattedTel = numbers;
        } else if (numbers.length <= 7) {
            formattedTel = numbers.slice(0, 3) + '-' + numbers.slice(3);
        } else if (numbers.length <= 11) {
            formattedTel = numbers.slice(0, 3) + '-' + numbers.slice(3, 7) + '-' + numbers.slice(7);
        } else {
            formattedTel = numbers.slice(0, 3) + '-' + numbers.slice(3, 7) + '-' + numbers.slice(7, 11);
        }
        
        if (tel !== formattedTel) {
            this.value = formattedTel;
            tel = formattedTel;
        }
        if (tel === '') {
            errorMsg.style.display = 'none';
            input.style.border = '';
            input.style.outline = '';
            input.style.boxShadow = '';
            authRequestBtn.style.cursor = 'not-allowed';
            authRequestBtn.style.backgroundColor = '#C7C7C7';
            authRequestBtn.style.color = '#F2F2F2';
            authRequestBtn.style.border = 'none';
            authRequestBtn.disabled = true;
        } else if (!numbers.startsWith('010')) {
            errorMsg.textContent = "010으로 시작하는 전화번호를 입력해 주세요.";
            errorMsg.style.display = 'block';
            input.style.border = '1px solid #E84F4F';
            input.style.outline = 'none';
            input.style.boxShadow = '0 0 0 1px #E84F4F';
            authRequestBtn.style.cursor = 'not-allowed';
            authRequestBtn.style.backgroundColor = '#C7C7C7';
            authRequestBtn.style.color = '#F2F2F2';
            authRequestBtn.style.border = 'none';
            authRequestBtn.disabled = true;
        } else if (!numbers.startsWith('010') || numbers.length < 11) {
            errorMsg.textContent = "전화번호 형식이 올바르지 않습니다.";
            errorMsg.style.display = 'block';
            input.style.border = '1px solid #E84F4F';
            input.style.outline = 'none';
            input.style.boxShadow = '0 0 0 1px #E84F4F';
            authRequestBtn.style.cursor = 'not-allowed';
            authRequestBtn.style.backgroundColor = '#C7C7C7';
            authRequestBtn.style.color = '#F2F2F2';
            authRequestBtn.style.border = 'none';
            authRequestBtn.disabled = true;
        } else {
            errorMsg.style.display = 'none';
            input.style.border = '';
            input.style.outline = '';
            input.style.boxShadow = '';
            authRequestBtn.style.cursor = 'pointer';
            authRequestBtn.style.backgroundColor = '#FFFFFF';
            authRequestBtn.style.color = '#491449';
            authRequestBtn.style.border = '1px solid #491449';
            authRequestBtn.disabled = false;
        }
        
        checkSignUpButton();
    });
    
    const sexRadios = document.querySelectorAll('input[name="sex"]');
    sexRadios.forEach(radio => {
        radio.addEventListener('change', checkSignUpButton);
    });
    
    const checkbox = document.querySelector('.main-checkbox');
    checkbox.addEventListener('change', checkSignUpButton);
    
    
    checkSignUpButton();
});

let users = []; // 가입한 사용자들 배열

// 가입 함수
function onClickSignUp() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const tel = document.getElementById("tel").value;
    const sex = document.querySelector('input[name="sex"]:checked').value;
    const introduction = document.getElementById("text").value;
    const agree = document.querySelector('.main-checkbox').checked;

    if (name === "" || email === "" || password === "" || password2 === "") {
        alert("모든 필수 정보를 입력해 주세요.");
        return;
    } else {
        const newUser = {
            name: name,
            email: email,
            password: password,
            tel: tel,
            sex: sex,
            introduction: introduction,
            agree: agree,
            createdAt: new Date().toLocaleDateString()
        };
        users.push(newUser);
        console.log(users);
        console.log(users.length);
        if (users.length > 0) {
            const noUserBox = document.querySelector('.main-L-invite-textBox');
            const inviteBox = document.querySelector('.main-L-inviteBox');
            
            console.log('사용자 수:', users.length);
            console.log('사용자들:', users);
            
            // "가입한 멤버가 없어요" 메시지 숨기기
            noUserBox.style.display = 'none';
            
            // 기존 사용자 요소들 제거
            const existingUsers = inviteBox.querySelectorAll('.main-user-wrapper');
            console.log('기존 사용자 요소 수:', existingUsers.length);
            existingUsers.forEach(user => user.remove());
            
            // 새 사용자들 추가
            users.forEach((user, index) => {
                console.log(`${index + 1}번째 사용자 추가:`, user.name);
                
                const userWrapper = document.createElement('div');
                userWrapper.className = 'main-user-wrapper';
                userWrapper.style.display = 'flex'; // CSS의 display: none을 덮어쓰기
                userWrapper.innerHTML = `
                    <img src="./icons/my_profile.png" width="40px" style="border-radius: 50%;">
                    <div class="main-user-name">${user.name}</div>
                `;
                const userPhone = user.tel.slice(0, 3) + '-' + '****' + '-' + user.tel.slice(9 , 13);
                const userPassword = user.password.replace(/./g, '*');
                // 클릭 이벤트 추가
                userWrapper.addEventListener('click', () => {
                    alert(`
                        이름: ${user.name}
                        이메일: ${user.email}
                        비밀번호: ${userPassword}
                        전화번호: ${userPhone}
                        성별: ${user.sex}
                        자기소개: ${user.introduction}
                        동의여부: ${user.agree ? '동의' : '미동의'}
                        (가입일시: ${user.createdAt})
                    `);
                });
                
                inviteBox.appendChild(userWrapper);
                console.log('사용자 요소 추가됨:', userWrapper);
            });
            
            console.log('최종 사용자 요소 수:', inviteBox.querySelectorAll('.main-user-wrapper').length);
        }


        // 입력필드 초기화
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("password2").value = "";
        document.getElementById("tel").value = "";
        document.getElementById("text").value = "";
        
        // 라디오 버튼 초기화
        const sexRadios = document.querySelectorAll('input[name="sex"]');
        sexRadios.forEach(radio => {
            radio.checked = false;
        });
        
        // 체크박스 초기화
        document.querySelector('.main-checkbox').checked = false;
        // 인증코드 초기화
        document.getElementById("authCode").innerText = "000000";
        // 타이머 초기화
        document.getElementById("timer").style.display = "none";
        // 인증완료 버튼 초기화
        document.getElementById("authButton").disabled = true;
        document.getElementById("authButton").style.backgroundColor = '#C7C7C7';
        document.getElementById("authButton").style.color = '#F2F2F2';
        document.getElementById("authButton").style.cursor = 'not-allowed';
        // 인증번호 요청 버튼 초기화
        document.getElementById("authRequestBtn").disabled = true;
        document.getElementById("authRequestBtn").style.backgroundColor = '#C7C7C7';
        document.getElementById("authRequestBtn").style.color = '#F2F2F2';
        document.getElementById("authRequestBtn").style.cursor = 'not-allowed';
        document.getElementById("authRequestBtn").style.border = 'none';
        // 에러메시지 초기화
        document.getElementById("error-msg").style.display = 'none';
        document.getElementById("error-msg-tel").style.display = 'none';
        document.getElementById("error-msg-password").style.display = 'none';
        
        // 인증 상태 초기화
        isAuthCompleted = false;
        
        // 가입 버튼 상태 초기화
        const signupButton = document.getElementById("signupButton");
        signupButton.disabled = true;
        signupButton.style.backgroundColor = '#C7C7C7';
        signupButton.style.color = '#F2F2F2';
        signupButton.style.cursor = 'not-allowed';
        
        // 회원가입 완료 알림
        alert("회원가입을 축하합니다!" + "\n" + "(가입일시: " + new Date().toLocaleDateString() + ")");
    }

}

// 인증번호 발급 함수
let timerInterval = null;

function onClickAuthCode() {
    const code = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    document.getElementById("authCode").innerText = code;

    const authButton = document.getElementById('authButton');
    authButton.disabled = false;
    authButton.style.backgroundColor = '#491449';
    authButton.style.color = '#FFFFFF';
    authButton.style.cursor = 'pointer';

    let time = 10;
    
    const timerElement = document.getElementById('timer');
    timerElement.style.display = "inline";
    
    timerInterval = setInterval(function(){
        const min = Math.floor(time / 60);
        const sec = time % 60;
        
        const formattedMin = min.toString().padStart(2, '0');
        const formattedSec = sec.toString().padStart(2, '0');
        
        timerElement.innerText = formattedMin + ":" + formattedSec;
        
        time = time - 1;
        
        if (time < 0) {
            clearInterval(timerInterval);
            timerElement.innerText = "00:00";
            timerElement.style.display = "inline";
            authButton.disabled = true;
            authButton.style.backgroundColor = '#C7C7C7';
            authButton.style.color = '#F2F2F2';
            authButton.style.cursor = 'not-allowed';
            isAuthCompleted = false;
            checkSignUpButton();

            alert("인증 시간이 만료되었습니다!")
        }
    }, 1000);

}

// 인증번호 확인 함수
function onClickAuth() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    const timerElement = document.getElementById('timer');
    timerElement.style.display = "none";

    const requestBtn = document.getElementById('authRequestBtn');
    requestBtn.disabled = true;
    requestBtn.style.backgroundColor = '#C7C7C7';
    requestBtn.style.color = '#F2F2F2';
    requestBtn.style.cursor = 'not-allowed';
    requestBtn.style.border = 'none';
    
    const authButton = document.getElementById('authButton');
    authButton.disabled = true;
    authButton.style.color= "#F2F2F2";
    authButton.style.backgroundColor = "#C7C7C7";
    authButton.style.cursor = 'not-allowed';
    authButton.innerText = "인증 완료";
    isAuthCompleted = true;
    checkSignUpButton();
    
    alert("인증이 완료되었습니다!");
}

// 이메일 유효성 검사 함수
let isAuthCompleted = false;

function validateEmail(email) {
    if (email === '') {
        return { isValid: false, message: '이메일을 입력해 주세요.' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: '올바른 이메일 형식이 아닙니다.' };
    }
    
    const allowedDomains = ['naver.com', 'gmail.com', 'hanmail.net', 'kakao.com'];
    const domain = email.split('@')[1];
    
    if (!allowedDomains.includes(domain)) {
        return { isValid: false, message: '네이버, 구글, 한메일, 카카오 계정만 사용 가능합니다.' };
    }
    
    return { isValid: true, message: '' };
}

// 여기부터 가입후, 수강생 리스트 추가기능

// 수강생 정보 담을 객체 생성 -> 가입 함수 안에 추가


// 기존 div display none -> 수강생 리스트 부분 display block

// 수강생 클릭시 해당 수강생 정보 모달출력 -> onclick 함수 생성