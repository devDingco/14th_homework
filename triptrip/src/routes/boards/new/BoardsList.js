import { Link } from "react-router"
import { CustomButton } from "./BoardsNew"
import './BoardsNew.css'

const BoardsList = () => {
    return(
        <div>
            <Link to='./boards/new'>
                <CustomButton type="button" label="게시글 등록하기"/>
            </Link>
            <br />
            <Link to='./boards/detail'>
                <CustomButton type="button" label="게시물 상세"/>
            </Link>
        </div>

    )}


export default BoardsList