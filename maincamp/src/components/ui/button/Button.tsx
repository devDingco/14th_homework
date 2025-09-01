import styles from './Button.module.css'
import { ButtonProps } from "@/types/index";

export default function Button (props: ButtonProps){
    return(
        <button
            className={styles[props.variant]}
            type={props.type}
            disabled={props.disabled && true}
            onClick={props.onClick}
            >
            {props.children}
        </button>
    );
}