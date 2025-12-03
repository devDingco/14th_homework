export interface KakaoMapProps {
  /** 주소 (우선순위: 좌표가 없을 때 주소로 검색) */
  address?: string;
  /** 위도 */
  lat?: string | number;
  /** 경도 */
  lng?: string | number;
  /** 지도 너비 (기본값: '100%') */
  width?: string;
  /** 지도 높이 (기본값: '400px') */
  height?: string;
  /** 마커 표시 여부 (기본값: true) */
  showMarker?: boolean;
  /** 지도 클릭 시 좌표 변경 콜백 */
  onMapClick?: (lat: number, lng: number) => void;
  /** 마커 클릭 시 콜백 */
  onMarkerClick?: () => void;
}

export interface KakaoMapHookResult {
  /** 카카오 맵 스크립트 로드 완료 여부 */
  isScriptLoaded: boolean;
  /** 로드 에러 메시지 */
  loadError: string | null;
  /** 주소를 좌표로 변환하는 함수 */
  addressToCoordinates: (address: string) => Promise<{ lat: number; lng: number } | null>;
  /** 지도 인스턴스 */
  mapInstance: any;
  /** 지도 초기화 함수 */
  initMap: (container: HTMLDivElement, lat: number, lng: number) => void;
}

export interface AddressSearchResult {
  /** 위도 */
  lat: number;
  /** 경도 */
  lng: number;
  /** 전체 주소 */
  address: string;
}
