"use client";

import { useModalStore } from "@/app/commons/stores/store";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { UseFormSetValue } from "react-hook-form";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}

interface FormData {
  productName: string;
  summary: string;
  description: string;
  price: string;
  tags: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  lat: string;
  lng: string;
}

interface UsePurchaseWriteModalProps {
  setValue: UseFormSetValue<FormData>;
}

export default function usePurchaseWriteModal({
  setValue,
}: UsePurchaseWriteModalProps) {
  const { openModal, closeModal } = useModalStore();
  const getCoordinatesFromAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
    try {
      if (typeof window === "undefined" || !window.google) {
        console.error("Google Maps API is not loaded");
        return null;
      }

      const geocoder = new window.google.maps.Geocoder();
      
      return new Promise((resolve) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        geocoder.geocode({ address }, (results: any, status: any) => {
          if (status === "OK" && results && results[0]) {
            const location = results[0].geometry.location;
            resolve({
              lat: location.lat(),
              lng: location.lng(),
            });
          } else {
            console.error("Geocoding failed:", status);
            resolve(null);
          }
        });
      });
    } catch (error) {
      console.error("Error getting coordinates:", error);
      return null;
    }
  };
  const onCompleteAddress = async (data: Address) => {
    // 우편번호와 주소 설정
    setValue("zipcode", data.zonecode);
    setValue("address", data.address);

    // 구글맵 API를 통해 위도/경도 계산
    const coords = await getCoordinatesFromAddress(data.address);
    
    if (coords) {
      setValue("lat", coords.lat.toString());
      setValue("lng", coords.lng.toString());
    }

    // 모달 닫기
    closeModal();
  };
  const openAddressSearchModal = () => {
    openModal(
      <div 
        data-testid="modal-address-search"
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "500px",
          maxWidth: "90%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <DaumPostcodeEmbed onComplete={onCompleteAddress} />
      </div>
    );
  };
  return {
    openAddressSearchModal,
    closeModal,
  };
}
