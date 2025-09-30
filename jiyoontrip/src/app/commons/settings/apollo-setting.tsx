"use client";

import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useAccessTokenStore } from "../stores/store";
import { useEffect } from "react";
interface IApolloSetting {
  children: React.ReactNode;
}
export default function ApolloSetting(props: IApolloSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore();
  useEffect(() => {
    const result = localStorage.getItem("accessToken");
    setAccessToken(result ?? "");
  }, []);

  const uploadLink = createUploadLink({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
