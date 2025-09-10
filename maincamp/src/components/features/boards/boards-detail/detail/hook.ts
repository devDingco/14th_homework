import { FetchBoardDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { formatInTimeZone } from "date-fns-tz";
import { useParams, useRouter } from "next/navigation";

export default function useBoardsDetail () {
    
    const router = useRouter();
    
    const params = useParams();
    const boardId = params.boardId

    const { data } = useQuery(FetchBoardDocument, {
        variables: {
            boardId: boardId as string
        }
    });

    const { writer, title, contents, youtubeUrl, images, createdAt, likeCount, dislikeCount } = data?.fetchBoard || {} ;

    // const date = createdAt?.slice(0,10)
    // 현재 createdAt에 저장된 시간은 UTC로 기존 코드 그대로 사용 시, 새벽시간대 작성하거나 UTC날짜가 바뀌는 시간대에 작성 시 날짜가 이상하게 나옴
    // 한국 시간대로 변경 필요: 외부 라이브러리 date-fns-tz 설치 후 서울 시간대로 변경
    let KSTdate;
    if(createdAt){
        KSTdate = formatInTimeZone(new Date(createdAt),'Asia/Seoul','yyyy-MM-dd')
    }
    const onClickBoardsList = () => {
        router.push('/boards')
    }

    const onClickBoardsEdit = () => {
        router.push(`/boards/${boardId}/edit`)
    }

    const imagesUrl = images?.filter(Boolean).map((el: string) => `https://storage.googleapis.com/${el}`)
    
    return{
        writer: writer,
        title: title,
        contents: contents,
        youtubeUrl: youtubeUrl,
        imagesUrl: imagesUrl,
        KSTdate: KSTdate,
        likeCount: likeCount,
        dislikeCount: dislikeCount,
        onClickBoardsList,
        onClickBoardsEdit,
    }
}