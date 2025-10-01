"use client"

import { ChangeEvent, Dispatch, SetStateAction } from "react";
import _ from "lodash"
import { Dayjs } from "dayjs";
import { DatePicker } from "antd";
import { ISearch } from "@/app/boards/type";

interface IUseListSearch {
    searchData: ISearch,
    setSearchData: Dispatch<SetStateAction<ISearch>>,
    boardsRefetch: Function | undefined
    boardsCountRefetch: Function | undefined
}

type RangePickerProps = React.ComponentProps<typeof DatePicker.RangePicker>

const useListSearch = (props: IUseListSearch) => {

    const getDebounce = _.debounce((v: string) => {
        if (!props.boardsRefetch || !props.boardsCountRefetch) return
        
        props.boardsRefetch({
            startDate: props.searchData.startDate,
            endDate: props.searchData.endDate,
            search: v,
            page: 1,
        });

        props.boardsCountRefetch({
            startDate: props.searchData.startDate,
            endDate: props.searchData.endDate,
            search: v
        })

        props.setSearchData((prev: ISearch) => ({
            ...prev,
            search: v
        }))
    }, 500)

    const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
        getDebounce(event.target.value);
    }
    
    const onChangeDate: RangePickerProps["onChange"] = (dates, dateStrings) => {

        let startDate: string
        let endDate: string

        if (dateStrings) {
            startDate = new Date(dateStrings[0]).toISOString()
            endDate = new Date(dateStrings[1]).toISOString()
        }

        props.setSearchData((prev: ISearch) => ({
            ...prev,
            startDate: startDate,
            endDate: endDate
        }))
    }
    
    const onClickSearch =() => {
        if (!props.boardsRefetch || !props.boardsCountRefetch) return
        
        props.boardsRefetch({
            startDate: props.searchData.startDate,
            endDate: props.searchData.endDate,
            search: props.searchData.search,
            page: 1,
        });

        props.boardsCountRefetch({
            startDate: props.searchData.startDate,
            endDate: props.searchData.endDate,
            search: props.searchData.search
        })
    }

    return {
        onChangeKeyword,
        onChangeDate,
        onClickSearch
    }
}

export default useListSearch