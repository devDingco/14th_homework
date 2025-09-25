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

    const goMyApisHandler = () => {
        router.push(`/myapis`)
    }

    return {
        goDetailHandler,
        goCreateBoardHandler,
        goGetCatsHandler,
        goMyApisHandler
    }
}

export default useLayoutNavigation