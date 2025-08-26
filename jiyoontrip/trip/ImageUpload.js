const ImageUpload = ({ label, value, oncChange }) => {
  return (
    <div className="image-upload-area">
      <label className="input-area__label">{label}</label>
      <div className="image-upload-input">
        <label for="file-upload">
          <div className="image-upload-input__drop">
            <img src="./icon/outline/add.svg" />
            <p>클릭해서 사진 업로드</p>
            <input type="file" id="file-upload" />
          </div>
        </label>
        <label for="file-upload">
          <div className="image-upload-input__drop">
            <img src="./icon/outline/add.svg" />
            <p>클릭해서 사진 업로드</p>
            <input type="file" id="file-upload" />
          </div>
        </label>
        <label for="file-upload">
          <div className="image-upload-input__drop">
            <img src="./icon/outline/add.svg" />
            <p>클릭해서 사진 업로드</p>
            <input type="file" id="file-upload" />
          </div>
        </label>
      </div>
    </div>
  );
};
