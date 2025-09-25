'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { img01, img02, img03 } from '@/assets/images/images';
const images = [img01, img02, img03];

export default function Carousel() {
  const [image, setImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prev) => {
        const currentIndex = images.indexOf(prev);
        return images[(currentIndex + 1) % images.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='h-50 w-90 relative mb-6'>
      <Image src={image} alt='banner03' />
      <div className='absolute bottom-2 left-1/2 flex -translate-x-1/2 transform gap-1'>
        {images.map((_, index) => (
          <div
            key={index}
            className={`bg-red h-1 w-1 rounded-full bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] ${image === images[index] ? 'opacity-100' : 'opacity-50'}`}
          />
        ))}
      </div>
    </div>
  );
}
