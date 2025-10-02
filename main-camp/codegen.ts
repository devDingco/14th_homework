
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://main-practice.codebootcamp.co.kr/graphql",
  documents: "src/commons/settings/queries.ts",
  generates: {
    "src/commons/gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
