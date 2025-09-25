'use client'

import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { useAccessTokenStore } from 'commons/stores/access-token-store'
import { useEffect } from 'react'
interface IApolloSetting {
  children: React.ReactNode
}

export default function ApiProvider({ children }: IApolloSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore()

  useEffect(() => {
    const result = localStorage.getItem('accessToken')
    setAccessToken(result ?? '')
  }, [])

  const uploadLink = createUploadLink({
    uri: 'http://main-practice.codebootcamp.co.kr/graphql',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
