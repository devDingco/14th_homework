<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>있츠로드 - 로그인</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .login-container {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            padding: 30px;
        }
        .brand {
            text-align: center;
            margin-bottom: 30px;
        }
        .brand-name {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .brand-sub {
            font-size: 14px;
            color: #888;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-label {
            font-weight: 600;
            margin-bottom: 8px;
            color: #333;
            font-size: 14px;
        }
        .form-control {
            border-radius: 6px;
            padding: 12px 15px;
            border: 1px solid #ddd;
            font-size: 14px;
        }
        .form-control:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
        }
        .is-invalid {
            border-color: #dc3545;
        }
        .is-invalid:focus {
            border-color: #dc3545;
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);
        }
        .error-message {
            color: #dc3545;
            font-size: 12px;
            margin-top: 5px;
        }
        .password-toggle {
            position: absolute;
            right: 15px;
            top: 42px;
            cursor: pointer;
            color: #777;
        }
        .divider {
            display: flex;
            align-items: center;
            text-align: center;
            margin: 25px 0;
            color: #888;
            font-size: 12px;
        }
        .divider::before,
        .divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid #ddd;
        }
        .divider::before {
            margin-right: 10px;
        }
        .divider::after {
            margin-left: 10px;
        }
        .btn-login {
            background-color: #000;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 12px;
            font-weight: 600;
            width: 100%;
            margin-top: 10px;
        }
        .btn-login:hover {
            background-color: #333;
        }
        .login-links {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            font-size: 13px;
        }
        .login-links a {
            color: #555;
            text-decoration: none;
            padding: 0 10px;
            position: relative;
        }
        .login-links a:not(:last-child)::after {
            content: '|';
            position: absolute;
            right: -3px;
            color: #ddd;
        }
        .login-links a:hover {
            color: #000;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="brand">
            <div class="brand-name">잇츠로드</div>
            <div class="brand-sub">카카오톡으로 로그인</div>
        </div>

        <form>
            <div class="form-group">
                <label class="form-label"></label>
                <input type="email" class="form-control is-invalid" value="simplelife@gmail.com">
                <div class="error-message">이메일 주소를 다시 확인해주세요.</div>
            </div>

            <div class="form-group">
                <label class="form-label"></label>
                <div style="position: relative;">
                    <input type="password" class="form-control" value="●●●●●●●●">
                    <span class="password-toggle">
                        <i class="bi bi-eye"></i>
                    </span>
                </div>
                <div class="error-message">8~16자의 영문, 숫자, 특수 문자만 사용 가능합니다.</div>
            </div>

            <button type="submit" class="btn btn-login">로그인</button>
        </form>

        <div class="divider"></div>

        <div class="login-links">
            <a href="#">이메일 찾기</a>
            <a href="#">비밀번호 찾기</a>
            <a href="#">회원가입</a>
        </div>
    </div>

    <script>
        // 비밀번호 보기/숨기기 기능
        document.querySelector('.password-toggle').addEventListener('click', function() {
            const passwordInput = document.querySelector('input[type="password"]');
            const eyeIcon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.classList.remove('bi-eye');
                eyeIcon.classList.add('bi-eye-slash');
            } else {
                passwordInput.type = 'password';
                eyeIcon.classList.remove('bi-eye-slash');
                eyeIcon.classList.add('bi-eye');
            }
        });
    </script>
</body>
</html>