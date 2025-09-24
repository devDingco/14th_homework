"use client"
import styles from './styles.module.css'

import Image from 'next/image'
import logoImage from "@assets/trip_logo.svg"
import dropDown from "@assets/down_arrow.png"
import userProfile from "@assets/userprofile_default.svg"
import rightArrow from "@assets/right_arrow_wh.svg"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAccessTokenStore } from '@/commons/stores/token-store'
import { useQuery } from '@apollo/client'
import { FETCH_USER_LOGGED_IN } from "./queries"

const IMAGE_SRC = {
    logoImage: { src: logoImage, alt: "로고이미지"},
    dropDown: { src: dropDown, alt: "아래화살표"},
    userProfile: { src: userProfile, alt: "유저프로필"},
    rightArrow: { src: rightArrow, alt: "오른쪽화살표"},
}



export default function Navigation() {
    const pathname = usePathname()
    // 전역 상태에서 accessToken 가져오기
    const accessToken = useAccessTokenStore((state) => state.accessToken)

    // 2. Apollo useQuery로 로그인 상태 조회
    // 클라이언트 토큰이 없으면 서버 호출할 필요 없음
    const { data, loading } = useQuery(FETCH_USER_LOGGED_IN, {
        skip: !accessToken, // 토큰 없으면 쿼리 스킵
    })

    // const [ isLoggedIn, setIsLoggedIn ] = useState(false)
     
    // 로그인 상태 판단
    const isLoggedIn = Boolean(accessToken && data?.fetchUserLoggedIn)


    return(
        <div className={styles.navbar}>
            <div className={styles.navbarInner}>
                <div className={styles.navbarLeft}>
                    <div className={styles.navbarLogo}>
                        <Image 
                            src={IMAGE_SRC.logoImage.src}
                            alt={IMAGE_SRC.logoImage.alt}                            
                        />
                    </div>
                    <Link
                        href="/boards"
                        className={`${styles.navbarItem} ${pathname === "/boards" ? styles.navbarItemActive : ""}`}
                    >
                        트립토크
                    </Link>

                    <div className={`${styles.navbarItem} ${styles.navbarItemDisabled}`}>숙박권 구매</div>
                    <Link
                        href="/openapis"
                        className={`${styles.navbarItem} ${pathname === "/openapis" ? styles.navbarItemActive : ""}`}
                    >
                        나만의 컨텐츠
                    </Link>
                                   
                    <div className={`${styles.navbarItem} ${styles.navbarItemDisabled}`}>마이 페이지</div>
                </div>
                <div className={styles.navbarRight}>
                    {isLoggedIn ? (
                        // 로그인 후: 프로필 + 드롭다운
                        <div className={styles.navbarProfile}>
                            <Image 
                                src={IMAGE_SRC.userProfile.src}
                                alt={IMAGE_SRC.userProfile.alt}
                                className={styles.navbarAvatar}
                            /> 
                            <Image
                                src={IMAGE_SRC.dropDown.src} 
                                alt={IMAGE_SRC.dropDown.alt}
                                className={styles.navbarDropdown}
                            />
                        </div>
                    ) : (
                        // 로그인 전: 로그인 버튼
                        <Link href="/login" className={styles.navbarButton}>
                            로그인
                            <Image 
                                src={IMAGE_SRC.rightArrow.src} 
                                alt={IMAGE_SRC.rightArrow.alt} 
                                className={styles.navbarArrow} 
                            />
                        </Link>

                    )}                  
                </div>
            </div>
        </div>
    )
}