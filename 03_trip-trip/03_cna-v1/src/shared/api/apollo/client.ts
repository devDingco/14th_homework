'use client'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'http://main-practice.codebootcamp.co.kr/graphql',
  cache: new InMemoryCache(),
})
