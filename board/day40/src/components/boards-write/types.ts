import { FetchBoardQuery } from "@/commons/graphql/graphql";

export interface IMyvariables {
    boardId: string;
    password: string;
    updateBoardInput: {
        title?: string;
        contents?: string;
        youtubeUrl?: string,
        boardAddress?:{
            zipcode?: string,
            address?: string,
            addressDetail?: string
        }
    }
}

export interface IBoardsWriteProps {
    isEdit: boolean;
    data: FetchBoardQuery;
}