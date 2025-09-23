import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://main-practice.codebootcamp.co.kr/graphql",
  documents: [
    "src/**/*queries.{ts,tsx}", // 쿼리 파일만 지정
    "!src/commons/gql/**", // 생성물 폴더는 제외
  ],
  generates: {
    "src/commons/gql/": {
      preset: "client",
    },
  },
};

export default config;
