import { HTMLInputTypeAttribute } from "react"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"

interface IProps<T extends FieldValues> {
    type: HTMLInputTypeAttribute
    name : Path<T>
    register?: UseFormRegister<T>
    className?: string
    placeholder?:string
    disabled?:boolean
    defaultValue?:string
}

export function MyInput<T extends FieldValues> (props: IProps<T>) {
    

    return <input type={props.type} {...props.register?.(props.name)} className={props.className} placeholder={props.placeholder} disabled={props.disabled} defaultValue={props.defaultValue}/>
}