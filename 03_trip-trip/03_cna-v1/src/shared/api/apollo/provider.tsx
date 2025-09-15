'use client'
import { ApolloProvider } from '@apollo/client'
import { client } from './client'

interface ApolloSettingProps {
  children: React.ReactNode
}

export default function ApolloSetting(props: ApolloSettingProps) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
