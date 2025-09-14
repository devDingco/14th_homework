import LayoutBanner from "./banner";
import LayoutNavigation from "./navigation";



export default function Layout ({children}: {children: React.ReactNode;}){
    return(
        <>
            <LayoutNavigation/>
            <LayoutBanner/>
            {children}
        </>
    )
}