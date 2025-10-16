import { CSSProperties } from 'react';

export const paginationContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '32px 0',
  gap: '16px',
};

export const paginationButton: CSSProperties = {
  width: '32px',
  height: '32px',
  border: 'none',
  backgroundColor: 'transparent',
  color: '#777777',
  cursor: 'pointer',
  borderRadius: '8px',
  fontSize: '16px',
  fontFamily: 'Pretendard Variable, sans-serif',
  fontWeight: '400',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  lineHeight: '24px',
};

export const activeButton: CSSProperties = {
  ...paginationButton,
  backgroundColor: '#f2f2f2',
  color: '#000000',
  fontWeight: '500',
};

export const disabledButton: CSSProperties = {
  ...paginationButton,
  color: '#ccc',
  cursor: 'not-allowed',
};

export const arrowButton: CSSProperties = {
  width: '24px',
  height: '24px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0',
};
