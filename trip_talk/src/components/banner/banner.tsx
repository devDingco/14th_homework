import Image from 'next/image';
import './banner.css';

export default function Banner() {
  return (
    <div className="banner">
      <Image src={'/images/banner/banner01.png'} alt="banner" fill className="banner_image" priority />
    </div>
  );
}
