// codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://main-practice.codebootcamp.co.kr/graphql", // <-- 이 주소 확인!
  documents: "src/**/*.ts?(x)", // .ts, .tsx 파일 모두 탐색
  generates: {
    "src/gql/": { // 생성된 파일은 src/gql 폴더에!
      preset: "client",
      plugins: [],
    },
  },
};

export default config;