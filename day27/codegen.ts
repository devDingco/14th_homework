// 사용자가 제공한 codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // 1. 덮어쓰기 설정
  overwrite: true, 
  schema: "https://main-practice.codebootcamp.co.kr/graphql",

  // 2. 요청서 스캔 경로
  documents: ["./src/components/**/*.{ts,tsx}"],

  generates: {
    // 3. 생성될 파일 경로 및 방식
    "src/commons/graphql/": {
      preset: "client",
    }
  }
};

export default config;