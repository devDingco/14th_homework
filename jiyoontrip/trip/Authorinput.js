const AuthorInput = ({
  label,
  placeholder = "",
  type = "text",
  value,
  oncChange,
}) => {
  return (
    <div className="input-area">
      <div className="input-area__label__group">
        <label for="author-input" className="input-area__label">
          {label}
        </label>
        {label !== "유튜브 링크" ? <span>*</span> : ""}
      </div>
      {type === "textarea" ? (
        <textarea className="input-area__textarea" placeholder={placeholder} />
      ) : (
        <input
          id="author-input"
          className="input-area__input"
          type={type}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
