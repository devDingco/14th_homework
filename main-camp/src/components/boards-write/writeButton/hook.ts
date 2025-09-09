import { useState } from "react"
import { IValObj } from "./type"

const useWriteButton = () => {
    const [isActive, setIsActive] = useState<boolean>(false)

    const activeButton = (valObj: IValObj) => {
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