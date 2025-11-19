'use client';

import { useEffect, useRef } from 'react';
import useKakaoMap from './hook';
import { KakaoMapProps } from './types';
import styles from './styles.module.css';

export default function KakaoMap({
  address,
  lat,
  lng,
  width = '100%',
  height = '400px',
  showMarker = true,
  onMapClick,
  onMarkerClick,
}: KakaoMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { isScriptLoaded, addressToCoordinates, initMap } = useKakaoMap();

  // 좌표 또는 주소로 지도 초기화 및 업데이트
  useEffect(() => {
    if (!isScriptLoaded || !mapContainerRef.current) {
      return;
    }

    const updateMap = async () => {
      let targetLat: number | null = null;
      let targetLng: number | null = null;

      // 좌표가 직접 제공된 경우
      if (lat !== undefined && lng !== undefined) {
        const parsedLat = typeof lat === 'string' ? parseFloat(lat) : lat;
        const parsedLng = typeof lng === 'string' ? parseFloat(lng) : lng;

        if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
          targetLat = parsedLat;
          targetLng = parsedLng;
        }
      }

      // 좌표가 없고 주소가 제공된 경우 주소를 좌표로 변환
      if (targetLat === null && targetLng === null && address) {
        const coords = await addressToCoordinates(address);
        if (coords) {
          targetLat = coords.lat;
          targetLng = coords.lng;
        }
      }

      // 좌표가 있으면 지도 업데이트
      if (targetLat !== null && targetLng !== null) {
        initMap(mapContainerRef.current!, targetLat, targetLng);
      }
    };

    updateMap();
  }, [isScriptLoaded, address, lat, lng, addressToCoordinates, initMap]);

  // 주소나 좌표가 없을 때
  if (!address && (lat === undefined || lng === undefined)) {
    return (
      <div className={styles.placeholder} style={{ width, height }}>
        <p>주소를 먼저 입력해 주세요.</p>
      </div>
    );
  }

  // 스크립트 로딩 중
  if (!isScriptLoaded) {
    return (
      <div className={styles.loading} style={{ width, height }}>
        <p>지도를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className={styles.mapContainer} style={{ width, height }}>
      <div ref={mapContainerRef} className={styles.mapWrapper} style={{ width, height }} />
    </div>
  );
}
