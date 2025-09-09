export interface IWriteButtonProps {
    postUpdateData?: {
        writer: string,
        title: string,
        contents: string
    },
    postResistData?: {
        writer: string,
        password: string | number,
        title: string,
        contents: string
    },
    p?: string
}

export interface IValObj {
    writer: string,
    password: string | number,
    title: string,
    contents: string
}