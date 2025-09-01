import styles from './Inputfield.module.css'
import { InputProps, TextareaProps } from "@/types/index";


/* input 컴포넌트: 라벨, span, input */
export function Inputfield (props: InputProps) {

    return(
        <div className={styles.Formfield}>
            <div><label>{props.label}</label>{props.required && <span>*</span>}</div>
            <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
        </div>
    );
}


/* TextArea 컴포넌트: 라벨, span, input */
export function Textareafield (props: TextareaProps){

    return(
        <div className={styles.Formfield}>
            <div><label>{props.label}</label>{props.required && <span>*</span>}</div>
            <textarea placeholder={props.placeholder} onChange={props.onChange}></textarea>
        </div>
    );
}