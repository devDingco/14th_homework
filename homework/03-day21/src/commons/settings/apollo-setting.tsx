"use client"

import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ReactNode } from 'react';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { useAccessTokenStore } from '../stores/token-store';

interface IApolloSetting {
    children: ReactNode;
  }


export default function ApiProvider(props: IApolloSetting){
  const { accessToken } = useAccessTokenStore()

  const uploadLink = createUploadLink({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  })
  
  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  })
    
    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}