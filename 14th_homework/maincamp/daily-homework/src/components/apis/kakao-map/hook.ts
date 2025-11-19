import { useEffect, useState, useRef } from 'react';
import { KakaoMapHookResult, AddressSearchResult } from './types';

declare global {
  interface Window {
    kakao: any;
  }
}

const KAKAO_MAP_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || '';
// services 라이브러리를 명시적으로 포함하여 로드
const KAKAO_MAP_SCRIPT_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;

export default function useKakaoMap(): KakaoMapHookResult {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // 카카오 맵 스크립트 로드
  useEffect(() => {
    // 이미 로드되어 있고 services도 사용 가능한지 확인
    if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
      setIsScriptLoaded(true);
      return;
    }

    // 스크립트가 이미 추가되어 있는지 확인
    const existingScript = document.querySelector(
      `script[src*="dapi.kakao.com"]`
    ) as HTMLScriptElement;
    if (existingScript) {
      let loadCalled = false; // load() 중복 호출 방지
      let checkServicesInterval: NodeJS.Timeout | null = null;
      let checkKakaoInterval: NodeJS.Timeout | null = null;

      // 스크립트가 완전히 로드되었는지 확인하는 함수
      const checkScriptLoaded = () => {
        // 스크립트가 완전히 로드되었거나 window.kakao가 이미 있는 경우
        if (window.kakao && window.kakao.maps) {
          // services가 이미 있으면 완료
          if (window.kakao.maps.services) {
            setIsScriptLoaded(true);
            if (checkKakaoInterval) clearInterval(checkKakaoInterval);
            if (checkServicesInterval) clearInterval(checkServicesInterval);
            return true;
          }

          // maps가 있지만 services가 없으면 load()를 호출해야 함
          // autoload=false이므로 load()를 호출해야 services가 로드됨
          if (!loadCalled) {
            loadCalled = true;
            try {
              window.kakao.maps.load(() => {
                // load() 콜백 후 services 확인
                if (window.kakao.maps.services) {
                  setIsScriptLoaded(true);
                  if (checkKakaoInterval) clearInterval(checkKakaoInterval);
                  if (checkServicesInterval) clearInterval(checkServicesInterval);
                } else {
                  // services가 아직 로드되지 않았을 수 있으므로 잠시 대기
                  checkServicesInterval = setInterval(() => {
                    if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
                      setIsScriptLoaded(true);
                      if (checkKakaoInterval) clearInterval(checkKakaoInterval);
                      if (checkServicesInterval) clearInterval(checkServicesInterval);
                    }
                  }, 100);
                }
              });
            } catch (error) {
              console.error('카카오 맵 load() 호출 실패:', error);
              if (checkKakaoInterval) clearInterval(checkKakaoInterval);
            }
          }
          return true;
        }
        return false;
      };

      // 즉시 확인 (이미 로드되었을 수 있음)
      if (checkScriptLoaded()) {
        return;
      }

      // 스크립트가 아직 로드 중이면 onload 이벤트를 기다림
      // onload가 이미 설정되어 있을 수 있으므로 addEventListener 사용
      const handleScriptLoad = () => {
        // 스크립트 로드 완료 후 약간의 지연을 두고 확인
        // (스크립트가 완전히 실행되기까지 시간이 필요할 수 있음)
        setTimeout(() => {
          checkScriptLoaded();
        }, 100);
      };

      // 이미 로드되었을 수 있으므로 즉시 한 번 확인
      // 그리고 onload 이벤트 리스너 추가
      if (existingScript.addEventListener) {
        existingScript.addEventListener('load', handleScriptLoad);
      } else {
        // 구형 브라우저 지원
        const originalOnload = existingScript.onload;
        existingScript.onload = (event) => {
          if (originalOnload) {
            originalOnload.call(existingScript, event);
          }
          handleScriptLoad();
        };
      }

      // 주기적으로 확인 (onload가 이미 발생했을 수 있음)
      checkKakaoInterval = setInterval(() => {
        if (checkScriptLoaded()) {
          if (checkKakaoInterval) clearInterval(checkKakaoInterval);
        }
      }, 100);

      // 타임아웃 설정 (15초 후 중단)
      const timeout = setTimeout(() => {
        if (checkKakaoInterval) clearInterval(checkKakaoInterval);
        if (checkServicesInterval) clearInterval(checkServicesInterval);
        console.error('카카오 맵 SDK 로드 타임아웃');
      }, 15000);

      return () => {
        if (checkKakaoInterval) clearInterval(checkKakaoInterval);
        if (checkServicesInterval) clearInterval(checkServicesInterval);
        clearTimeout(timeout);
      };
    }

    // 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = KAKAO_MAP_SCRIPT_URL;
    script.async = true;
    let checkServicesInterval: NodeJS.Timeout | null = null;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        try {
          window.kakao.maps.load(() => {
            // load() 콜백 후 services 확인
            if (window.kakao.maps.services) {
              setIsScriptLoaded(true);
              if (checkServicesInterval) clearInterval(checkServicesInterval);
            } else {
              // services가 아직 로드되지 않았을 수 있으므로 잠시 대기
              checkServicesInterval = setInterval(() => {
                if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
                  setIsScriptLoaded(true);
                  if (checkServicesInterval) clearInterval(checkServicesInterval);
                }
              }, 100);

              // 타임아웃 설정 (10초 후 중단)
              setTimeout(() => {
                if (checkServicesInterval) {
                  clearInterval(checkServicesInterval);
                  console.error('카카오 맵 services 로드 타임아웃');
                }
              }, 10000);
            }
          });
        } catch (error) {
          console.error('카카오 맵 load() 호출 실패:', error);
        }
      } else {
        console.error('카카오 맵 스크립트는 로드되었지만 window.kakao가 없습니다.');
      }
    };
    script.onerror = () => {
      console.error('카카오 맵 스크립트 로드 실패');
    };

    document.head.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트는 제거하지 않음 (다른 컴포넌트에서 사용할 수 있음)
      if (checkServicesInterval) clearInterval(checkServicesInterval);
    };
  }, []);

  // 주소를 좌표로 변환하는 함수
  const addressToCoordinates = async (
    address: string
  ): Promise<{ lat: number; lng: number } | null> => {
    if (!address || !isScriptLoaded) {
      return null;
    }

    return new Promise((resolve) => {
      if (!window.kakao || !window.kakao.maps) {
        console.error('카카오 맵 SDK가 로드되지 않았습니다.');
        resolve(null);
        return;
      }

      // services가 로드되었는지 확인
      if (!window.kakao.maps.services || !window.kakao.maps.services.Geocoder) {
        console.error('카카오 맵 Geocoder 서비스가 사용 가능하지 않습니다.');
        resolve(null);
        return;
      }

      try {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any[], status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            if (result && result.length > 0) {
              const coords = {
                lat: parseFloat(result[0].y),
                lng: parseFloat(result[0].x),
              };
              resolve(coords);
            } else {
              console.error('주소 검색 결과가 없습니다.');
              resolve(null);
            }
          } else {
            console.error('주소 검색 실패:', status);
            resolve(null);
          }
        });
      } catch (error) {
        console.error('Geocoder 초기화 실패:', error);
        resolve(null);
      }
    });
  };

  // 지도 초기화 함수
  const initMap = (container: HTMLDivElement, lat: number, lng: number) => {
    if (!isScriptLoaded || !window.kakao || !window.kakao.maps) {
      return;
    }

    // 기존 마커 제거
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }

    // 기존 지도가 있으면 중심만 이동, 없으면 새로 생성
    if (mapInstanceRef.current) {
      const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
      mapInstanceRef.current.setCenter(moveLatLng);
    } else {
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3, // 지도의 확대 레벨
      };

      const map = new window.kakao.maps.Map(container, options);
      mapInstanceRef.current = map;
    }

    // 마커 생성
    const markerPosition = new window.kakao.maps.LatLng(lat, lng);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(mapInstanceRef.current);
    markerRef.current = marker;

    return mapInstanceRef.current;
  };

  return {
    isScriptLoaded,
    addressToCoordinates,
    mapInstance: mapInstanceRef.current,
    initMap,
  };
}
