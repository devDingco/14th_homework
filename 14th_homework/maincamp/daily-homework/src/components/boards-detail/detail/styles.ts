export const boardDetailStyles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },

  header: {
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid var(--Gray-20, #F0F0F0)',
  },

  title: {
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--Gray-90, #1C1C1C)',
    marginBottom: '16px',
    lineHeight: '1.4',
  },

  metaInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap' as const,
  },

  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--Gray-60, #999999)',
  },

  metaLabel: {
    fontWeight: 500,
    color: 'var(--Gray-70, #666666)',
  },

  content: {
    marginBottom: '40px',
  },

  contentText: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: 'var(--Gray-80, #424242)',
    whiteSpace: 'pre-wrap',
    marginBottom: '24px',
  },

  attachments: {
    marginBottom: '24px',
  },

  attachmentTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--Gray-90, #1C1C1C)',
    marginBottom: '12px',
  },

  attachmentList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },

  attachmentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid var(--Gray-20, #F0F0F0)',
    backgroundColor: 'var(--Gray-05, #FCFCFC)',
    transition: 'background-color 0.3s ease',
  },

  attachmentItemHover: {
    backgroundColor: 'var(--Gray-10, #FAFAFA)',
  },

  attachmentIcon: {
    fontSize: '16px',
    color: 'var(--Gray-60, #999999)',
  },

  attachmentName: {
    fontSize: '14px',
    color: 'var(--Gray-80, #424242)',
    flex: 1,
  },

  attachmentSize: {
    fontSize: '12px',
    color: 'var(--Gray-60, #999999)',
  },

  videoContainer: {
    marginBottom: '24px',
  },

  videoTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--Gray-90, #1C1C1C)',
    marginBottom: '12px',
  },

  videoWrapper: {
    position: 'relative' as const,
    width: '100%',
    height: '400px',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'var(--Gray-90, #1C1C1C)',
  },

  addressContainer: {
    marginBottom: '24px',
  },

  addressTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--Gray-90, #1C1C1C)',
    marginBottom: '12px',
  },

  addressInfo: {
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid var(--Gray-20, #F0F0F0)',
    backgroundColor: 'var(--Gray-05, #FCFCFC)',
  },

  addressRow: {
    display: 'flex',
    marginBottom: '8px',
  },

  addressLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--Gray-70, #666666)',
    width: '80px',
    flexShrink: 0,
  },

  addressValue: {
    fontSize: '14px',
    color: 'var(--Gray-80, #424242)',
  },

  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    paddingTop: '24px',
    borderTop: '1px solid var(--Gray-20, #F0F0F0)',
  },

  actionGroup: {
    display: 'flex',
    gap: '12px',
  },

  actionButton: {
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s ease',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  editButton: {
    backgroundColor: 'var(--Blue-60, #1890FF)',
    color: '#FFFFFF',
  },

  editButtonHover: {
    backgroundColor: 'var(--Blue-70, #0F7FFF)',
  },

  deleteButton: {
    backgroundColor: 'var(--Red-60, #FF4D4F)',
    color: '#FFFFFF',
  },

  deleteButtonHover: {
    backgroundColor: 'var(--Red-70, #FF2829)',
  },

  backButton: {
    backgroundColor: 'var(--Gray-10, #FAFAFA)',
    color: 'var(--Gray-80, #424242)',
    border: '1px solid var(--Gray-30, #BDBDBD)',
  },

  backButtonHover: {
    backgroundColor: 'var(--Gray-20, #F0F0F0)',
  },

  likeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid var(--Gray-30, #BDBDBD)',
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  likeButtonActive: {
    borderColor: 'var(--Red-60, #FF4D4F)',
    backgroundColor: 'var(--Red-10, #FFF1F0)',
    color: 'var(--Red-60, #FF4D4F)',
  },

  likeIcon: {
    fontSize: '16px',
  },

  likeCount: {
    fontSize: '14px',
    fontWeight: 500,
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
