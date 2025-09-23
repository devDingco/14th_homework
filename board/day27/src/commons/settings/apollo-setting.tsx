"use client"

import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

// const client = new ApolloClient({
//     uri: "http://main-practice.codebootcamp.co.kr/graphql",
//     cache: new InMemoryCache()
// })

const uploadLink = createUploadLink({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
});

const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
});

export default function ApolloSetting({children}) {

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>

    )

}