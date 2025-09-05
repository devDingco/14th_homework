'use client';

import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo/client';

interface IApolloSetting {
  children: React.ReactNode;
}

export default function ApolloSetting({ children }: IApolloSetting) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
