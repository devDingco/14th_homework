"use client"

import { gql, useQuery } from "@apollo/client"
import { useParams } from "next/navigation"

// const FETCH_BOARDS = gql`
//     query fetchBoards($page:Int){
//   fetchBoards(page:$page){    
//     number
//     title
//     writer
//   }
// }
// `

const FETCH_BOARD = gql`
    query fetchBoard($number:Int){
  fetchBoard(number:$number){
    number
    title
    writer
    contents
  }
}
`


export default function Page(){

    const { id } = useParams()

    const {data} = useQuery(FETCH_BOARD,{
        variables:{
            number : Number(id)
        }
    })
        
    
    // const router = useRouter()

    // const move = () => {
    //     router.push(`/pages/day30-1/${id}`)
    // }
    
    return(
        <>
            <div>{data?.fetchBoard?.title}</div>
            <div>{data?.fetchBoard?.writer}</div>
            <div>{data?.fetchBoard?.contents}</div>
        </>
        
        
    )
}