import type { CodegenConfig } from '@graphql-codegen/cli';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  `http://main-practice.codebootcamp.co.kr/graphql`;

const config: CodegenConfig = {
  overwrite: true,
  schema: BASE_URL,
  documents: ['src/apis/graphql/**/*.ts', 'src/apis/graphql/**/*.tsx'],
  generates: {
    'src/types/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
