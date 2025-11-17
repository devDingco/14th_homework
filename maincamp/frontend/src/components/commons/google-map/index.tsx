"use client";

import { useEffect, useRef } from "react";
import { Modal } from "antd";
import styles from "./styles.module.css";

interface GoogleMapComponentProps {
  lat: number;
  lng: number;
}

// Google Maps 타입 선언
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: unknown) => unknown;
        marker: {
          AdvancedMarkerElement: new (options: unknown) => unknown;
        };
      };
    };
  }
}

export default function GoogleMapComponent({ lat, lng }: GoogleMapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        // Google Maps API 스크립트 동적 로드
        if (!window.google) {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=marker`;
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
          });
        }

        const mapOptions = {
          center: { lat, lng },
          zoom: 15,
          mapId: "DEMO_MAP_ID",
        };

        const map = new window.google.maps.Map(mapRef.current, mapOptions);

        // 마커 생성
        new window.google.maps.marker.AdvancedMarkerElement({
          position: { lat, lng },
          map,
        });
      } catch (error) {
        console.error("Google Maps 로드 실패:", error);

        // 에러 모달 표시
        const showErrorModal = () =>
          Modal.error({
            title: "지도를 불러오는데 실패했습니다.",
            content: (error as Error)?.message ?? "지도를 불러올 수 없습니다.",
          });
        showErrorModal();

        // 지도 로드 실패 시 대체 텍스트 표시
        if (mapRef.current) {
          mapRef.current.innerHTML = `<div class="${styles.errorMessage}">지도를 불러올 수 없습니다.</div>`;
        }
      }
    };

    initMap();
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} className={styles.mapWrapper} />
    </div>
  );
}
