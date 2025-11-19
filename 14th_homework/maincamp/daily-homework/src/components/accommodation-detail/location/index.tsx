'use client';

import styles from './styles.module.css';
import KakaoMap from '@/components/apis/kakao-map';

interface LocationProps {
  address?: string;
  addressDetail?: string;
  lat?: number;
  lng?: number;
}

export default function Location({ address, addressDetail, lat, lng }: LocationProps) {
  const fullAddress = [address, addressDetail].filter(Boolean).join(' ');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>상세 위치</h2>
        {fullAddress && <p className={styles.address}>{fullAddress}</p>}
      </div>
      <div className={styles.mapContainer}>
        <KakaoMap
          address={address}
          lat={lat}
          lng={lng}
          width="100%"
          height="100%"
          showMarker={true}
        />
      </div>
    </div>
  );
}
