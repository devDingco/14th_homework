// types.ts
export interface CatImage {
  id: string;
  url: string;
  width?: number;
  height?: number;
}

export interface UseCatApiResult {
  cats: CatImage[];
  loading: boolean;
  hasMore: boolean;
  loadMore: (page?: number, done?: () => void) => void;
  refresh: () => void;
}
