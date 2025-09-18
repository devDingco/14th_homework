export interface IPostcode {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<any>>,
}

export interface IDaumPostcodeData {
    // 기본 주소
    address: string;                // 전체 주소
    addressType: "R" | "J";         // R: 도로명, J: 지번
    userSelectedType: "R" | "J";    // 사용자가 선택한 주소 타입
  
    // 도로명 주소
    roadAddress: string;            // 도로명 주소
    bname: string;                  // 법정동/법정리
    buildingName: string;           // 건물명
    apartment: "Y" | "N";           // 공동주택 여부
    zonecode: string;               // 새 우편번호 (5자리)
  
    // 지번 주소
    jibunAddress: string;           // 지번 주소
  
    // 기타 정보
    sido: string;                   // 시/도
    sigungu: string;                // 시/군/구
    sigunguCode: string;            // 시군구 코드
    roadname: string;               // 도로명
    roadnameCode: string;           // 도로명 코드
    bcode: string;                  // 법정동 코드
    buildingCode: string;           // 건물 코드
  
    // 참고항목
    autoRoadAddress: string;        // 예상 도로명 주소
    autoJibunAddress: string;       // 예상 지번 주소
}
