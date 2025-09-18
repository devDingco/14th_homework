'use client';
import { useEffect, useState } from 'react';

export default function useOpenApisList() {
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
    alert(`챔피언: ${champion.name}\n\n타이틀: ${champion.title}`);
  };
  return {
    onClickChampion,
    champions,
  };
}
