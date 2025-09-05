import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
  documents: ['app/**/*.{ts,tsx,graphql,gql}'],
  generates: {
    './app/commons/graphql/__generated__/': {
      preset: 'client',
    },
  },
};

export default config;