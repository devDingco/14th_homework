"use client"

import { gql, useQuery } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"

const FETCH_BOARDS = gql`
    query fetchBoards($page:Int){
  fetchBoards(page:$page){    
    number
    title
    writer
    number
  }
}
`

// const FETCH_BOARD = gql`
//     query fetchBoard($number:Int){
//   fetchBoard(number:$number){
//     number
//     title
//     writer
//   }
// }
// `


export default function Page(){

    // const { id } = useParams()

    const result = useQuery(FETCH_BOARDS,{
        variables:{
            page:1
        }
    })
        
    
    const router = useRouter()

    const move = (number) => {
        router.push(`/pages/day30-1/${number}`)
    }
    
    return(
        <>
        
        {result.data?.fetchBoards.map((item) => {
            return(
                <div key={item.number}>
                    <p onClick={() => move(item.number)}>{item.number}</p>
                    <p>{item.title}</p>
                    <p>{item.writer}</p>
                </div>
            )
        })}
        </>
        
        
    )
}