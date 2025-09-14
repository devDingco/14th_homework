"use client"

import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";


interface IApolloSetting{
  children: React.ReactNode
}

export default function ApolloUploadSetting({children}: IApolloSetting){
  const uploadLink = createUploadLink({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache()
  })

  return(
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}