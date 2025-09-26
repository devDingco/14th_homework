import styles from './styles.module.css'
import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChangeEvent } from 'react'
import { set } from 'lodash'

import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { on } from 'events'



const CREATE_USER = gql`
    mutation createUser($createUserInput: CreateUserInput!){
       createUser(createUserInput: $createUserInput){
        _id
        email
        name
       } 
    }
`

export default function SignUp(){
    const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  
    
    const [errors,setErrors] =useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    })
    
    
  
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()
    
    const [ createUser ]= useMutation(CREATE_USER)

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const onChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value)  
    }
    const onClickToLogin = () => {
        router.push('/login')
    }
    
    const onClickSignUp = async() => {
        let newErrors = {
            email: "",
            name: "",
            password: "",
            confirmPassword: ""
        }
        if(!email) newErrors.email = "이메일을 입력해주세요"
        if(!name) newErrors.name = "이름을 입력해주세요"
        if(!password) newErrors.password = "비밀번호를 입력해주세요"
        if(!confirmPassword) newErrors.confirmPassword = "비밀번호를 입력해주세요"
        if(password !== confirmPassword) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다"

        setErrors(newErrors)
        if (Object.values(newErrors).some((error)=> error !== "")) return
        
        try{
            const { data } = await createUser({
         variables: { createUserInput: { email, name, password } }
            }
        )
        console.log({email, name, password})
        openModal()

        }catch(error){
            alert(error.message)
        }
        
    }


    return(
      <div className={styles.container}>
            <div className={styles.signUpHeader}>
                <div className={styles.signUpBox}>
                    <div className={styles.signUpForm}>
                        <h1>회원가입</h1>
                        <div className={styles.signUpInputBox}>
                            <h2>회원가입을 위해 아래 빈칸을 모두 채워주세요</h2>
                            <div className={styles.signUpInputs}>
                                <div className={styles.signUpInputs__item}>
                                    <h3>이메일 <div>*</div></h3>
                                    <input className={errors.email ? styles.error : ""} onChange={onChangeEmail} placeholder="이메일을 입력해 주세요" type="text" />
                                    { errors.email && <div>{errors.email}</div>}
                                </div>
                                <div className={styles.signUpInputs__item}>
                                    <h3>이름 <div>*</div></h3>
                                    <input className={errors.name ? styles.error : ""} onChange={onChangeName} placeholder="이름을 입력해 주세요" type="text" />
                                    {errors.name && <div>{errors.name}</div>}
                                </div>
                                <div className={styles.signUpInputs__item}>
                                    <h3>비밀번호 <div>*</div></h3>
                                    <input className={errors.password ? styles.error : ""} onChange={onChangePassword} placeholder="비밀번호를 입력해 주세요" type="password" />
                                    {errors.password && <div>{errors.password}</div>}
                                </div>
                                <div className={styles.signUpInputs__item}>
                                    <h3>비밀번호 확인 <div>*</div></h3>
                                    <input className={errors.confirmPassword ? styles.error : ""} onChange={onChangeConfirmPassword} placeholder="비밀번호를 한번 더 입력해 주세요" type="password" />
                                    {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClickSignUp} className={styles.signUpBtn}>회원가입</button>
                    
                </div>
            </div>
             <Modal open={isModalOpen} onCancel={closeModal} footer={null} closable={false}>
        <div className={styles.modal}>
          <h2 className={styles.modal__title}>회원가입을 축하드려요!</h2>
          <img className={styles.modal__logo} src="/images/logo.png" alt="" />
          <button className={styles.modal__btn} onClick={()=>{
            closeModal()
            onClickToLogin()
            }}>로그인하기</button>
        </div>
      </Modal>
            
            <img className={styles.loginBg} src="/images/loginBg.png" alt="" />
        </div>
    )
}