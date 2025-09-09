import { FetchBoardQuery } from "@/commons/graphql/graphql";

export interface IMyvariables {
    boardId: string;
    password: string;
    updateBoardInput: {
        title?: string;
        contents?: string;
    }
}

export interface IBoardsWriteProps {
    isEdit: boolean;
    data: FetchBoardQuery;
}