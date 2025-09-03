"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://main-practice.codebootcamp.co.kr/graphql",
  cache: new InMemoryCache(),
});

type ApolloSettingProps = {
    모든페이지: React.ReactNode; // React에서 렌더링 가능한 모든 요소 타입
  };

export default function ApolloSetting(props: ApolloSettingProps) {
  return <ApolloProvider client={client}>{props.모든페이지}</ApolloProvider>;
}