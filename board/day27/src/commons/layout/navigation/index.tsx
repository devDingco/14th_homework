"use client"

import { CaretDownOutlined, UserOutlined } from "@ant-design/icons"
import style from "./style.module.css";

export default function LayoutNavigation(){

    return(
        <>
        <div className={style.navigation_wrapper}>
            <div className={style.navigation_container}>
                <div className={style.logo_section}>
                    <img className={style.logo_image} src="/assets/icons/triptrip.png" alt="" />
                    <div className={style.menu_section}>
                        <div className={style.menu_item}>트립토크</div>
                        <div className={style.menu_item}>숙박권 구매</div>
                        <div className={style.menu_item}>마이 페이지</div>
                    </div>
                </div>
                <div className={style.user_section}>
                    <div className={style.user_icon}>
                        <UserOutlined className={style.user_icon_left} />
                    </div>
                    <div >
                        <CaretDownOutlined className={style.caret_icon_right} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}