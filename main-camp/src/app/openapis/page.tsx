"use client"

import useFetchGetCats from "@/commons/api/query/useFetchGetCats"
import GetCats from "@/components/getCats-list"
import { useEffect, useState } from "react"

// {
//     "breeds": [],
//     "id": "253",
//     "url": "https://cdn2.thecatapi.com/images/253.jpg",
//     "width": 700,
//     "height": 525
// }

export interface ICatData {
    breeds: Array<any> | undefined,
    id: string,
    url: string,
    width: number,
    height: number
}

const getCatsPage = () => {
    const [catsArray, setCatsArray] = useState<Array<ICatData>>()

    useEffect(()=>{
        (async () => {
            const data = await useFetchGetCats()
            setCatsArray(data?.catsArray)
        })()
        
    },[])

    return (
        <GetCats catsArray={catsArray} setCatsArray={setCatsArray}/>
    )
}

export default getCatsPage