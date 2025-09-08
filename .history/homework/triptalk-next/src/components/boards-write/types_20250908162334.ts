import { FethchBoardQuery } from '@commons/graphql/graphql';

export interface IBoardsWriteProps {
  data?: FethchBoardQuery;
  isEdit: boolean;
}

export interface IMyvariables {
  number: number;
  updateBoardInput: {
    title?: string;
    contents?: string;
    writer?: string; // 작성자명
    password?: string; // 비밀번호
  };
}
