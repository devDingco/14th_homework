"use client"

import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ReactNode } from 'react';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

interface IApolloSetting {
    children: ReactNode;
  }


export default function ApiUploadProvider(props: IApolloSetting){

  const uploadLink = createUploadLink({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
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