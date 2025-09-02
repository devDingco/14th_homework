import styles from './Question.module.css'

export default function QuestionTitle(props:{number: Number; Question:String}){
    return(
        <div className={styles.questionCSS}>
            <div>
                <p>Q. {String(props.number).padStart(2,"0")}</p>
                <span>{props.Question}</span>
            </div>
            <img src="/icons/downarrow.svg"/>
        </div>
    )
}