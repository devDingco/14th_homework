"use client"

import { ICatData } from "@/app/openapis/page";
import useFetchGetCats from "@/commons/api/query/useFetchGetCats";
import { useState } from "react";

interface IScrollInfiniteFetchComments {
    cats: Array<ICatData> | undefined
    setCatsArray: React.Dispatch<React.SetStateAction<any>>
}

const useGetCats = () => {
    const [hasMore, setHasMore] = useState<boolean>(true);

    const scrollInfiniteFetchCats = async (parameter: IScrollInfiniteFetchComments) => {
        if (parameter.cats === undefined) return

        const data = await useFetchGetCats()
        console.log([...parameter.cats, ...data?.catsArray])
        parameter.setCatsArray([...parameter.cats, ...data?.catsArray])
        return {
            fetchCats: [...parameter.cats, ...data?.catsArray]
        }
    }

    return {
        scrollInfiniteFetchCats,
        hasMore
    }
}

export default useGetCats