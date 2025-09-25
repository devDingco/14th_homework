"use client"
import styles from './styles.module.css'
import { useAccessTokenStore } from '@/stores/use-access-token'
import { RightOutlined } from '@ant-design/icons'
import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'

import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

export default function LayoutNavigation(){
    const items: MenuProps['items'] = [
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item（disabled）',
    key: '3',
    disabled: true,
  },
];
    const { setAccessToken, accessToken } = useAccessTokenStore()
    const accessTokenByLocal =localStorage.getItem("accessToken")
    useEffect(() => {
        if(accessTokenByLocal){
            setAccessToken(accessTokenByLocal)
        }
    }, [])
    const { data } = useQuery(FETCH_USER_LOGGED_IN);
    
    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div className={styles.main}>
                   
                        <img className={styles.main__logo} src="/images/logo.png" alt="" />
                        <ul className={styles.main__menu}>
                            <li className={styles.main__menu__item}>트립토크</li>
                            <li className={styles.main__menu__item}>숙박권 구매</li>
                            <li className={styles.main__menu__item}>마이 페이지</li>
                        </ul>

                 
                </div>
                <div className={styles.login}>
                    { accessToken ? 
                    <div>
                  
                    <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
        <button className={styles.login__profileBtn}>
                        <img src="/images/user.png" alt="user" />
                        <img src="/images/down_arrow.png" alt="down_arrow" />
                    </button>
    </a>
  </Dropdown>
                    </div>
                    
                        : <button className={styles.login__loginBtn}>로그인<RightOutlined className={styles.anticon} /></button>}
                </div>
            </div>
        </div>
    )
}