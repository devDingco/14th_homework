import { IProps } from '@/types';
import ApolloProviderWrapper from './ApolloProviderWrapper';

export default function Providers({ children }: IProps) {
  return (
    <>
      <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
    </>
  );
}
