"use client"

import { useRouter } from "next/navigation"

const useLayoutNavigation = () => {
    const router = useRouter()

    const goDetailHandler = () => {
        router.push(`/boards`)
    }

    const goCreateBoardHandler = () => {
        router.push(`/boards/new`)
    }

    return {
        goDetailHandler,
        goCreateBoardHandler
    }
}

export default useLayoutNavigation