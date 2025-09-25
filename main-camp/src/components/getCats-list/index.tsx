"use client"

import { ICatData } from "@/app/openapis/page"
import InfiniteScroll from "react-infinite-scroll-component"
import useGetCats from "./hook"

interface IGetCats {
    catsArray: Array<ICatData> | undefined,
    setCatsArray: React.Dispatch<React.SetStateAction<any>>
}

const GetCats = (props: IGetCats) => {

    const { scrollInfiniteFetchCats, hasMore } = useGetCats()

    return (
        <ul className={`flex_column`}>
            {
                props.catsArray
                ?
                <InfiniteScroll
                        dataLength={props.catsArray?.length} //This is important field to render the next data
                        next={() => scrollInfiniteFetchCats({cats: props.catsArray, setCatsArray: props.setCatsArray})}
                        hasMore={hasMore}
                        loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                        endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>보여줄 내용이 없어요!</b>
                        </p>
                        }
                    >
                    {props.catsArray?.map((v:ICatData, i:number) => {
                        return  <li key={i} data-key={v.id} className='flex_row'>
                                    <img data-key={v.id} className={``} src={v.url} alt="delete"/>
                                </li>
                    })}
                </InfiniteScroll>
                :
                <>기다리세여</>
            }
        </ul>
    )
}

export default GetCats