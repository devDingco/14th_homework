
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://main-practice.codebootcamp.co.kr/graphql",
  documents: "src/**/*.{tsx,ts}",
  generates: {
    "src/commons/graphql/": {
      preset: "client",
    },
  }
};

export default config;
