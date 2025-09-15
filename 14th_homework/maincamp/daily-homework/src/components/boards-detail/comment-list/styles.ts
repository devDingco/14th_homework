export const commentListStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    padding: '20px 0',
  },

  commentItem: {
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid var(--Gray-20, #F0F0F0)',
    backgroundColor: '#FFFFFF',
    transition: 'box-shadow 0.3s ease',
  },

  commentItemHover: {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },

  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },

  commentAuthor: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--Gray-90, #1C1C1C)',
  },

  commentDate: {
    fontSize: '14px',
    color: 'var(--Gray-60, #999999)',
  },

  commentContent: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'var(--Gray-80, #424242)',
    whiteSpace: 'pre-wrap',
  },

  commentActions: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid var(--Gray-10, #FAFAFA)',
  },

  actionButton: {
    padding: '4px 8px',
    fontSize: '12px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },

  editButton: {
    backgroundColor: 'var(--Blue-10, #E6F7FF)',
    color: 'var(--Blue-60, #1890FF)',
  },

  deleteButton: {
    backgroundColor: 'var(--Red-10, #FFF1F0)',
    color: 'var(--Red-60, #FF4D4F)',
  },

  emptyState: {
    textAlign: 'center' as const,
    padding: '40px',
    color: 'var(--Gray-60, #999999)',
    fontSize: '14px',
  },

  loadingState: {
    textAlign: 'center' as const,
    padding: '20px',
    color: 'var(--Gray-60, #999999)',
  },
};

export const commentRatingStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },

  star: {
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },

  starFilled: {
    color: '#FFD700',
  },

  starEmpty: {
    color: 'var(--Gray-30, #BDBDBD)',
  },

  ratingText: {
    fontSize: '14px',
    color: 'var(--Gray-70, #666666)',
    marginLeft: '4px',
  },
};
