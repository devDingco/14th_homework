"use client"

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";

interface IApolloSetting {
    children: React.ReactNode
}

export default function ApolloSetting(props: IApolloSetting) {
    const httpLink = createHttpLink({
        // ❗️ 바로 이 주소가 올바른 서버 주소입니다.
        uri: "http://main-practice.codebootcamp.co.kr/graphql",
    });

    const client = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}