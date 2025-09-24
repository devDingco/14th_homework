import { useState } from "react";

interface IUseListPagination {
    boardsRefetch:  Function | undefined
    lastPage: number
}

interface IPageState {
    startPage: number,
    selected: number
}

const useListPagination = (props: IUseListPagination) => {
    const[pageState, setPageState] = useState<IPageState>({
        startPage: 1,
        selected: 1
    })

    const onClickPage = (event: React.MouseEvent<HTMLLIElement>) => {
        props.boardsRefetch ? props.boardsRefetch({ page: Number(event.currentTarget.dataset.key) }) : null
        setPageState((prev: IPageState) => ({
            ...prev,
            selected: Number(event.currentTarget.dataset.key)
        }))
    }
  
    const onClickPrevPage = () => {
        if (pageState.startPage === 1) return;

        setPageState((prev: IPageState) => ({
            ...prev,
            startPage: (pageState.startPage - 10),
            selected: (pageState.selected - 10)
        }))

        props.boardsRefetch ? props.boardsRefetch({ page: pageState.startPage - 10 }) : null
    }
  
    const onClickNextPage = () => {
        if (pageState.startPage + 10 <= props.lastPage) {

            setPageState((prev: IPageState) => ({
                ...prev,
                startPage: (pageState.startPage + 10),
                selected: (pageState.selected + 10)
            }))

            props.boardsRefetch ? props.boardsRefetch({ page: pageState.startPage + 10 }) : null
        }
    }

    return {
        onClickPage,
        onClickNextPage,
        onClickPrevPage,
        pageState
    }
}

export default useListPagination