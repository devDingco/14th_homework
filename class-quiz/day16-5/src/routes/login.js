import '../style/login.css'

export const CustomInput = (props) => {


    return(
        <div className='CustomInput'>
            <div>
                <input type={props.type} placeholder={props.placeholder}/>
                <img src='/assets/icons/delete.svg' />
            </div>
            <hr/>
            <span>{props.error}</span>
        </div>
    )
}


export const CustomButton = (props) => {

    const iconPath = `/assets/icons/${props.icon}.svg`
    const classBtn = `CustomButton ${props.className}`

    return(
        <button className={classBtn}>{props.icon && <img src={iconPath}/>}{props.label}</button>
    )
}

const Login = () => {


    return(
        <div className='LoginBackground'>
            <div className="Logogroup">
                <div className="Logoicons">
                    <img src='/assets/icons/location.svg' />
                    <div></div>
                </div>
                <div className="Logotitle">잇츠로드</div>
            </div>
            <div className="LoginField">
                <div className='LoginInputgroup'>
                    <CustomInput type="text" placeholder="이메일을 입력해주세요." error="이메일 주소를 다시 확인해주세요." />
                    <CustomInput type="password" placeholder="비밀번호를 입력해주세요." error="8~16자의 영문, 숫자, 특수 문자만 사용 가능합니다." />
                </div>
                <div className="LoginButtongroup">
                    <CustomButton className="BtnLogin" label="로그인"/>
                    <div className="BtnSecondarygroup">
                        <div>이메일 찾기</div>
                        <div className="verticalLine"></div>
                        <div>비밀번호 찾기</div>
                        <div className="verticalLine"></div>
                        <div>회원가입</div>
                    </div>
                    <CustomButton className="BtnKakao" icon="kakaotalk" label="카카오톡으로 로그인"/>
                </div>
            </div>
        </div>

    )
}

export default Login;