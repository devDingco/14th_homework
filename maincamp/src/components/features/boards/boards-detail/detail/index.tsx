"use client"

import Sectiontitle from "@/components/ui/section/Sectiontitle"; 
import Sectioncontent from "@/components/ui/section/Sectioncontent";
import Writer from "@/components/features/boards/boards-detail/Writer";
import Like from "@/components/features/boards/boards-detail/Like";
import Button from "@/components/ui/button/Button";
import styles from './styles.module.css'
import YoutubeUrl from "@/components/features/boards/boards-detail/YoutubeUrl";
import GetVideoFromUrl from "@/components/features/boards/boards-detail/getVideoIdFromUrl";
import useBoardsId from "./hook";

export default function BoardsBoardDetailPage() {

    const {writer, title, contents, youtubeUrl, imagesUrl, KSTdate, likeCount, dislikeCount, onClickBoardsEdit, onClickBoardsList} = useBoardsId()

    return(
        <div className={styles.boardsDetail}>
            <Sectiontitle text={title || ""} />
            <Writer writer={writer || ""} date={KSTdate}/>
            <div className={styles.imagesGroup}>
                {imagesUrl?.map((url: string) => <img key={url} src={url} className={styles.addimage1}/>)}
            </div>
            <Sectioncontent content={contents || ""}/>
            {GetVideoFromUrl(youtubeUrl || "") ? <YoutubeUrl youtubeUrl={youtubeUrl || ""}></YoutubeUrl> : ""}
            <Like bad={dislikeCount || 0} good={likeCount || 0}/>
            <div className={styles.boardsDetail__button__group}>
                <Button type="button" variant='FormBtn' onClick={onClickBoardsList}><img src="/icons/menu.svg"/>목록으로</Button>
                <Button type="button" variant='FormBtn' onClick={onClickBoardsEdit}><img src="/icons/edit.svg"/>수정하기</Button>
            </div>
        </div>
    )
}