'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useGoogleMaps } from './GoogleMapsProvider';
import './GoogleMap.css';

interface GoogleMapProps {
  latitude: number;
  longitude: number;
  title?: string;
  zoom?: number;
  className?: string;
  onMapReady?: (map: any) => void;
  readOnly?: boolean;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleMap({
  latitude,
  longitude,
  title = '선택된 위치',
  zoom = 15,
  className = '',
  onMapReady,
  readOnly = true,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const { isLoaded, loadError } = useGoogleMaps();

  // 구글 지도 초기화
  const initMap = useCallback(
    (lat: number, lng: number) => {
      console.log('initMap 호출됨:', { lat, lng, mapRef: !!mapRef.current });

      if (!mapRef.current) {
        console.log('mapRef.current가 없음');
        return;
      }

      if (typeof window === 'undefined') {
        console.log('window가 undefined');
        return;
      }

      if (!window.google) {
        console.log('window.google가 없음');
        return;
      }

      if (!window.google.maps) {
        console.log('window.google.maps가 없음');
        return;
      }

      if (!window.google.maps.Map) {
        console.log('window.google.maps.Map이 없음');
        return;
      }

      try {
        console.log('지도 생성 시작');

        // 기존 맵 인스턴스 정리
        if (mapInstance.current) {
          mapInstance.current = null;
        }

        // 맵 컨테이너 정리
        const mapContainer = mapRef.current;
        while (mapContainer.firstChild) {
          mapContainer.removeChild(mapContainer.firstChild);
        }

        // 지도 중심점 설정
        const center = { lat, lng };

        // Google Maps 객체 생성
        mapInstance.current = new window.google.maps.Map(mapContainer, {
          zoom,
          center,
          mapTypeId: 'roadmap',
          disableDefaultUI: false,
          streetViewControl: false,
          gestureHandling: readOnly ? 'none' : 'auto',
          zoomControl: !readOnly,
          scrollwheel: !readOnly,
          disableDoubleClickZoom: readOnly,
        });

        console.log('지도 생성 성공');

        // 마커 생성 (기존 방식만 사용)
        try {
          new window.google.maps.Marker({
            position: center,
            map: mapInstance.current,
            title,
          });
          console.log('마커 생성 성공');
        } catch (markerError) {
          console.error('마커 생성 실패:', markerError);
        }

        // 콜백 호출
        if (onMapReady) {
          onMapReady(mapInstance.current);
        }

        console.log('지도 초기화 완료');
      } catch (error) {
        console.error('지도 초기화 중 오류:', error);
      }
    },
    [zoom, title, onMapReady, readOnly]
  );

  // Google Maps API 로딩 완료 후 지도 초기화
  useEffect(() => {
    console.log('useEffect 실행:', {
      isLoaded,
      loadError,
      hasCoordinates: !!(latitude && longitude),
      latitude,
      longitude,
    });

    if (loadError) {
      console.error('Google Maps API 로딩 실패');
      return;
    }

    if (!isLoaded) {
      console.log('Google Maps API 아직 로딩 중...');
      return;
    }

    if (!latitude || !longitude) {
      console.log('좌표가 없음');
      return;
    }

    console.log('지도 초기화 조건 충족, 초기화 시작');

    // 약간의 지연을 두어 DOM이 완전히 준비될 때까지 기다림
    const timer = setTimeout(() => {
      initMap(latitude, longitude);
    }, 100);

    return () => clearTimeout(timer);
  }, [latitude, longitude, initMap, isLoaded, loadError]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className={`google-map ${className}`} ref={mapRef}>
      {loadError ? (
        <div className="google-map-placeholder">Google Maps를 로드할 수 없습니다.</div>
      ) : !latitude || !longitude ? (
        <div className="google-map-placeholder">
          {readOnly ? '위치 정보가 없습니다.' : '주소를 먼저 입력해 주세요.'}
        </div>
      ) : !isLoaded ? (
        <div className="google-map-placeholder">지도를 로딩 중입니다...</div>
      ) : null}
    </div>
  );
}
