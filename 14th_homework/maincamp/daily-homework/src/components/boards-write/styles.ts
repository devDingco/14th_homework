export const boardWriteStyles = {
  layout: {
    display: 'flex',
    width: '1200px',
    minHeight: '1847px',
    padding: '60px 102px 100px 102px',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '80px',
    flexShrink: 0,
  },

  enrollSubject: {
    display: 'flex',
    width: '996px',
    height: '52px',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
  },

  enrollSubjectText: {
    color: 'var(--Gray-90, #1C1C1C)',
    fontFamily: '"Pretendard Variable"',
    fontSize: '36px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '52px',
  },

  enrollRowContainer: {
    display: 'flex',
    width: '996px',
    minHeight: '1615px',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '40px',
    flexShrink: 0,
  },

  enrollInput: {
    padding: '14px 16px',
    borderRadius: '6px',
    border: '1px solid var(--Gray-30, #BDBDBD)',
    fontSize: '16px',
    fontFamily: '"Pretendard Variable"',
    fontWeight: 400,
    lineHeight: '24px',
    background: '#FFF',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },

  enrollInputFocus: {
    borderColor: 'var(--Blue-60, #1890FF)',
  },

  enrollInputError: {
    borderColor: 'var(--Red-60, #FF4D4F)',
  },

  enrollSubmitButton: {
    display: 'flex',
    width: '179px',
    height: '52px',
    padding: '14px 16px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
    borderRadius: '10px',
    background: 'var(--Yellow-60, #FADB14)',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },

  enrollSubmitButtonDisabled: {
    background: 'var(--Gray-30, #BDBDBD)',
    cursor: 'not-allowed',
  },
};

export const formFieldStyles = {
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column' as const,
    gap: '8px',
  },

  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '16px',
    fontWeight: 500,
    color: 'var(--Gray-90, #1C1C1C)',
  },

  required: {
    color: 'var(--Red-60, #FF4D4F)',
  },

  error: {
    fontSize: '14px',
    color: 'var(--Red-60, #FF4D4F)',
    marginTop: '4px',
  },
};
