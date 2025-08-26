import Image from 'next/image';
import './modal.css';
import { useRouter } from 'next/navigation';

// type success, purchase, fail, passwordChange
export default function Modal({ isOpen, onClose, type, handleOpenFailModal }) {
  const router = useRouter();
  if (!isOpen) return null;

  const handleClose = () => {
    router.push('/signin');
    onClose();
  };

  const handlePasswordChange = () => {
    onClose();
  };

  const handlePointCharge = () => {
    onClose();
  };

  return (
    <div className="modal_overlay">
      <div className="modal_wrapper">
        <div className="modal_content">
          {type === 'success' ? (
            <div className="modal_header sb_18_24">회원가입을 축하 드려요.</div>
          ) : type === 'purchase' ? (
            <div className="modal_header sb_18_24">해당 숙박권을 구매 하시겠어요?</div>
          ) : type === 'fail' ? (
            <div className="modal_header sb_18_24">포인트 부족</div>
          ) : type === 'passwordChange' ? (
            <div className="modal_header sb_18_24">비밀번호 변경을 축하 드려요.</div>
          ) : null}
        </div>
        <div className="modal_body">
          {type === 'success' ? (
            <Image src={'/images/logo.png'} alt="success" width={77.28} height={48} />
          ) : type === 'purchase' ? (
            <div className="modal_body_text me_14_20">해당 숙박권은 포인트로만 구매 가능합니다.</div>
          ) : type === 'fail' ? (
            <div className="modal_body_text me_14_20">
              포인트가 부족합니다. <br />
              포인트를 충전하고 구매해주세요.
            </div>
          ) : type === 'passwordChange' ? (
            <div className="modal_body_text me_14_20">비밀번호 변경을 축하 드려요.</div>
          ) : null}
        </div>
        {type === 'success' ? (
          <div className="modal_primary_button sb_14_20" onClick={handleClose}>
            로그인하기
          </div>
        ) : type === 'purchase' ? (
          <div className="modal_button_wrapper">
            <div className="modal_secondary_button sb_14_20" onClick={onClose}>
              취소
            </div>
            <div className="modal_primary_button sb_14_20" onClick={handleOpenFailModal}>
              구매
            </div>
          </div>
        ) : type === 'fail' ? (
          <div className="modal_button_wrapper">
            <div className="modal_secondary_button sb_14_20" onClick={onClose}>
              취소
            </div>
            <div className="modal_primary_button sb_14_20" onClick={handlePointCharge}>
              충전
            </div>
          </div>
        ) : type === 'passwordChange' ? (
          <div className="modal_primary_button sb_14_20">확인</div>
        ) : null}
      </div>
    </div>
  );
}
