export interface IComment{
    _id: string;
    writer: String | null;
    contents: String
    rating: number;
    createdAt: string;
}

export interface IUseCommentList{
    data?: {
        fetchBoardComments: IComment[];
    }
}

