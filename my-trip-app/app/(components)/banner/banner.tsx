import Image from "next/image";
import "./banner.css";
import "../../global.css";

export default function Banner() {
  return <div className="banner_container">
    <Image 
    src="/images/desktop/banner-1.png"
    alt="banner" 
    fill
    className="banner_image" 
    priority={false}
    />
  </div>;
}