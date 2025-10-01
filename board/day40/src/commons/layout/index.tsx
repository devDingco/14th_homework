"use client"

import { usePathname } from "next/navigation"
import LayoutBanner from "./banner"
import LayoutNavigation from "./navigation"

const HIDDEN_HEADERS= [
    "/board/new", "/auth/login", "/auth/signup","/", "/boards/edit","/boards/{id}/edit"
]

export default function Layout({children}) {

    const pathname = usePathname();

    const isHiddenHeader = HIDDEN_HEADERS.includes(pathname);

    return (
        <>
            {!isHiddenHeader && <LayoutNavigation />}
            {!isHiddenHeader && <LayoutBanner />}
            {children}

        </>
    )
}