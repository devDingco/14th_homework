"use client";

import Image from "next/image";
import { useState } from "react";

const grayStar = "/images/graystar.webp";
const yellowStar = "/images/yellowstar.webp";

export default function QuizPage() {
  const [rating, setRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  return (
    <>
      <div style={{ display: "flex", gap: "5px" }}>
        {stars.map((star) => (
          <Image
            key={star}
            onClick={() => setRating(star)}
            src={star <= rating ? yellowStar : grayStar}
            alt={`${star} star`}
            width={40}
            height={40}
          />
        ))}
      </div>
      <div>{rating}점</div>
    </>
  );
}
