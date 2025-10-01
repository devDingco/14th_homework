import InputImage from "@/components/ui/input/InputImage";
import styles from "./styles.module.css";
import classNames from "classnames";

interface IUploadImages {
  images: (string | null | undefined)[];
  onClickDelete: (index: number) => void;
  onChangeFile: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => Promise<void>;
}

export default function UploadImages({
  images,
  onClickDelete,
  onChangeFile,
}: IUploadImages) {
  const fixedImages = [...images, "", "", ""].slice(0, 3);
  return (
    <div className={styles.image__upload__group}>
      {fixedImages?.map((image, index) => (
        <div key={`${index}-${image}`}>
          <input
            id={`${index}-${image}`}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => onChangeFile(e, index)}
          />
          {image ? (
            // 이미지 있을 때 이미지 미리보기
            <label
              htmlFor={`${index}-${image}`}
              className={styles.image__label}
            >
              <img
                src={`https://storage.googleapis.com/${image}`}
                className={styles.upload__image}
              />
              <button
                className={styles.imageDeleteBtn}
                onClick={() => onClickDelete(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8.00001 8.70153L4.61801 12.0837C4.52567 12.1759 4.40962 12.2231 4.26984 12.2254C4.13017 12.2275 4.01201 12.1803 3.91534 12.0837C3.81879 11.987 3.77051 11.8699 3.77051 11.7324C3.77051 11.5948 3.81879 11.4777 3.91534 11.381L7.29751 7.99903L3.91534 4.61703C3.82312 4.5247 3.7759 4.40864 3.77367 4.26886C3.77156 4.1292 3.81879 4.01103 3.91534 3.91436C4.01201 3.81781 4.12912 3.76953 4.26667 3.76953C4.40423 3.76953 4.52134 3.81781 4.61801 3.91436L8.00001 7.29653L11.382 3.91436C11.4743 3.82214 11.5904 3.77492 11.7302 3.7727C11.8698 3.77059 11.988 3.81781 12.0847 3.91436C12.1812 4.01103 12.2295 4.12814 12.2295 4.2657C12.2295 4.40325 12.1812 4.52037 12.0847 4.61703L8.70251 7.99903L12.0847 11.381C12.1769 11.4734 12.2241 11.5894 12.2263 11.7292C12.2285 11.8689 12.1812 11.987 12.0847 12.0837C11.988 12.1803 11.8709 12.2285 11.7333 12.2285C11.5958 12.2285 11.4787 12.1803 11.382 12.0837L8.00001 8.70153Z"
                    fill="white"
                  />
                </svg>
              </button>
            </label>
          ) : (
            // 이미지 없을 때 미리보기
            <div
              className={classNames(styles.upload__image, styles.add__image)}
            >
              <label htmlFor={`${index}-${image}`}>
                <img src={"/icons/add.svg"} />
                <span className={styles.textDesktop}>클릭해서 사진 업로드</span>
                <span className={styles.textMobile}>사진 업로드</span>
              </label>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
