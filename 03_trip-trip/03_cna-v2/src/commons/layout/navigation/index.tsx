'use client'
import Image from 'next/image'
import triptripLogo from '@assets/triptrip.svg'
import styles from './styles.module.css'
import Link from 'next/link'
import { ChevronRight, ArrowDropDown } from '@mui/icons-material'
import { useQuery } from '@apollo/client'
import {
  FetchUserLoggedInDocument,
  FetchUserLoggedInQuery,
  FetchUserLoggedInQueryVariables,
} from 'commons/graphql/graphql'
import { useRouter } from 'next/navigation'
import { Dropdown, MenuProps, Space } from 'antd'
import ProfileImage from 'assets/profiles/profile5.webp'
const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'My Account',
    // disabled: true,
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    label: '로그아웃',
    // extra: '⌘P',
  },
]

export default function Navigation() {
  const { data, error } = useQuery<FetchUserLoggedInQuery, FetchUserLoggedInQueryVariables>(
    FetchUserLoggedInDocument
  )

  const isLoggedIn = !!data?.fetchUserLoggedIn && !error
  const router = useRouter()
  const handleNavigate = () => {
    router.push('/login')
  }
  console.log('🚀 ~ Navigation ~ accessToken:', data?.fetchUserLoggedIn?.name)

  return (
    <header className={styles.navigation}>
      <div className={styles.active_btns}>
        <Image src={triptripLogo} alt="triptrip_logo" width={51.52} />
        <ul className={styles.menu}>
          <li className={styles.active}>
            <Link href={'/boards'}>트립토크</Link>
          </li>
          <li>
            <Link href={'#'}>숙박권 구매</Link>
          </li>
          <li>
            <Link href={'#'}>마이 페이지</Link>
          </li>
        </ul>
      </div>

      {isLoggedIn ? (
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Image src={ProfileImage} width={40} height={40} alt="avatar" />
              {data?.fetchUserLoggedIn?.name}
              <ArrowDropDown />
            </Space>
          </a>
        </Dropdown>
      ) : (
        <button className={styles.login_btn} onClick={handleNavigate}>
          <p>로그인</p>
          <ChevronRight />
        </button>
      )}
    </header>
  )
}
