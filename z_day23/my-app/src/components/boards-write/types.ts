import { ChangeEvent } from "react";

// Board data type definition
export interface IBoard {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  __typename?: string; // __typename is a field automatically added by Apollo Client
}

// Input type for createBoard mutation
export interface ICreateBoardInput {
  writer: string;
  password?: string;
  title: string;
  contents: string;
}

// Input type for updateBoard mutation
export interface IUpdateBoardInput {
  title?: string;
  contents?: string;
}

// Props type for the main BoardsNew component (from your example)
export interface IBoardsNewProps {
  isEdit: boolean;
  data?: {
    fetchBoard?: IBoard;
  };
}

// Return type for the custom hook (aligned with your example)
export interface IUseBoardsFormReturn {
  writerInput: string;
  passwordInput: string;
  titleInput: string;
  contentInput: string;
  writerError: string;
  passwordError: string;
  titleError: string;
  contentError: string;
  isFormValid: boolean;
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSubmit: () => Promise<void>;
  onClickUpdate: () => Promise<void>;
}
