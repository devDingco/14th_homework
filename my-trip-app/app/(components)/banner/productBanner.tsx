import "./productBanner.css";
import "../../global.css";
import Image from "next/image";

export default function ProductBanner() {
    return (
        <div className="product_banner_container">
            <Image src="/images/desktop/productBanner.png" alt="banner" width={1920} height={516} className="banner_image" />
        </div>
    )
}   