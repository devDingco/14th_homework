import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_FILE, UPLOAD_FILES } from '../graphql/mutations';
import { validateFile, createPreviewUrl, revokePreviewUrl, compressImage } from '../lib/upload/fileUpload';

interface UploadedFile {
  url: string;
  filename: string;
}

interface UseFileUploadOptions {
  maxFiles?: number;
  maxSize?: number; // MB
  compress?: boolean;
  compressOptions?: {
    maxWidth?: number;
    quality?: number;
  };
}

export const useFileUpload = (options: UseFileUploadOptions = {}) => {
  const { maxFiles = 5, maxSize = 10, compress = false, compressOptions = { maxWidth: 800, quality: 0.8 } } = options;

  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 단일 파일 업로드 뮤테이션
  const [uploadSingleFile] = useMutation(UPLOAD_FILE);

  // 다중 파일 업로드 뮤테이션
  const [uploadMultipleFiles] = useMutation(UPLOAD_FILES);

  // 파일 추가
  const addFiles = useCallback(
    async (newFiles: FileList | File[]) => {
      setError(null);

      const fileArray = Array.from(newFiles);

      // 파일 개수 제한 확인
      if (files.length + fileArray.length > maxFiles) {
        setError(`최대 ${maxFiles}개까지 업로드 가능합니다.`);
        return;
      }

      // 파일 유효성 검사
      for (const file of fileArray) {
        const validation = validateFile(file);
        if (!validation.isValid) {
          setError(validation.error);
          return;
        }
      }

      // 이미지 압축 (옵션)
      let processedFiles = fileArray;
      if (compress) {
        try {
          processedFiles = await Promise.all(
            fileArray.map((file) => compressImage(file, compressOptions.maxWidth, compressOptions.quality))
          );
        } catch (error) {
          setError('이미지 압축에 실패했습니다.');
          return;
        }
      }

      // 미리보기 URL 생성
      const newPreviewUrls = processedFiles.map((file) => createPreviewUrl(file));

      setFiles((prev) => [...prev, ...processedFiles]);
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    },
    [files.length, maxFiles, compress, compressOptions]
  );

  // 파일 제거
  const removeFile = useCallback((index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });

    setPreviewUrls((prev) => {
      const newUrls = [...prev];
      // 미리보기 URL 해제
      if (newUrls[index]) {
        revokePreviewUrl(newUrls[index]);
      }
      newUrls.splice(index, 1);
      return newUrls;
    });

    setUploadedFiles((prev) => {
      const newUploaded = [...prev];
      newUploaded.splice(index, 1);
      return newUploaded;
    });
  }, []);

  // 모든 파일 제거
  const clearFiles = useCallback(() => {
    // 미리보기 URL 해제
    previewUrls.forEach((url) => revokePreviewUrl(url));

    setFiles([]);
    setPreviewUrls([]);
    setUploadedFiles([]);
    setError(null);
  }, [previewUrls]);

  // 단일 파일 업로드
  const uploadFile = useCallback(
    async (file: File): Promise<UploadedFile> => {
      setIsUploading(true);
      setError(null);

      try {
        const { data } = await uploadSingleFile({
          variables: { file },
          context: {
            headers: {
              'Apollo-Require-Preflight': 'true',
            },
          },
        });

        const uploadedFile = data.uploadFile;
        setUploadedFiles((prev) => [...prev, uploadedFile]);

        return uploadedFile;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '파일 업로드에 실패했습니다.';
        setError(errorMessage);
        throw error;
      } finally {
        setIsUploading(false);
      }
    },
    [uploadSingleFile]
  );

  // 다중 파일 업로드
  const uploadAllFiles = useCallback(async (): Promise<UploadedFile[]> => {
    if (files.length === 0) {
      setError('업로드할 파일이 없습니다.');
      return [];
    }

    setIsUploading(true);
    setError(null);

    try {
      const { data } = await uploadMultipleFiles({
        variables: { files },
        context: {
          headers: {
            'Apollo-Require-Preflight': 'true',
          },
        },
      });

      const uploadedFiles = data.uploadFiles;
      setUploadedFiles(uploadedFiles);

      return uploadedFiles;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '파일 업로드에 실패했습니다.';
      setError(errorMessage);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, [files, uploadMultipleFiles]);

  // 컴포넌트 언마운트 시 정리
  const cleanup = useCallback(() => {
    previewUrls.forEach((url) => revokePreviewUrl(url));
  }, [previewUrls]);

  return {
    // 상태
    files,
    previewUrls,
    uploadedFiles,
    isUploading,
    error,

    // 액션
    addFiles,
    removeFile,
    clearFiles,
    uploadFile,
    uploadAllFiles,
    cleanup,

    // 유틸리티
    fileCount: files.length,
    hasFiles: files.length > 0,
    canAddMore: files.length < maxFiles,
  };
};
