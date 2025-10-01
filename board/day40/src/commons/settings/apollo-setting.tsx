"use client"

import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { useAccessTokenStore } from '../stores';
import { useEffect } from 'react';


// const client = new ApolloClient({
//     uri: "http://main-practice.codebootcamp.co.kr/graphql",
//     cache: new InMemoryCache()
// })

// const {accssToken} = useAccessTokenStore();

// const uploadLink = createUploadLink({
//     uri: "http://main-practice.codebootcamp.co.kr/graphql",
//     headers: {
//         Authorization: `Bearer ${accssToken}`
//     }
// });

// const client = new ApolloClient({
//     link: ApolloLink.from([uploadLink]),
//     cache: new InMemoryCache(),
// });

export default function ApolloSetting({children}) {
    const {accessToken, setAccessToken} = useAccessTokenStore();
    console.log ("아폴로세팅토큰값" + accessToken)


    useEffect(() => {
        const result = localStorage.getItem("accessToken")
        setAccessToken(result ?? "")
    }, [])



    const uploadLink = createUploadLink({
        uri: "http://main-practice.codebootcamp.co.kr/graphql",
        headers: {
            Authorization: `Bearer ${accessToken}`
            
        }
        
    });

    
    
    const client = new ApolloClient({
        link: ApolloLink.from([uploadLink]),
        cache: new InMemoryCache(),
    });


    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>

    )

}