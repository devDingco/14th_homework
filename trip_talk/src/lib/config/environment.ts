// 환경변수 설정
export const config = {
  // GraphQL API
  graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://main-practice.codebootcamp.co.kr/graphql',

  // Google Maps API
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  googleMapsApiKeyServer: process.env.GOOGLE_MAP_API_KEY_SERVER || '',

  // 환경 설정
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // 파일 업로드 설정
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],

  // API 타임아웃
  apiTimeout: 30000, // 30초

  // 재시도 설정
  retryAttempts: 3,
  retryDelay: 1000, // 1초
};

// 환경변수 검증
export const validateEnvironment = () => {
  const requiredVars = ['NEXT_PUBLIC_GRAPHQL_ENDPOINT', 'GOOGLE_MAP_API_KEY_SERVER'];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.warn('Missing environment variables:', missingVars);
  }

  return missingVars.length === 0;
};
