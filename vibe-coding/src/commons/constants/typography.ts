// Typography Token System
// 프로젝트 전체에서 사용될 typography 토큰 정의
// 영문/한글 분기, 모바일/데스크톱 반응형 지원

// Font Family 토큰
export const fontFamily = {
  // 한글 폰트 (기본)
  korean: {
    primary: ['Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'sans-serif'],
    secondary: ['Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', 'sans-serif'],
    mono: ['D2Coding', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
  },
  // 영문 폰트
  english: {
    primary: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
    secondary: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    mono: ['Fira Code', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
  },
} as const;

// Font Weight 토큰
export const fontWeight = {
  thin: 100,
  extraLight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
} as const;

// Font Size 토큰 (모바일 우선, 데스크톱 반응형)
export const fontSize = {
  // Display 레벨 (대형 제목)
  display: {
    large: {
      mobile: '2.5rem',    // 40px
      desktop: '3.5rem',   // 56px
    },
    medium: {
      mobile: '2.25rem',   // 36px
      desktop: '3rem',     // 48px
    },
    small: {
      mobile: '2rem',      // 32px
      desktop: '2.5rem',   // 40px
    },
  },
  
  // Headline 레벨 (섹션 제목)
  headline: {
    large: {
      mobile: '1.75rem',   // 28px
      desktop: '2.25rem',  // 36px
    },
    medium: {
      mobile: '1.5rem',    // 24px
      desktop: '2rem',     // 32px
    },
    small: {
      mobile: '1.25rem',   // 20px
      desktop: '1.75rem',  // 28px
    },
  },
  
  // Title 레벨 (카드/컴포넌트 제목)
  title: {
    large: {
      mobile: '1.125rem',  // 18px
      desktop: '1.5rem',   // 24px
    },
    medium: {
      mobile: '1rem',      // 16px
      desktop: '1.25rem',  // 20px
    },
    small: {
      mobile: '0.875rem',  // 14px
      desktop: '1.125rem', // 18px
    },
  },
  
  // Body 레벨 (본문)
  body: {
    large: {
      mobile: '1rem',      // 16px
      desktop: '1.125rem', // 18px
    },
    medium: {
      mobile: '0.875rem',  // 14px
      desktop: '1rem',     // 16px
    },
    small: {
      mobile: '0.75rem',   // 12px
      desktop: '0.875rem', // 14px
    },
  },
  
  // Label 레벨 (라벨, 캡션)
  label: {
    large: {
      mobile: '0.875rem',  // 14px
      desktop: '1rem',     // 16px
    },
    medium: {
      mobile: '0.75rem',   // 12px
      desktop: '0.875rem', // 14px
    },
    small: {
      mobile: '0.625rem',  // 10px
      desktop: '0.75rem',  // 12px
    },
  },
} as const;

// Line Height 토큰
export const lineHeight = {
  tight: 1.2,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

// Letter Spacing 토큰
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// Typography 스타일 프리셋 (한글)
export const typographyKorean = {
  // Display 스타일
  displayLarge: {
    fontFamily: fontFamily.korean.primary,
    fontSize: fontSize.display.large,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  displayMedium: {
    fontFamily: fontFamily.korean.primary,
    fontSize: fontSize.display.medium,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  displaySmall: {
    fontFamily: fontFamily.korean.primary,
    fontSize: fontSize.display.small,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  
  // Headline 스타일
  headlineLarge: {
    fontFamily: fontFamily.korean.primary,
    fontSize: fontSize.headline.large,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  headlineMedium: {
    fontFamily: fontFamily.korean.primary,
    fontSize: fontSize.headline.medium,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  headlineSmall: {
    fontFamily: fontFamily.korean.primary,
    fontSize: fontSize.headline.small,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  
  // Title 스타일
  titleLarge: {
    fontFamily: fontFamily.korean.primary,
    fontSize: fontSize.title.large,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  titleMedium: {
    fontFamily: fontFamily.korean.primary,
    fontSize: fontSize.title.medium,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  titleSmall: {
    fontFamily: fontFamily.korean.primary,
    fontSize: fontSize.title.small,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  
  // Body 스타일
  bodyLarge: {
    fontFamily: fontFamily.korean.primary,
    fontSize: fontSize.body.large,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  bodyMedium: {
    fontFamily: fontFamily.korean.primary,
    fontSize: fontSize.body.medium,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontFamily: fontFamily.korean.primary,
    fontSize: fontSize.body.small,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  
  // Label 스타일
  labelLarge: {
    fontFamily: fontFamily.korean.primary,
    fontSize: fontSize.label.large,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  labelMedium: {
    fontFamily: fontFamily.korean.primary,
    fontSize: fontSize.label.medium,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  labelSmall: {
    fontFamily: fontFamily.korean.primary,
    fontSize: fontSize.label.small,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
} as const;

// Typography 스타일 프리셋 (영문)
export const typographyEnglish = {
  // Display 스타일
  displayLarge: {
    fontFamily: fontFamily.english.primary,
    fontSize: fontSize.display.large,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  displayMedium: {
    fontFamily: fontFamily.english.primary,
    fontSize: fontSize.display.medium,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  displaySmall: {
    fontFamily: fontFamily.english.primary,
    fontSize: fontSize.display.small,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  
  // Headline 스타일
  headlineLarge: {
    fontFamily: fontFamily.english.primary,
    fontSize: fontSize.headline.large,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  headlineMedium: {
    fontFamily: fontFamily.english.primary,
    fontSize: fontSize.headline.medium,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  headlineSmall: {
    fontFamily: fontFamily.english.primary,
    fontSize: fontSize.headline.small,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  
  // Title 스타일
  titleLarge: {
    fontFamily: fontFamily.english.primary,
    fontSize: fontSize.title.large,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  titleMedium: {
    fontFamily: fontFamily.english.primary,
    fontSize: fontSize.title.medium,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  titleSmall: {
    fontFamily: fontFamily.english.primary,
    fontSize: fontSize.title.small,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  
  // Body 스타일
  bodyLarge: {
    fontFamily: fontFamily.english.primary,
    fontSize: fontSize.body.large,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  bodyMedium: {
    fontFamily: fontFamily.english.primary,
    fontSize: fontSize.body.medium,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontFamily: fontFamily.english.primary,
    fontSize: fontSize.body.small,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  
  // Label 스타일
  labelLarge: {
    fontFamily: fontFamily.english.primary,
    fontSize: fontSize.label.large,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  labelMedium: {
    fontFamily: fontFamily.english.primary,
    fontSize: fontSize.label.medium,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  labelSmall: {
    fontFamily: fontFamily.english.primary,
    fontSize: fontSize.label.small,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
} as const;

// 기본 typography (한글 우선)
export const typography = typographyKorean;

// Typography 유틸리티 함수
export const getResponsiveFontSize = (sizeToken: { mobile: string; desktop: string }) => ({
  fontSize: sizeToken.mobile,
  '@media (min-width: 768px)': {
    fontSize: sizeToken.desktop,
  },
});

// CSS-in-JS 스타일 생성 헬퍼
export const createTypographyStyle = (style: typeof typography.bodyMedium) => ({
  fontFamily: style.fontFamily.join(', '),
  fontSize: style.fontSize.mobile,
  fontWeight: style.fontWeight,
  lineHeight: style.lineHeight,
  letterSpacing: style.letterSpacing,
  '@media (min-width: 768px)': {
    fontSize: style.fontSize.desktop,
  },
});

// 타입 정의
export type FontFamilyToken = keyof typeof fontFamily.korean;
export type FontWeightToken = keyof typeof fontWeight;
export type FontSizeToken = keyof typeof fontSize;
export type LineHeightToken = keyof typeof lineHeight;
export type LetterSpacingToken = keyof typeof letterSpacing;
export type TypographyToken = keyof typeof typography;

