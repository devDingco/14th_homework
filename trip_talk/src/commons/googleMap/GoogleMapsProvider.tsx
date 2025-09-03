'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: boolean;
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
  loadError: false,
});

interface GoogleMapsProviderProps {
  children: ReactNode;
}

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      return new Promise<boolean>((resolve) => {
        // 이미 로드된 경우
        if (typeof window !== 'undefined' && window.google?.maps?.Map) {
          console.log('Google Maps API 이미 로드됨');
          setIsLoaded(true);
          resolve(true);
          return;
        }

        // 이미 스크립트가 존재하는 경우
        const existingScript = document.getElementById('google-map-script');
        if (existingScript) {
          existingScript.addEventListener('load', () => {
            setIsLoaded(true);
            resolve(true);
          });
          existingScript.addEventListener('error', () => {
            setLoadError(true);
            resolve(false);
          });
          return;
        }

        // 새로운 스크립트 생성
        const script = document.createElement('script');
        script.id = 'google-map-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&loading=async&libraries=marker`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          console.log('구글 맵 스크립트 로드 완료');
          // 스크립트 로드 후 약간의 지연을 두어 API가 완전히 초기화될 때까지 기다림
          setTimeout(() => {
            if (window.google && window.google.maps && window.google.maps.Map) {
              console.log('Google Maps API 완전히 로드됨');
              setIsLoaded(true);
              resolve(true);
            } else {
              console.error('스크립트는 로드되었지만 Google Maps API가 준비되지 않음');
              setLoadError(true);
              resolve(false);
            }
          }, 100);
        };

        script.onerror = () => {
          console.error('구글 맵 스크립트 로드 실패');
          setLoadError(true);
          resolve(false);
        };

        document.head.appendChild(script);
      });
    };

    loadGoogleMapsScript();
  }, []);

  return <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>{children}</GoogleMapsContext.Provider>;
}

export function useGoogleMaps() {
  const context = useContext(GoogleMapsContext);
  if (!context) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider');
  }
  return context;
}
