'use client'
import { DatePicker } from 'antd'
import styles from './styles.module.css'
import { Search, DriveFileRenameOutline } from '@mui/icons-material'
import { ChangeEvent, useState } from 'react'
import _ from 'lodash'

const { RangePicker } = DatePicker

export default function BoardsSearch(props) {
  const { data, refetch } = props
  const [keyword, setKeyword] = useState('')

  const getDebounce = _.debounce((value) => {
    refetch({
      search: value,
      page: 1,
    })
    setKeyword(value)
  }, 500)

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value)
  }

  console.log('🚀 ~ BoardsSearch ~ keyword:', keyword)
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
