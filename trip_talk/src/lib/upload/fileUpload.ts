import { client } from '../apollo/client';
import { UPLOAD_FILE, UPLOAD_FILES } from '../../graphql/mutations';

// 파일 유효성 검사
export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  // 파일 크기 제한 (10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { isValid: false, error: '파일 크기는 10MB 이하여야 합니다.' };
  }

  // 허용된 이미지 타입
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'JPG, PNG, GIF, WEBP 파일만 업로드 가능합니다.' };
  }

  return { isValid: true };
};

// 단일 파일 업로드
export const uploadSingleFile = async (file: File): Promise<{ url: string; filename: string }> => {
  const validation = validateFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  try {
    const { data } = await client.mutate({
      mutation: UPLOAD_FILE,
      variables: { file },
      context: {
        headers: {
          'Apollo-Require-Preflight': 'true',
        },
      },
    });

    return data.uploadFile;
  } catch (error) {
    console.error('파일 업로드 실패:', error);
    throw new Error('파일 업로드에 실패했습니다.');
  }
};

// 다중 파일 업로드
export const uploadMultipleFiles = async (files: File[]): Promise<Array<{ url: string; filename: string }>> => {
  // 모든 파일 유효성 검사
  for (const file of files) {
    const validation = validateFile(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }
  }

  try {
    const { data } = await client.mutate({
      mutation: UPLOAD_FILES,
      variables: { files },
      context: {
        headers: {
          'Apollo-Require-Preflight': 'true',
        },
      },
    });

    return data.uploadFiles;
  } catch (error) {
    console.error('다중 파일 업로드 실패:', error);
    throw new Error('파일 업로드에 실패했습니다.');
  }
};

// 파일 미리보기 URL 생성
export const createPreviewUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

// 파일 미리보기 URL 해제
export const revokePreviewUrl = (url: string): void => {
  URL.revokeObjectURL(url);
};

// 파일 크기 포맷팅
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 파일 확장자 추출
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

// 이미지 압축 (선택사항)
export const compressImage = async (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // 비율 유지하면서 크기 조정
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      const newWidth = img.width * ratio;
      const newHeight = img.height * ratio;

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx?.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('이미지 압축에 실패했습니다.'));
          }
        },
        file.type,
        quality
      );
    };

    img.onerror = () => reject(new Error('이미지 로드에 실패했습니다.'));
    img.src = URL.createObjectURL(file);
  });
};
