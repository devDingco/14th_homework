'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

interface BoardWriteProps {
  isEdit?: boolean;
  boardId?: string;
  initialData?: {
    writer: string;
    title: string;
    contents: string;
    zipcode?: string;
    address?: string;
    addressDetail?: string;
    youtubeUrl?: string;
  };
}

export default function BoardWrite({ 
  isEdit = false, 
  boardId, 
  initialData 
}: BoardWriteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    writer: '',
    password: '',
    title: '',
    contents: '',
    zipcode: '',
    address: '',
    addressDetail: '',
    youtubeUrl: ''
  });

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        password: '' // 비밀번호는 초기화
      }));
    }
  }, [isEdit, initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        // 수정 모드 - 비밀번호 확인
        const password = prompt("글을 입력할 때 입력하셨던 비밀번호를 입력해주세요");
        if (!password) {
          setLoading(false);
          return;
        }

        // GRAPHQL-API(updateBoard) 호출
        const response = await fetch(`/api/boards/${boardId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            password: password
          })
        });

        if (!response.ok) {
          throw new Error('수정에 실패했습니다.');
        }

        alert('게시글이 수정되었습니다.');
        router.push(`/boards/${boardId}`);
      } else {
        // 등록 모드 - GRAPHQL-API(createBoard) 호출
        const response = await fetch('/api/boards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('등록에 실패했습니다.');
        }

        alert('게시글이 등록되었습니다.');
        router.push('/boards');
      }
    } catch (error: any) {
      console.error('Error:', error);
      alert(error.message || '처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleZipcodeSearch = () => {
    // 우편번호 검색 기능
    alert('우편번호 검색 기능');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1 className={styles.title}>개시를 수정</h1>

      {/* 작성자 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>
          작성자 <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          name="writer"
          value={formData.writer}
          onChange={handleInputChange}
          disabled={isEdit}
          className={styles.input}
          required
          placeholder="홍경동"
        />
      </div>

      {/* 비밀번호 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>
          비밀번호 <span className={styles.required}>*</span>
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          disabled={isEdit}
          className={styles.input}
          required={!isEdit}
          placeholder="*******"
        />
      </div>

      {/* 제목 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>
          제목 <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={styles.input}
          required
          placeholder="코드램프"
        />
      </div>

      {/* 내용 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>
          내용 <span className={styles.required}>*</span>
        </label>
        <textarea
          name="contents"
          value={formData.contents}
          onChange={handleInputChange}
          rows={6}
          className={styles.textarea}
          required
          placeholder="코드램프 내용"
        />
      </div>

      {/* 주소 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>주소</label>
        
        <div className={styles.zipcodeContainer}>
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
            placeholder="01234"
            className={styles.zipcodeInput}
          />
          <button
            type="button"
            onClick={handleZipcodeSearch}
            className={styles.zipcodeButton}
          >
            우편번호 검색
          </button>
        </div>

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="서울특별시 강남구"
          className={styles.input}
        />

        <input
          type="text"
          name="addressDetail"
          value={formData.addressDetail}
          onChange={handleInputChange}
          placeholder="1211"
          className={styles.input}
        />
      </div>

      {/* 유튜브 링크 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>유통브 랜크</label>
        <input
          type="url"
          name="youtubeUrl"
          value={formData.youtubeUrl}
          onChange={handleInputChange}
          placeholder="빙크를 입력해 주세요."
          className={styles.input}
        />
      </div>

      {/* 사진 업로드 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>사진 함께</label>
        <div className={styles.imageUploadContainer}>
          {[1, 2, 3].map((num) => (
            <div key={num} className={styles.imageUploadBox}>
              <span className={styles.plus}>+</span>
              <span className={styles.uploadText}>클릭에서 사진 업로드</span>
            </div>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={() => router.back()}
          className={styles.cancelButton}
        >
          취소
        </button>
        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? '처리중...' : isEdit ? '수정하기' : '등록하기'}
        </button>
      </div>
    </form>
  );
}
src/components/boards-write/styles.module.css
css
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
}

.formGroup {
  margin-bottom: 20px;
}

.label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.required {
  color: #ff4d4f;
}

.input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.input:focus {
  outline: none;
  border-color: #1890ff;
}

.input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}

.zipcodeContainer {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.zipcodeInput {
  flex: 1;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.zipcodeButton {
  padding: 12px 16px;
  background-color: #666;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.zipcodeButton:hover {
  background-color: #555;
}

.imageUploadContainer {
  display: flex;
  gap: 10px;
}

.imageUploadBox {
  flex: 1;
  height: 100px;
  border: 2px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.3s;
}

.imageUploadBox:hover {
  border-color: #1890ff;
}

.plus {
  font-size: 24px;
  color: #666;
  margin-bottom: 5px;
}

.uploadText {
  font-size: 12px;
  color: #999;
  text-align: center;
}

.buttonContainer {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.cancelButton {
  flex: 1;
  padding: 15px;
  background-color: #666;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.cancelButton:hover {
  background-color: #555;
}

.submitButton {
  flex: 1;
  padding: 15px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submitButton:hover:not(:disabled) {
  background-color: #40a9ff;
}

.submitButton:disabled {
  background-color: #bae7ff;
  cursor: not-allowed;
}