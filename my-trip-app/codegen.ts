import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://main-practice.codebootcamp.co.kr/graphql',
  documents: ['app/**/*.{ts,tsx,graphql,gql}'],
  generates: {
    './app/commons/graphql/__generated__/': {
      preset: 'client',
    },
  },
};

export default config;