"use client"

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ReactNode } from 'react';

interface IApolloSetting {
    children: ReactNode;
  }


export default function ApiProvider(props: IApolloSetting){

    const clinet = new ApolloClient({
      uri: "http://main-practice.codebootcamp.co.kr/graphql",
      cache: new InMemoryCache(),
    })
    
    return (
        <ApolloProvider client={clinet}>
            {props.children}
        </ApolloProvider>
    )
}