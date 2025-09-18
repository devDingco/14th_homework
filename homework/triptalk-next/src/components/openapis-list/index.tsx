'use client';

import styles from './openapis.module.css';
import useOpenApisList from './hook';

export default function OpenApisList() {
  const { champions, onClickChampion } = useOpenApisList();
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
