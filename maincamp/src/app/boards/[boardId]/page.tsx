"use client"

import { FETCH_BOARD } from "@/graphql/queries/board";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Sectiontitle from "@/components/ui/section/Sectiontitle"; 
import Sectioncontent from "@/components/ui/section/Sectioncontent";
import Writer from "@/components/features/boards/detail/Writer";
import Like from "@/components/features/boards/detail/Like";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import styles from './styles.module.css'
import YoutubeUrl from "@/components/features/boards/detail/YoutubeUrl";
import { formatInTimeZone } from "date-fns-tz";

export default function BoardsBoardIdPage() {
    const params = useParams();
    const boardId = params.boardId

    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: boardId
        }
    })

    const { writer, title, contents, youtubeUrl, images, createdAt, likeCount, dislikeCount } = data?.fetchBoard || {} ;

    // const date = createdAt?.slice(0,10)
    // 현재 createdAt에 저장된 시간은 UTC로 기존 코드 그대로 사용 시, 새벽시간대 작성하거나 UTC날짜가 바뀌는 시간대에 작성 시 날짜가 이상하게 나옴
    // 한국 시간대로 변경 필요: 외부 라이브러리 date-fns-tz 설치 후 서울 시간대로 변경
    let KSTdate;
    if(createdAt){
        KSTdate = formatInTimeZone(new Date(createdAt&&createdAt),'Asia/Seoul','yyyy-MM-dd')
    }


    const imagesUrl = images?.map((el: string) => `https://storage.googleapis.com/${el}`)
    console.log("🚀 ~ BoardsBoardIdPage ~ imagesUrl:", imagesUrl)


    return(
        <div className={styles.boardsDetail}>
            <Sectiontitle text={title} />
            <Writer writer={writer} date={KSTdate}/>
            <div className={styles.imagesGroup}>
                {imagesUrl && imagesUrl.map((url: string) => <img key={url} src={url} className={styles.addimage1}/>)}
            </div>
            <Sectioncontent content={contents}/>
            {youtubeUrl !== "" ? <YoutubeUrl youtubeUrl={youtubeUrl}></YoutubeUrl> : ""}
            <Like bad={dislikeCount} good={likeCount}/>
            <div className={styles.boardsDetail__button__group}>
                <Link href='/'>
                    <Button type="button" variant='FormBtn'><img src="/icons/menu.svg"/>목록으로</Button>
                </Link>
                <Button type="button" variant='FormBtn'><img src="/icons/edit.svg"/>수정하기</Button>
            </div>
        </div>
    )
}