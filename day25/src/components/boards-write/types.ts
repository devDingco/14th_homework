export interface IBoardWriteInput {
    writer: string;
    password: string;
    title: string;
    contents: string;
    youtubeUrl?: string;
    boardAddress?: {
      zipcode: string;
      address: string;
      addressDetail: string;
    };
    images?: string[];
  }
  
  export interface IBoardWriteProps {
    isEdit: boolean;
  }
  