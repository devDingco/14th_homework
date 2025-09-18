"use client"

import PokemonItem from "@/components/openapis-list";
import { getPokeMon } from "@/components/openapis-list/getPokemon"
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function OpenApisPage(){

    const [hasMore, setHasMore] = useState(true)
    const [length, setLength] = useState(5)
    const onNext = () => {
        setLength(prev => prev + 5)
    }

    return(
        <>
            <InfiniteScroll
                dataLength={length}
                hasMore={hasMore}
                next={onNext}
                loader={<div>로딩중입니다</div>}
            >
            {Array.from({length: length}).map((_,index) => 
                <PokemonItem number={index + 1} />
            )}
            </InfiniteScroll>
        </>
    )
}