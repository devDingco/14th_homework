import { IBoardDetailData } from "@/app/boards/[boardId]/page";

export interface IBoardDetail {
    boardDetail: IBoardDetailData["getBoard"] | undefined
}