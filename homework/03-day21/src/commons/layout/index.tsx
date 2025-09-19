"use client"

import { usePathname } from "next/navigation"
import BoardsBanner from "./banner"
import Navigation from "./navigation"

interface ILayoutProps {
    children: React.ReactNode
}

// const HIDDEN_TOP_PATHS = [
//     "/boards/new",
//     "/boards/[boardId]/edit", // 이렇게는 실제 동작 안 함 (동적 값 매칭 안 됨)
// ]

export default function Layout({children}: ILayoutProps) {
    const pathname = usePathname()
    // const params = useParams()
    // const boardId = String(params.boardId)

    const isHiddenTop =
        pathname === "/boards/new" || // 등록하기
        pathname.endsWith("/edit") ||
        pathname === "/openapis/new";    // 수정하기 (모든 boardId/edit 에 매칭)

    return(
        <>  
            {!isHiddenTop && <Navigation />}
            {!isHiddenTop &&<BoardsBanner />}
            {children}
        </>
    )
}