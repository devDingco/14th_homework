'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useFileUpload } from '../../hooks/useFileUpload';
import './FileUpload.css';

interface FileUploadProps {
  maxFiles?: number;
  maxSize?: number;
  compress?: boolean;
  onFilesChange?: (files: File[]) => void;
  onUploadComplete?: (uploadedFiles: Array<{ url: string; filename: string }>) => void;
  className?: string;
  disabled?: boolean;
}

export default function FileUpload({
  maxFiles = 5,
  maxSize = 10,
  compress = false,
  onFilesChange,
  onUploadComplete,
  className = '',
  disabled = false,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    files,
    previewUrls,
    uploadedFiles,
    isUploading,
    error,
    addFiles,
    removeFile,
    clearFiles,
    uploadAllFiles,
    cleanup,
    fileCount,
    hasFiles,
    canAddMore,
  } = useFileUpload({
    maxFiles,
    maxSize,
    compress,
  });

  // 파일 변경 시 콜백 호출
  useEffect(() => {
    onFilesChange?.(files);
  }, [files, onFilesChange]);

  // 업로드 완료 시 콜백 호출
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      onUploadComplete?.(uploadedFiles);
    }
  }, [uploadedFiles, onUploadComplete]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      addFiles(selectedFiles);
    }
    // 같은 파일을 다시 선택할 수 있도록 초기화
    event.target.value = '';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (disabled) return;

    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      addFiles(droppedFiles);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUploadClick = () => {
    if (!disabled && canAddMore) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`file-upload ${className} ${disabled ? 'disabled' : ''}`}>
      {/* 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        disabled={disabled}
      />

      {/* 드래그 앤 드롭 영역 */}
      <div
        className={`file-upload-dropzone ${hasFiles ? 'has-files' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleUploadClick}
      >
        {!hasFiles ? (
          <div className="file-upload-placeholder">
            <Image src="/icons/add.png" alt="upload" width={40} height={40} />
            <p className="file-upload-text">클릭하거나 파일을 드래그하여 업로드</p>
            <p className="file-upload-hint">
              최대 {maxFiles}개, {maxSize}MB 이하
            </p>
          </div>
        ) : (
          <div className="file-upload-grid">
            {previewUrls.map((url, index) => (
              <div key={index} className="file-upload-item">
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  width={160}
                  height={160}
                  className="file-upload-preview"
                />
                <button
                  type="button"
                  className="file-upload-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  disabled={disabled}
                >
                  <Image src="/icons/close.png" alt="remove" width={16} height={16} />
                </button>
                {isUploading && (
                  <div className="file-upload-loading">
                    <div className="file-upload-spinner"></div>
                  </div>
                )}
              </div>
            ))}

            {canAddMore && (
              <div className="file-upload-add-more" onClick={handleUploadClick}>
                <Image src="/icons/add.png" alt="add more" width={40} height={40} />
                <p className="file-upload-text">추가</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="file-upload-error">
          <p>{error}</p>
        </div>
      )}

      {/* 업로드 버튼 */}
      {hasFiles && !isUploading && (
        <div className="file-upload-actions">
          <button type="button" className="file-upload-button" onClick={uploadAllFiles} disabled={disabled}>
            업로드 ({fileCount}개)
          </button>
          <button type="button" className="file-upload-clear" onClick={clearFiles} disabled={disabled}>
            모두 지우기
          </button>
        </div>
      )}

      {/* 업로드 진행 상태 */}
      {isUploading && (
        <div className="file-upload-progress">
          <p>업로드 중... ({fileCount}개)</p>
        </div>
      )}
    </div>
  );
}
