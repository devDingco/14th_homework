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

type TCustomModalProps = {
  btnName?: string;
  title?: string;
  children?: React.ReactNode;
};

export default function CustomModal({
  title,
  btnName,
  children,
}: TCustomModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{btnName || 'Open'}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title || 'Are you absolutely sure?'}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
