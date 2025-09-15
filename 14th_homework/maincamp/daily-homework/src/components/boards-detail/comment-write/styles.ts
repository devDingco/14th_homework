export const commentWriteStyles = {
  container: {
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid var(--Gray-20, #F0F0F0)',
    backgroundColor: '#FFFFFF',
    marginBottom: '20px',
  },

  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--Gray-90, #1C1C1C)',
    marginBottom: '16px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },

  inputRow: {
    display: 'flex',
    gap: '12px',
  },

  inputGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },

  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--Gray-80, #424242)',
  },

  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid var(--Gray-30, #BDBDBD)',
    fontSize: '14px',
    fontFamily: '"Pretendard Variable"',
    fontWeight: 400,
    lineHeight: '20px',
    background: '#FFF',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },

  inputFocus: {
    borderColor: 'var(--Blue-60, #1890FF)',
  },

  inputError: {
    borderColor: 'var(--Red-60, #FF4D4F)',
  },

  textarea: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid var(--Gray-30, #BDBDBD)',
    fontSize: '14px',
    fontFamily: '"Pretendard Variable"',
    fontWeight: 400,
    lineHeight: '20px',
    background: '#FFF',
    outline: 'none',
    resize: 'vertical',
    minHeight: '100px',
    transition: 'border-color 0.3s ease',
  },

  textareaFocus: {
    borderColor: 'var(--Blue-60, #1890FF)',
  },

  textareaError: {
    borderColor: 'var(--Red-60, #FF4D4F)',
  },

  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  ratingLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--Gray-80, #424242)',
  },

  starContainer: {
    display: 'flex',
    gap: '4px',
  },

  star: {
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },

  starFilled: {
    color: '#FFD700',
  },

  starEmpty: {
    color: 'var(--Gray-30, #BDBDBD)',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    marginTop: '8px',
  },

  button: {
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s ease',
  },

  submitButton: {
    backgroundColor: 'var(--Blue-60, #1890FF)',
    color: '#FFFFFF',
  },

  submitButtonHover: {
    backgroundColor: 'var(--Blue-70, #0F7FFF)',
  },

  submitButtonDisabled: {
    backgroundColor: 'var(--Gray-30, #BDBDBD)',
    cursor: 'not-allowed',
  },

  cancelButton: {
    backgroundColor: 'var(--Gray-10, #FAFAFA)',
    color: 'var(--Gray-80, #424242)',
    border: '1px solid var(--Gray-30, #BDBDBD)',
  },

  cancelButtonHover: {
    backgroundColor: 'var(--Gray-20, #F0F0F0)',
  },

  errorMessage: {
    fontSize: '12px',
    color: 'var(--Red-60, #FF4D4F)',
    marginTop: '4px',
  },
};
