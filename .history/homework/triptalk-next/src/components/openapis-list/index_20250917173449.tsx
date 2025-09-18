'use client';
import React, { useEffect, useState } from 'react';
import styles from './openalis.module.css';

export default function OpenApisList() {
  const [champions, setChampions] = useState('');

  useEffect(() => {
    const getImage = async () => {
      const result = await fetch(
        'https://ddragon.leagueoflegends.com/cdn/13.18.1/data/ko_KR/champion.json'
      );
      const data = await result.json();
      setChampions(data.data);
      console.log('API 응답:', data);
    };
    getImage();
  }, []);

  return (
    <>
      <div className={styles.champion}>
        {Object.values(champions).map((champion) => (
          <div key={champion.id}>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${champion.id}.png`}
            />
            <div>{champion.name}</div> {/* 한국어 이름! */}
          </div>
        ))}
      </div>
    </>
  );
}
