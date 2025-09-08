import { FethchBoardQuery } from '@commons/graphql/graphql';

export interface IBoardsWriteProps {
  data?: FethchBoardQuery;
  isEdit: boolean;
}

export interface IMyvariables {