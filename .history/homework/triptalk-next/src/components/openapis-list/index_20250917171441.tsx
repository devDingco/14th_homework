'use client';
import React, { useEffect, useState } from 'react';

export default function OpenApisList() {
  const [champions, setChampions] = useState('');

  useEffect(() => {
    console.log('그려고나서실행');
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

  return <></>;
}
