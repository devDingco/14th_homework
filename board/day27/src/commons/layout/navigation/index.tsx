"use client"

import { CaretDownOutlined, ConsoleSqlOutlined, UserOutlined } from "@ant-design/icons"
import style from "./style.module.css";
import { gql, useQuery } from "@apollo/client";
import { useAccessTokenStore } from "@/commons/stores";
import { useRouter } from "next/navigation";

export const FETCH_USER_LOGGEDIN = gql`
  query{  fetchUserLoggedIn{
        _id, email, name
    }
  }
`

export default function LayoutNavigation() {
    const { data } = useQuery(FETCH_USER_LOGGEDIN);

    const router = useRouter()

 

    const onclickLoginMove = () => {
        router.push("../")
    }
    return (
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
                    {data?.fetchUserLoggedIn?.name}님
                    {data?.fetchUserLoggedIn?.name ?
                        <div className={style.user_section}>
                            <div className={style.user_icon}>
                                <UserOutlined className={style.user_icon_left} />
                            </div>
                            <div >
                                <CaretDownOutlined className={style.caret_icon_right} />
                            </div>
                        </div>
                        :
                        <button onClick={onclickLoginMove}>로그인</button>

                }
                    {/* <div className={style.user_section}>
                        <div className={style.user_icon}>
                            <UserOutlined className={style.user_icon_left} />
                        </div>
                        <div >
                            <CaretDownOutlined className={style.caret_icon_right} />
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}