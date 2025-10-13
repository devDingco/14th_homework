export interface IUseOpenapisList {
  images: string[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  fetchMoreImages: () => Promise<void>;
  handleImageError: (url: string) => void;
}
