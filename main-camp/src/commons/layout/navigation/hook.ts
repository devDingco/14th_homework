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

    const goGetCatsHandler = () => {
        router.push(`/openapis`)
    }

    return {
        goDetailHandler,
        goCreateBoardHandler,
        goGetCatsHandler
    }
}

export default useLayoutNavigation