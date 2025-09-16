import { CSSProperties } from 'react';

export const paginationContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '40px 0',
  gap: '4px',
};

export const paginationButton: CSSProperties = {
  minWidth: '40px',
  height: '40px',
  border: 'none',
  backgroundColor: 'transparent',
  color: '#666',
  cursor: 'pointer',
  borderRadius: '4px',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
};

export const activeButton: CSSProperties = {
  ...paginationButton,
  backgroundColor: '#007bff',
  color: '#fff',
  fontWeight: '500',
};

export const disabledButton: CSSProperties = {
  ...paginationButton,
  color: '#ccc',
  cursor: 'not-allowed',
};

export const arrowButton: CSSProperties = {
  ...paginationButton,
  fontSize: '16px',
  color: '#007bff',
  fontWeight: 'bold',
};
