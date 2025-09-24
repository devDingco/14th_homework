export type TAddress = {
  zipcode: string;
  address: string;
  addressDetail?: string;
};

export type TData = {
  fetchBoard: {
    writer: string;
    password: string;
    title: string;
    contents: string;
    images: [string, string, string];
    youtubeUrl: string;
    boardAddress: TAddress;
  };
};
