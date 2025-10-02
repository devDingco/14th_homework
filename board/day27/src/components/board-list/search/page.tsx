import { FormOutlined, SearchOutlined } from "@ant-design/icons";
import { DatePicker, Input, Space } from "antd";
import { ChangeEvent, useState } from "react";
import { buffer } from "stream/consumers";
import _ from "lodash"
import style from './style.module.css'
import { useRouter } from "next/navigation";

export default function Search({ refetch, setKeyword }) {
    const router = useRouter()
    const { RangePicker } = DatePicker;
    const [inputKeyword, setInputKeyword] = useState("");
    // const [keyword, setKeyword] = useState("")

    const onChangeDate = (day, date) => {
        // console.log("이건 데이데이: " + day)
        console.log("날짜가 어떻게찍히니: " + date)
        console.log("날짜가 어떻게찍히니: " + date[0])
        console.log("날짜가 어떻게찍히니: " + day?.[0].toISOString())
        refetch({
            search: inputKeyword,      // 검색어도 같이
            page: 1,
            startDate: date[0],
            endDate: date[1]
          })
    }


   
    const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        getDebouncd(e.target.value)
    }

    const getDebouncd = _.debounce((value) => {
        refetch({
            search: value,
            page: 1
        })
        setKeyword(value)
        setInputKeyword(value)
    }, 500)

    // const onClickSearch = () => {
    //     refetch({
    //         search: keyword,
    //         page: 1
    //     })
    //     if (typeof keywordvalue === "function") {
    //         keywordvalue(keyword)
    //     }

    // }
    const onclickNewMove = () => {
        router.push("/board/new")
    }

    return (

        <div className={style.searchbar}>
            <b>트립토크 게시판</b>
            <div>
                <Space direction="vertical" size={12}>
                <RangePicker onChange={onChangeDate}/>
    
                </Space>

                <Input placeholder="default size" prefix={<SearchOutlined />} onChange={onChangeKeyword} />
                {/* <button onClick={onClickSearch}>검색</button> */}
            </div>
            <FormOutlined />
            <button onClick={onclickNewMove}>트립토크 등록</button>
        </div>
    )
}