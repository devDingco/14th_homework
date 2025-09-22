export default function ApolloSetting(props: IApolloSetting) {
    const client = new ApolloClient({
        uri: "http://main-practice.codebootcamp.co.kr/graphql",
        cache: new InMemoryCache()
    })    

    return (
        <ApolloProvider client={client}>
            {props.children}  {/* 여기서 children을 렌더링 */}
        </ApolloProvider>
    )
}
