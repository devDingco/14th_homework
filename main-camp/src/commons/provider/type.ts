export interface IIsEditContext {
    isEdit: boolean,
    setIsEdit: (t: boolean) => void,

    // updatingTitle: string | undefined,
    // setUpdatingTitle: (t: string | undefined) => void,
    // updatingContents: string | undefined,
    // setUpdatingContents: (t: string | undefined) => void,

    postData: IPostData,
    setPostData: (t: any) => void,
    updatingBoardData: IPostUpdateData,
    setUpdatingBoardData: (t: any) => void,
}

type typeBoardAddress = {
    zipcode: string,
    address: string,
    addressDetail?: string
}

export interface IPostData {
    writer: string | [k: string],
    password: string | [k: string],
    title: string | [k: string],
    contents: string | [k: string],
    boardAddress?: typeBoardAddress,
    youtubeUrl?: string
}

export interface IPostUpdateData {
    title: string | [k: string],
    contents: string | [k: string],
    boardAddress?: typeBoardAddress,
    youtubeUrl?: string
}