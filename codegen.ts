import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:8080/graphql',
  documents: ['graphql/**/*.ts'],
  generates: {
    './graphql/generated/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false, // HERE
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
