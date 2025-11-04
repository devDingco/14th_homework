export interface AccommodationCard {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  bookmarkCount: number;
  tags: string[];
  sellerName: string;
  sellerImage?: string;
}

export interface Props {
  accommodations?: AccommodationCard[];
}
