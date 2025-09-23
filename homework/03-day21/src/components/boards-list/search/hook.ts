"use client"
import _ from "lodash";
import { ChangeEvent } from "react";
import { ISearchBoardPageProps } from "./types";



export default function useSearchBoardPage({ keyword, setKeyword, refetch }: ISearchBoardPageProps) {
    const getDebounce = _.debounce((value) => {
        setKeyword(value)
        refetch({ search: value, page: 1, })       
    }, 500)

    const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
        getDebounce(event.target.value)
    }   

    const onClickSearch = () => {
        refetch({
            search: keyword,
            page: 1,
        })
    }

    return {
        keyword,
        onChangeKeyword,
        onClickSearch,
    }

}