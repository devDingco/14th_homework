import { useState } from "react"
import { IPostData } from "@/commons/provider/type"

const useWriteButton = () => {
    const [isActive, setIsActive] = useState<boolean>(false)

    const activeButton = (valObj: IPostData) => {
        if (isActive) {
            if (valObj.writer === "" || valObj.password === "" || valObj.title === "" || valObj.contents === "") {
                setIsActive(false)
            }
        } else {
            if (valObj.writer && valObj.password && valObj.title && valObj.contents) {
                setIsActive(true)
            }
        }
    }
    
    return {
        isActive,
        activeButton
    }
}

export default useWriteButton