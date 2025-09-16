import Button from "../button/Button";
import styles from './SearchBar.module.css'

export default function SearchBar (){
    return(
        <div className={styles.searchbar}>
            <div>달력 검색</div>
            <div>서치바</div>
            <Button type="submit" variant="CommentBtn">
                검색
            </Button>
        </div>
    )
}