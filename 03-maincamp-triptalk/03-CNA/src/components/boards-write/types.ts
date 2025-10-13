export interface BoardsWriteProps {
  isEdit: boolean;
  boardId?: string;
  data?: {
    fetchBoard?: {
      title?: string;
      contents?: string;
    };
  };
}