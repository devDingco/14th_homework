'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { accommodations } from '../../data/accommodations';
import { Button } from '../../components/accommodation_ui/button';
import { Badge } from '../../components/accommodation_ui/badge';
import { Card } from '../../components/accommodation_ui/card';
import { Separator } from '../../components/accommodation_ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/accommodation_ui/avatar';
import { Calendar } from '../../components/accommodation_ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/accommodation_ui/popover';
import {
  ArrowLeft,
  MapPin,
  Star,
  Users,
  Bed,
  Bath,
  Calendar as CalendarIcon,
  Check,
  Share2,
  Heart,
  BadgeCheck,
} from 'lucide-react';
import { ImageWithFallback } from '../../components/accommdation_figma/ImageWithFallback';
import InquirySection from '../../components/InquirySection';

interface AccommodationDetailProps {
  id: string;
}

// 간단한 날짜 포맷팅 함수
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];
  return `${year}년 ${month}월 ${day}일 (${weekday})`;
};

export default function AccommodationDetail({ id }: AccommodationDetailProps) {
  const router = useRouter();
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [isFavorite, setIsFavorite] = useState(false);

  const accommodation = accommodations.find((item) => item.id === id);

  if (!accommodation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2>숙소를 찾을 수 없습니다</h2>
          <Button onClick={() => router.push('/accommodation')} className="mt-4">
                목록으로 돌아가기
              </Button>
        </div>
      </div>
    );
  }

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diff = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const nights = calculateNights();
  const totalPrice = nights * accommodation.price;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/accommodation')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1>숙소 상세</h1>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
              <ImageWithFallback
                src={accommodation.imageUrl}
                alt={accommodation.name}
                className="w-full h-full object-cover"
              />
              {accommodation.discount && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-lg px-3 py-1">
                    {accommodation.discount}% 할인
                  </Badge>
                </div>
              )}
            </div>

            {/* Title & Location */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{accommodation.category}</Badge>
                    {accommodation.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h1>{accommodation.name}</h1>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5" />
                  <span>{accommodation.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{accommodation.rating}</span>
                  <span className="text-gray-400">({accommodation.reviewCount}개 후기)</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Seller Info */}
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={accommodation.seller.avatar} />
                  <AvatarFallback>{accommodation.seller.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span>{accommodation.seller.name}</span>
                    {accommodation.seller.verified && (
                      <BadgeCheck className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">인증된 호스트</div>
                </div>
              </div>
            </Card>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="mb-3">숙소 소개</h2>
              <p className="text-gray-700 leading-relaxed">{accommodation.description}</p>
            </div>

            <Separator />

            {/* Room Info */}
            <div>
              <h2 className="mb-4">숙소 정보</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Users className="w-6 h-6 text-gray-600" />
                  <div>
                    <div className="text-sm text-gray-600">최대 인원</div>
                    <div>{accommodation.maxGuests}명</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Bed className="w-6 h-6 text-gray-600" />
                  <div>
                    <div className="text-sm text-gray-600">침실</div>
                    <div>{accommodation.bedrooms}개</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Bath className="w-6 h-6 text-gray-600" />
                  <div>
                    <div className="text-sm text-gray-600">욕실</div>
                    <div>{accommodation.bathrooms}개</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <CalendarIcon className="w-6 h-6 text-gray-600" />
                  <div>
                    <div className="text-sm text-gray-600">체크인/아웃</div>
                    <div className="text-sm">{accommodation.checkIn}/{accommodation.checkOut}</div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h2 className="mb-4">편의시설</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {accommodation.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Inquiry Section */}
            <InquirySection hostName={accommodation.seller.name} />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 space-y-4">
              <div>
                <div className="flex items-baseline gap-2">
                  {accommodation.originalPrice && (
                    <span className="text-gray-400 line-through">
                      {accommodation.originalPrice.toLocaleString()}원
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-blue-600">{accommodation.price.toLocaleString()}원</span>
                  <span className="text-gray-600">/ 박</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">체크인</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 w-4 h-4" />
                        {checkInDate ? formatDate(checkInDate) : '날짜 선택'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkInDate}
                        onSelect={setCheckInDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-2 block">체크아웃</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 w-4 h-4" />
                        {checkOutDate ? formatDate(checkOutDate) : '날짜 선택'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkOutDate}
                        onSelect={setCheckOutDate}
                        disabled={(date: Date) => checkInDate ? date <= checkInDate : false}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-2 block">인원</label>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>게스트</span>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                      >
                        -
                      </Button>
                      <span>{guests}명</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGuests(Math.min(accommodation.maxGuests, guests + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {nights > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{accommodation.price.toLocaleString()}원 × {nights}박</span>
                      <span>{totalPrice.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>서비스 수수료</span>
                      <span>{Math.floor(totalPrice * 0.05).toLocaleString()}원</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>총 금액</span>
                      <span className="text-blue-600">
                        {(totalPrice + Math.floor(totalPrice * 0.05)).toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </>
              )}

              <Button className="w-full" size="lg" disabled={!checkInDate || !checkOutDate}>
                예약하기
              </Button>

              <p className="text-xs text-gray-500 text-center">
                예약 확정 전에는 요금이 청구되지 않습니다
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
