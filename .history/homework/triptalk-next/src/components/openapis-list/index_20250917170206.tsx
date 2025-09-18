'use client';
import React, { useEffect, useState } from 'react';

export default function OpenApisList() {
  const [champions, getChampions] = useState('');

  useEffect(() => {
    console.log('그려고나서실행');
    const getImage = async () => {
      const result = await fetch('');
    };
  });

  return <></>;
}
