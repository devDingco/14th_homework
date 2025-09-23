'use client'
import { DatePicker } from 'antd'
import styles from './styles.module.css'
import { Search, DriveFileRenameOutline } from '@mui/icons-material'
import { ChangeEvent, useEffect } from 'react'
import _ from 'lodash'
const { RangePicker } = DatePicker

export default function BoardsSearch(props) {
  const { setKeyword, refetch } = props
  // console.log('🚀 ~ BoardsSearch ~ keyword:', keyword)
  const getDebounce = _.debounce((value) => {
    refetch({
      search: value,
      page: 1,
    })
    setKeyword(value)
    console.log('새로고침됨?')
  }, 500)

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value
    console.log(keyword)
    // 이게 검색 버튼을 누르면 검색이 돼야하는거 아니에요?

    // 근데 그러면 리패치를 하면 자자자

    // 인풋에 입력을 해
    // 그러면 리페치가 됩니다.

    getDebounce(keyword)
  }
  console.log('리렌더링')

  return (
    <div className={styles.boardSearchLayout}>
      {/* 날짜 + 서치바 */}
      <div className={styles.searchActive}>
        {/* 날짜(antd DatePicker) */}
        <RangePicker className={styles.datePicker} />

        {/* 서치바 */}
        <div className={styles.searchBar}>
          <label htmlFor="searchBar">
            <Search />
          </label>
          <input
            type="text"
            placeholder="제목을 검색해 주세요."
            id="searchBar"
            onChange={onChangeKeyword}
            // defaultValue={keyword}
            // value={keyword}
          />
        </div>

        {/* 검색 버튼 */}
        <button className={styles.searchButton}>검색</button>
      </div>
      {/* 트립토크 등록 */}
      <button className={styles.iconButton}>
        <DriveFileRenameOutline />
        <p>트립토크 등록</p>
      </button>
    </div>
  )
}
