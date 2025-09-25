"use client"
import _ from "lodash";
import { ChangeEvent } from "react";
import { ISearchBoardPageProps } from "./types";
import { useRouter } from "next/navigation";



export default function useSearchBoardPage({ keyword, setKeyword, refetch }: ISearchBoardPageProps) {
    const router = useRouter()

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

    const onClickSubmit = () => {
        router.push("/boards/new")
    }

    return {
        keyword,
        onChangeKeyword,
        onClickSearch,
        onClickSubmit,
    }

}