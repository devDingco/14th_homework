"use client";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useEffect } from "react";
import { useAccessTokenStore } from "../stores/count-store";
interface Iprops {
  children: React.ReactNode;
}

export default function ApolloSetting({ children }: Iprops) {
  const { accessToken, setAccessToken } = useAccessTokenStore();
  useEffect(() => {
    const result = localStorage.getItem("accessToken");
    setAccessToken(result ?? "");
  }, []);

  const uploadLink = createUploadLink({
    uri: "https://main-practice.codebootcamp.co.kr/graphql",
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}, // 토큰 없으면 빈 객체
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
