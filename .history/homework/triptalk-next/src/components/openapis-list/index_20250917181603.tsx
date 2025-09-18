'use client';
import React, { useEffect, useState } from 'react';
import styles from './openalis.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const onClickChampion = (champion) => {
    console.log('챔피언클릭됨');
  };

  return (
    <div className="container">
      <div className={styles.title}>리그오브레전드 챔피언</div>
      <div className={styles.champion}>
        {Object.values(champions).map((champion) => (
          <div
            onClick={() => {
              onClickChampion(champion);
            }}
            className={styles.championCard}
            key={champion.id}
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${champion.id}.png`}
            />
            <div>{champion.name}</div> {/* 한국어 이름! */}
          </div>
        ))}
      </div>
    </div>
  );
}
