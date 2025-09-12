'use client';
import DaumPostcodeEmbed from 'react-daum-postcode';
import React, { useState } from 'react';
import { Button, Modal } from 'antd';

interface AddressModalProps {
  onAddressSelected?: (zipcode: string, address: string) => void;
}

export default function AddressModal({ onAddressSelected }: AddressModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleComplete = (data) => {
    console.log(data);
    
    // 부모에게 주소 데이터 전달
    if (onAddressSelected) {
      onAddressSelected(data.zonecode, data.address);
    }
    
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        우편번호 검색
      </Button>
      <Modal
        title=""
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal>
    </>
  );
}
