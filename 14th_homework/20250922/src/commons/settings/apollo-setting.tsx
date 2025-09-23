"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'; // createUploadLink 가져오기
import React from 'react';

// Apollo 링크 생성 (파일 업로드 기능 포함)
const uploadLink = createUploadLink({
  uri: "http://main-practice.codebootcamp.co.kr/graphql"
});

const client = new ApolloClient({
  link: uploadLink, // 링크 연결
  cache: new InMemoryCache()
});

export default function ApolloSetting(props) {
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}