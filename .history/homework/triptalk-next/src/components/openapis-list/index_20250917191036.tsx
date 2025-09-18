'use client';
import React, { useEffect, useState } from 'react';
import styles from './openalis.module.css';
import 

export default function OpenApisList() {
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
