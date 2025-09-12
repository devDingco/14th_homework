// Product Detail 관련 타입들
export interface ProductDetailProps {
  id: string;
}

export interface ProductData {
  title: string;
  subtitle: string;
  price: string;
  bookmarkCount: number;
  description: string;
  additionalInfo: string;
  features: string[];
  mapUrl: string;
  seller: {
    name: string;
    avatar: string;
  };
}

// Product Post 관련 타입들
export interface ProductPostProps {}

export interface ProductFormData {
  productName: string;
  sellingPrice: string;
  productDescription: string;
  sellingPeriod: string;
  tags: string;
  zipCode: string;
  address: string;
  detailedAddress: string;
  referenceItem: string;
  latitude: string;
  longitude: string;
  photos: File[];
}

export interface ProductFormErrors {
  productName?: string;
  sellingPrice?: string;
  productDescription?: string;
  sellingPeriod?: string;
  address?: string;
}

// Gallery 관련 타입들
export interface GalleryImage {
  src: string;
  alt: string;
}

// Seller 정보 타입
export interface SellerInfo {
  id: string;
  name: string;
  avatar: string;
  rating?: number;
  reviewCount?: number;
}

// Product 목록 관련 타입들
export interface ProductListItem {
  id: string;
  title: string;
  price: string;
  location: string;
  images: string[];
  rating?: number;
  reviewCount?: number;
  bookmarkCount?: number;
  seller: SellerInfo;
  createdAt: string;
  updatedAt: string;
}

// Product 생성/수정 관련 타입들
export interface CreateProductInput {
  productName: string;
  sellingPrice: number;
  productDescription: string;
  sellingPeriod: string;
  tags: string[];
  address: {
    zipCode: string;
    address: string;
    detailedAddress: string;
    latitude: number;
    longitude: number;
  };
  photos: string[];
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}

// API Response 타입들
export interface ProductApiResponse {
  success: boolean;
  data?: ProductListItem;
  message?: string;
}

export interface ProductListApiResponse {
  success: boolean;
  data?: ProductListItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

