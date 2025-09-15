'use client';

import { Modal } from 'antd';
import { useState, useEffect } from 'react';

interface AlertModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
}

export function AlertModal({ isOpen, title = '알림', message, onClose }: AlertModalProps) {
  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <button
          key="confirm"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          확인
        </button>,
      ]}
      centered
    >
      <p>{message}</p>
    </Modal>
  );
}

// Alert를 대체하는 hook
export function useAlertModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('알림');

  const showAlert = (msg: string, titleText?: string) => {
    setMessage(msg);
    if (titleText) setTitle(titleText);
    setIsOpen(true);
  };

  const closeAlert = () => {
    setIsOpen(false);
    setMessage('');
    setTitle('알림');
  };

  const AlertModalComponent = () => (
    <AlertModal isOpen={isOpen} title={title} message={message} onClose={closeAlert} />
  );

  return { showAlert, AlertModalComponent };
}
