"uew client"

import { useState } from "react"


export default function usePagination(props){
    // const { data, refetch} = useQuery(FETCH_BOARDS)
    // const {data: dataCount} = useQuery(FETCH_BOARDS_COUNT)
    const [startPage, setStartPage] = useState(1)
    const [eventButton, setEventButton] = useState(1)
    // const lastPage = Math.ceil((dataCount?.fetchBoardsCount ?? 10) /10)

    const onClickPage = (event: React.MouseEvent<HTMLButtonElement> ) => {
        const pageNumber = Number(event.target.id)
        setEventButton(pageNumber)
        props.refetch({page: Number(event.target.id)})
    }

    const onClickPrevPage = () => {
        if(startPage === 1){

        }else{
        setStartPage(startPage - 5)
        props.refetch({page: startPage - 5})
        }
    }

    const onClickNextPage = () => {
        console.log("라스트페이지" + props.lastPage)
        if(startPage + 5 <= props.lastPage){
        setStartPage(startPage + 5)
        props.refetch({page: startPage + 5})}
    }




    return{
        startPage,
        onClickPage,
        onClickPrevPage,
        onClickNextPage,
        eventButton
    }
}