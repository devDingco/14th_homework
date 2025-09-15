export const navigationStyles = {
  container: {
    width: '100%',
    background: '#ffffff',
    borderBottom: '1px solid #f0f0f0',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1000,
  },

  navContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 320px',
    height: '80px',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    padding: '20px 0',
  },

  logoArea: {
    flexShrink: 0,
    width: '56px',
    height: '32px',
  },

  logoLink: {
    display: 'block',
    width: '100%',
    height: '100%',
  },

  logoImage: {
    width: 'auto',
    height: '100%',
    objectFit: 'contain' as const,
  },

  tabArea: {
    display: 'flex',
    gap: '16px',
    borderRadius: '8px',
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: '24px',
  },

  tabItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    height: '40px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontFamily: "'Pretendard Variable', sans-serif",
    fontSize: '16px',
    fontWeight: 500,
    color: '#333333',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap' as const,
  },

  tabItemHover: {
    backgroundColor: '#f5f5f5',
  },

  tabActive: {
    fontWeight: 700,
    color: '#000000',
    border: '1px solid #000000',
    backgroundColor: 'transparent',
  },

  profileArea: {
    flexShrink: 0,
  },

  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '0 4px',
    height: '40px',
    cursor: 'pointer',
    borderRadius: '100px',
    transition: 'background-color 0.3s ease',
  },

  profileContainerHover: {
    backgroundColor: '#f5f5f5',
  },

  profileImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#e4e4e4',
    objectFit: 'cover' as const,
  },

  profileName: {
    fontFamily: "'Pretendard Variable', sans-serif",
    fontSize: '16px',
    fontWeight: 500,
    color: '#333333',
    marginLeft: '4px',
  },

  dropdownArrow: {
    width: '24px',
    height: '24px',
    opacity: 0.7,
    transition: 'opacity 0.3s ease',
  },

  dropdownArrowHover: {
    opacity: 1,
  },
};

// 반응형 스타일
export const responsiveNavigationStyles = {
  large: {
    navContainer: {
      padding: '0 160px',
    },
  },

  medium: {
    navContainer: {
      padding: '0 80px',
    },
  },

  mobile: {
    navContainer: {
      padding: '0 20px',
      height: '60px',
    },

    header: {
      padding: '10px 0',
    },

    tabArea: {
      gap: '8px',
      marginLeft: '16px',
    },

    tabItem: {
      padding: '6px 12px',
      fontSize: '14px',
      height: '32px',
    },

    profileName: {
      fontSize: '14px',
    },

    dropdownArrow: {
      width: '20px',
      height: '20px',
    },
  },
};
