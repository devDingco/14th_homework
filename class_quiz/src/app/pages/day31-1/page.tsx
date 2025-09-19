"use client"

import { gql, useQuery } from "@apollo/client"
import { useState } from "react"



const FETCH_BOARDS =gql`
    query fetchBoards($page:Int){
        fetchBoards(page : $page){
            _id
            writer
            title
            contents
            createdAt
        
        }
    }
`
export default function BoardList(){
    const { data , fetchMore} = useQuery(FETCH_BOARDS , {
        variables : {page : 1}
    }
    )
    console.log(data)
    const [page,setPage] = useState(1);
    const onScroll =async(event) =>{
        const {scrollTop,clientHeight,scrollHeight} = event.target;
        if(scrollTop + clientHeight >= scrollHeight -10){

            const nextPage = page +1;
            await fetchMore({
                variables : {page : nextPage},
                updateQuery : (prev, {fetchMoreResult}) =>{
                    if(!fetchMoreResult) return prev;
                    return {
                        fetchBoards:[...prev.fetchBoards,...fetchMoreResult.fetchBoards]
                    }
                }
            })
            setPage(page + 1)
        }
        
    }
    return(
          <div style={{ height: "500px", overflow: "auto" }} onScroll={onScroll}>
            {data?.fetchBoards?.map((el) => (
                <div key={el._id}>
                    <div>작성자: {el.writer}</div>
                    <div>제목: {el.title}</div>
                    <div>내용: {el.contents}</div>
                    <div>작성일 : {el.createdAt}</div>
                </div>

            ))}

        </div>

    )
}