'use client';

import './board.css';
import { useState, useRef, ChangeEvent, FormEvent, MouseEvent } from 'react';
import TextInput from '@/commons/text-input/text-input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DaumPostcode, { useDaumPostcodePopup } from 'react-daum-postcode';

const scriptUrl = `https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`;

interface PostcodeData {
  zonecode: string;
  roadAddress: string;
}

export default function Board() {
  const router = useRouter();
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [postCode, setPostCode] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);

  const open = useDaumPostcodePopup(scriptUrl);

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);

  // 필수 필드가 모두 채워졌는지 확인
  const isFormValid = author.trim() !== '' && password.trim() !== '' && content.trim() !== '';

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, setImage: (file: File | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const triggerFileInput = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  const removeImage = (setImage: (file: File | null) => void) => {
    setImage(null);
  };

  const handlePostCode = () => {
    open({
      onComplete: (data: PostcodeData) => {
        setPostCode(data.zonecode);
        setAddress(data.roadAddress);
      },
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!author || !password || !content) return;
    console.log('필수정보:', author, password, content);
    console.log('선택정보:', postCode, address, addressDetail, videoUrl);
    console.log('사진:', image1, image2, image3);
  };

  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handlePostCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostCode(e.target.value);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleAddressDetailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.target.value);
  };

  const handleVideoUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  return (
    <div className="container board_wrapper">
      <div className="board_title b_20_28">게시물 등록</div>
      <form className="board_form" onSubmit={handleSubmit}>
        <div className="board_form_input_wrapper">
          <div className="board_form_input_item">
            <div className="board_form_input_item_title">
              <label className="board_form_label me_16_24">
                작성자 <span>*</span>
              </label>
            </div>
            <TextInput placeholder="작성자 명을 입력해 주세요." value={author} onChange={handleAuthorChange} />
          </div>
          <div className="board_form_input_item">
            <div className="board_form_input_item_title">
              <label className="board_form_label me_16_24">
                비밀번호 <span>*</span>
              </label>
            </div>
            <TextInput placeholder="비밀번호를 입력해 주세요." value={password} onChange={handlePasswordChange} />
          </div>
        </div>
        <div className="board_form_input_wrapper">
          <div className="board_form_input_item">
            <div className="board_form_input_item_title">
              <label className="board_form_label me_16_24">
                내용<span>*</span>
              </label>
            </div>
            <textarea
              className="board_form_textarea"
              placeholder="내용을 입력해 주세요."
              value={content}
              onChange={handleContentChange}
            />
          </div>
        </div>
        <div className="board_form_input_wrapper">
          <div className="board_form_input_item">
            <div className="board_form_input_item_title">
              <label className="board_form_label me_16_24">주소</label>
            </div>
            <div className="board_postCode_wrapper">
              <input
                type="text"
                placeholder="01234"
                className="board_postCode_input"
                value={postCode}
                onChange={handlePostCodeChange}
              />
              <button type="button" className="board_postCode_button sb_18_24" onClick={handlePostCode}>
                우편번호 검색
              </button>
            </div>
            <TextInput placeholder="주소를 입력해 주세요." value={address} onChange={handleAddressChange} />
            <TextInput placeholder="상세주소" value={addressDetail} onChange={handleAddressDetailChange} />
          </div>
        </div>
        <div className="board_form_input_wrapper">
          <div className="board_form_input_item">
            <div className="board_form_input_item_title">
              <label className="board_form_label me_16_24">유튜브 링크</label>
            </div>
            <TextInput placeholder="링크를 입력해 주세요." value={videoUrl} onChange={handleVideoUrlChange} />
          </div>
        </div>
        <div className="board_form_input_item">
          <div className="board_form_input_item_title">
            <label className="board_form_label me_16_24">사진 첨부</label>
          </div>
          <div className="board_form_photo_wrapper_section">
            {/* 첫 번째 사진 업로드 */}
            <input
              type="file"
              ref={fileInputRef1}
              className="board_form_file_input"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={(e) => handleFileUpload(e, setImage1)}
            />
            <div className="board_form_photo_wrapper" onClick={() => triggerFileInput(fileInputRef1)}>
              {image1 ? (
                <>
                  <Image
                    src={URL.createObjectURL(image1)}
                    alt="업로드된 이미지 1"
                    width={160}
                    height={160}
                    className="board_form_photo_preview"
                  />
                  <button
                    type="button"
                    className="board_form_photo_remove"
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      removeImage(setImage1);
                    }}
                  >
                    <Image src={'/icons/close.png'} alt="photo" width={16} height={16} />
                  </button>
                </>
              ) : (
                <>
                  <Image src={'/icons/add.png'} alt="photo" width={40} height={40} />
                  <div className="board_form_photo_text r_16_24">클릭해서 사진 업로드</div>
                </>
              )}
            </div>

            {/* 두 번째 사진 업로드 */}
            <input
              type="file"
              ref={fileInputRef2}
              className="board_form_file_input"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={(e) => handleFileUpload(e, setImage2)}
            />
            <div className="board_form_photo_wrapper" onClick={() => triggerFileInput(fileInputRef2)}>
              {image2 ? (
                <>
                  <Image
                    src={URL.createObjectURL(image2)}
                    alt="업로드된 이미지 2"
                    width={160}
                    height={160}
                    className="board_form_photo_preview"
                  />
                  <button
                    type="button"
                    className="board_form_photo_remove"
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      removeImage(setImage2);
                    }}
                  >
                    <Image src={'/icons/close.png'} alt="photo" width={16} height={16} />
                  </button>
                </>
              ) : (
                <>
                  <Image src={'/icons/add.png'} alt="photo" width={40} height={40} />
                  <div className="board_form_photo_text r_16_24">클릭해서 사진 업로드</div>
                </>
              )}
            </div>

            {/* 세 번째 사진 업로드 */}
            <input
              type="file"
              ref={fileInputRef3}
              className="board_form_file_input"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={(e) => handleFileUpload(e, setImage3)}
            />
            <div className="board_form_photo_wrapper" onClick={() => triggerFileInput(fileInputRef3)}>
              {image3 ? (
                <>
                  <Image
                    src={URL.createObjectURL(image3)}
                    alt="업로드된 이미지 3"
                    width={160}
                    height={160}
                    className="board_form_photo_preview"
                  />
                  <button
                    type="button"
                    className="board_form_photo_remove"
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      removeImage(setImage3);
                    }}
                  >
                    <Image src={'/icons/close.png'} alt="photo" width={16} height={16} />
                  </button>
                </>
              ) : (
                <>
                  <Image src={'/icons/add.png'} alt="photo" width={40} height={40} />
                  <div className="board_form_photo_text r_16_24">클릭해서 사진 업로드</div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="board_form_button_wrapper">
          <div className="board_form_button cancel sb_18_24" onClick={() => router.back()}>
            취소
          </div>
          <button type="submit" className="board_form_button sb_18_24" disabled={!isFormValid}>
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
