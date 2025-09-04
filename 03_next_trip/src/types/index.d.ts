export interface IProps {
  children: React.ReactNode;
}

export type TBoard = {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  updatedAt?: Date;
};
