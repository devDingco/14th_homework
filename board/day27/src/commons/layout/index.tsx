"use client"

import { usePathname } from "next/navigation"
import LayoutBanner from "./banner"
import LayoutNavigation from "./navigation"

const HIDDEN_HEADERS= [
    "/board/new"
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