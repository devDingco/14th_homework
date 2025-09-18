import styles from './Inputfield.module.css'
import { InputProps, TextareaProps } from "@/types/index";


/* input 컴포넌트: 라벨, span, input */
export function Inputfield (props: InputProps) {

    return(
        <div className={styles.Formfield}>
            <div><label>{props.label}</label>{props.required && <span>*</span>}</div>
            <input type={props.type} placeholder={props.placeholder} id={props.id} value={props.type === "password" && props.isEdit ? "*********" : props.value} disabled={props.isEdit} onChange={props.onChange} />
        </div>
    );
}


/* TextArea 컴포넌트: 라벨, span, input */
export function Textareafield (props: TextareaProps){

    return(
        <div className={props.isCommentField? styles.Commentfield :styles.Formfield}>
            {props.isCommentField? "" : <div><label>{props.label}</label>{props.required && <span>*</span>}</div>}
            <textarea placeholder={props.placeholder} id={props.id} value={props.value} onChange={props.onChange} maxLength={props.maxLength}></textarea>
        </div>
    );
}