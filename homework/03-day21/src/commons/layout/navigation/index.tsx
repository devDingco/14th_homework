"use client"
import styles from './styles.module.css'

import Image from 'next/image'
import logoImage from "@assets/trip_logo.svg"
import dropDown from "@assets/down_arrow.png"
import userProfile from "@assets/userprofile_default.svg"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const IMAGE_SRC = {
    logoImage: { src: logoImage, alt: "로고이미지"},
    dropDown: { src: dropDown, alt: "아래화살표"},
    userProfile: { src: userProfile, alt: "유저프로필"}
}

export default function Navigation() {
    const pathname = usePathname()

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
                    <div className={`${styles.navbarItem} ${styles.navbarItemDisabled}`}>마이 페이지</div>
                </div>
                <div className={styles.navbarRight}>
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
            </div>
        </div>
    )
}