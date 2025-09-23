"use client"

import { createContext, ReactNode, useContext, useState } from "react";

type Modal = {
    open: boolean,
    value: string
}
interface IIsModalContext {
    isWarningModal: Modal | undefined,
    setIsWarningModal: (t: Modal) => void
    isErrorModal: Modal | undefined,
    setIsErrorModal: (t: Modal) => void
}

const IsModalContext = createContext<IIsModalContext | undefined>(undefined)

export const IsModalProvider = ( {children}: { children:ReactNode } ) => {
    const [isWarningModal, setIsWarningModal] = useState<Modal>()
    const [isErrorModal, setIsErrorModal] = useState<Modal>()

    return (
        <IsModalContext.Provider value={{
            isWarningModal, setIsWarningModal,
            isErrorModal, setIsErrorModal
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