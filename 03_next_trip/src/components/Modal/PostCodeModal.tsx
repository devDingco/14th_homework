'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import DaumPostcodeEmbed from 'react-daum-postcode';

type TAddressDaum = {
  zonecode: string;
  address: string;
};
type TAddress = {
  zipcode: string;
  address: string;
};

type TCustomModalProps = {
  btnName?: string;
  title?: string;
  children?: React.ReactNode;
  onInputAddress: (address: TAddress) => void;
};

export default function CustomModal({
  btnName,
  onInputAddress,
}: TCustomModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data: TAddressDaum) => {
    const newAddress = {
      zipcode: data.zonecode,
      address: data.address,
    };

    onInputAddress?.(newAddress);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className='border-1 rounded-xl border border-gray-200 px-4 py-3'>
        {btnName || '우편번호 검색'}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>우편번호 검색</DialogTitle>
          <DialogDescription asChild>
            <DaumPostcodeEmbed onComplete={handleComplete} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
