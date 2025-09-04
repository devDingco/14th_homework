"use client"

import { useState } from 'react'
import Image from 'next/image'
import styles from './page.module.css'

const StarActive = '/star-active.png'
const StarDisabled = '/star-disabled.png'

export default function Home() {
  const [rating, setRating] = useState(0)

  const onClickStar = (starRating: number) => {
    setRating(starRating)
  }
  return (
    <div className={styles.container}>
      <div className={styles.starGroup}>
        {[1, 2, 3, 4, 5].map((star)=>
          <Image 
          key={star}
          src={star <= rating ? StarActive : StarDisabled}
          alt={`${star}점 별`}
          onClick={() => onClickStar(star)}
          width={50}
          height={50}
          />      
        )}
        
      </div>
      <p className={styles.ratingText}>
        {rating}점
      </p>
    </div>
  );
}
