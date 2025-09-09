export interface IFetchBoardsData {
    fetchBoards: {
        _id: string,
        title: string,
        writer?: string,
        contents: string,
        createdAt: string
    }[]
}

// interface IFetchBoardsCount {
//     fetchBoardsCount: number
// }