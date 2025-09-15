"use client"

import LayoutBanner from "./banner"
import styles from './styles.module.css'

const Layout = ({ children }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
        <div className={`${styles.layout} flex_column`}>
            <LayoutBanner />
            {children}
        </div>
    )
}

export default Layout