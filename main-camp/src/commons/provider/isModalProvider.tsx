import { createContext, ReactNode, useContext, useState } from "react";

interface IIsModalContext {
    isPostcode: boolean,
    setIsPostcode: (t: boolean) => void
}

const IsModalContext = createContext<IIsModalContext | undefined>(undefined)

export const IsModalProvider = ( {children}: { children:ReactNode } ) => {
    const [isPostcode, setIsPostcode] = useState<boolean>(false)

    return (
        <IsModalContext.Provider value={{
            isPostcode, setIsPostcode
        }}>
            {children}
        </IsModalContext.Provider>
    )
}

export const useIsModal = () => {
    const context = useContext(IsModalContext)
    if(!context) throw new Error("useIsModal 는 IsModalContext 안에서만 사용 가능합니다.")
    return context
}