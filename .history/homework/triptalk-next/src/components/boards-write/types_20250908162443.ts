import { FethchBoardQuery } from '@commons/graphql/graphql';

export interface IBoardsWriteProps {
  data?: FethchBoardQuery;
  isEdit: boolean;
}

export interface IBoardsWriteProps {
  number: number;
  updateBoardInput: {
    title?: string;
    contents?: string;
    writer?: string;
    password?: string;
  };
}
