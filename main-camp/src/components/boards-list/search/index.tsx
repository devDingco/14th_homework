"use client"

import { FetchBoardsQuery } from '@/commons/gql/graphql';
import styles from './styles.module.css'
import { DatePicker, Input } from 'antd';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useListSearch from './hook';
import { SearchOutlined } from '@ant-design/icons';
import { ISearch } from '@/app/boards/type';
import { useRouter } from 'next/navigation';

interface IListSearch {
    boardsRefetch: Function | undefined,
    boardsCountRefetch: Function | undefined,
    searchData: ISearch,
    setSearchData: Dispatch<SetStateAction<ISearch>>
}

const ListSearch = (props: IListSearch) => {
    const router = useRouter()

    const { onChangeKeyword, onChangeDate, onClickSearch } = useListSearch({searchData: props.searchData, setSearchData: props.setSearchData, boardsRefetch: props.boardsRefetch, boardsCountRefetch: props.boardsCountRefetch})

    const { RangePicker } = DatePicker

    const dateFormat = 'YYYY/MM/DD'

    useEffect(()=>{
        console.log(props.searchData)
    },[props.searchData])

    return (
        <div className='flex_row flex_justi_sb'>
            <div className={`${styles.search_frame} flex_row`}>
                <RangePicker
                    onChange={onChangeDate} defaultValue={[dayjs('2025/01/01', dateFormat), dayjs('2026/01/16', dateFormat)]}
                    format={dateFormat} className={`${styles.input_datepicker}`}
                />
                <Input onChange={onChangeKeyword} className={`${styles.input_search}`}placeholder='제목을 검색해 주세요.' prefix={<SearchOutlined />}></Input>
            </div>
            <button className={`${styles.triptalk_add} flex_row flex_justi_sb`} onClick={() => router.push(`/boards/new`)}>
                <img src="/svg/trip_add.png"/>
                <p className={`${styles.triptalk} sb_18_24`}>트립토크 등록</p>
            </button>
        </div>
    )
}

export default ListSearch