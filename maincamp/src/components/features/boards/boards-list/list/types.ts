export interface IUseBoardsList{
    changeCurrentPage: (newNum: number) => void, 
    fetchBoards: any[], 
    fetchBoardsCount: number, 
    onClickBoardsNew: ()=> void, 
    flex: string[], 
    textAlign: CanvasTextAlign[], 
    pageNum: number[], 
    currentPage: number,
    loading: any,
}