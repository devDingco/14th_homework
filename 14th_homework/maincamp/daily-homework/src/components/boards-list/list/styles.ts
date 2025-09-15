export const boardsListStyles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap' as const,
    gap: '16px',
  },

  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--Gray-90, #1C1C1C)',
  },

  actions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },

  searchContainer: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },

  searchInput: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid var(--Gray-30, #BDBDBD)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    minWidth: '200px',
  },

  searchInputFocus: {
    borderColor: 'var(--Blue-60, #1890FF)',
  },

  searchButton: {
    padding: '8px 16px',
    borderRadius: '6px',
    backgroundColor: 'var(--Blue-60, #1890FF)',
    color: '#FFFFFF',
    border: 'none',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },

  searchButtonHover: {
    backgroundColor: 'var(--Blue-70, #0F7FFF)',
  },

  createButton: {
    padding: '10px 20px',
    borderRadius: '6px',
    backgroundColor: 'var(--Yellow-60, #FADB14)',
    color: 'var(--Gray-90, #1C1C1C)',
    border: 'none',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease',
  },

  createButtonHover: {
    backgroundColor: 'var(--Yellow-70, #E6C200)',
  },

  tableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },

  tableHeader: {
    backgroundColor: 'var(--Gray-05, #FCFCFC)',
    borderBottom: '1px solid var(--Gray-20, #F0F0F0)',
  },

  tableHeaderCell: {
    padding: '16px',
    textAlign: 'left' as const,
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--Gray-80, #424242)',
    borderRight: '1px solid var(--Gray-20, #F0F0F0)',
  },

  tableRow: {
    borderBottom: '1px solid var(--Gray-10, #FAFAFA)',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
  },

  tableRowHover: {
    backgroundColor: 'var(--Gray-05, #FCFCFC)',
  },

  tableCell: {
    padding: '16px',
    fontSize: '14px',
    color: 'var(--Gray-80, #424242)',
    borderRight: '1px solid var(--Gray-10, #FAFAFA)',
    verticalAlign: 'middle',
  },

  numberCell: {
    width: '80px',
    textAlign: 'center' as const,
    color: 'var(--Gray-60, #999999)',
    fontWeight: 500,
  },

  titleCell: {
    fontWeight: 500,
    color: 'var(--Gray-90, #1C1C1C)',
    maxWidth: '400px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  titleCellHover: {
    color: 'var(--Blue-60, #1890FF)',
  },

  writerCell: {
    width: '120px',
    textAlign: 'center' as const,
  },

  dateCell: {
    width: '120px',
    textAlign: 'center' as const,
    color: 'var(--Gray-60, #999999)',
  },

  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    marginTop: '32px',
  },

  paginationButton: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid var(--Gray-30, #BDBDBD)',
    backgroundColor: '#FFFFFF',
    color: 'var(--Gray-80, #424242)',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  paginationButtonHover: {
    borderColor: 'var(--Blue-60, #1890FF)',
    color: 'var(--Blue-60, #1890FF)',
  },

  paginationButtonActive: {
    backgroundColor: 'var(--Blue-60, #1890FF)',
    borderColor: 'var(--Blue-60, #1890FF)',
    color: '#FFFFFF',
  },

  paginationButtonDisabled: {
    backgroundColor: 'var(--Gray-10, #FAFAFA)',
    color: 'var(--Gray-40, #CCCCCC)',
    cursor: 'not-allowed',
  },

  emptyState: {
    textAlign: 'center' as const,
    padding: '60px 20px',
    color: 'var(--Gray-60, #999999)',
  },

  emptyStateIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: 0.5,
  },

  emptyStateText: {
    fontSize: '16px',
    marginBottom: '8px',
  },

  emptyStateSubtext: {
    fontSize: '14px',
    color: 'var(--Gray-50, #CCCCCC)',
  },

  loadingState: {
    textAlign: 'center' as const,
    padding: '60px 20px',
    color: 'var(--Gray-60, #999999)',
  },

  errorState: {
    textAlign: 'center' as const,
    padding: '60px 20px',
    color: 'var(--Red-60, #FF4D4F)',
  },
};

// 반응형 스타일
export const responsiveStyles = {
  mobile: {
    tableContainer: {
      overflowX: 'auto' as const,
    },

    table: {
      minWidth: '600px',
    },

    header: {
      flexDirection: 'column' as const,
      alignItems: 'stretch',
    },

    searchContainer: {
      flexDirection: 'column' as const,
      gap: '12px',
    },

    searchInput: {
      minWidth: 'auto',
    },
  },
};
