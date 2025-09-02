"use client"

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ReactNode } from 'react';

interface IApolloSetting {
    children: ReactNode;
  }

const clinet = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
})

export default function ApolloSetting({children}:IApolloSetting){

    return (
        <ApolloProvider client={clinet}>
            {children}
        </ApolloProvider>
    )
}