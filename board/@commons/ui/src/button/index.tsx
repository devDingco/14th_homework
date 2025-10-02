import { ButtonHTMLAttributes, CSSProperties } from "react"
import { Path } from "react-hook-form"

interface IProps {
    type: "button" | "submit"
    className?: string
    children:React.ReactNode
    style?: CSSProperties

}

export function MyButton(props: IProps){


    return <button type={props.type} className={props.className} style={props.style}>{props.children}</button>
}