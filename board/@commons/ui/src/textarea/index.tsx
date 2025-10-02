import { FieldValues, Path, UseFormRegister } from "react-hook-form"


interface IProps<T extends FieldValues>{
    className?:string
    placeholder?:string
    register?:UseFormRegister<T>
    name: Path<T>
    defaultValue?:string


}

export function MyTextarea<T extends FieldValues>(props: IProps<T>){


    return <textarea className={props.className} {...props.register?.(props.name)} placeholder={props.placeholder} defaultValue={props.defaultValue}/>
}