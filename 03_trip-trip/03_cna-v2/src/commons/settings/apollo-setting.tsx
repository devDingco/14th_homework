'use client'

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'

interface IApolloSetting {
  children: React.ReactNode
}

const httpLink = new HttpLink({
  uri: 'http://main-practice.codebootcamp.co.kr/graphql',
})

export default function ApiProvider({ children }: IApolloSetting) {
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
