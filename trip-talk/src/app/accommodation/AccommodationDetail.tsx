"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DatePicker, ConfigProvider } from "antd";
import locale from "antd/locale/ko_KR";
import { accommodations } from "../../data/accommodations";
import { Button } from "../../components/accommodation_ui/button";
import { Badge } from "../../components/accommodation_ui/badge";
import { Card } from "../../components/accommodation_ui/card";
import { Separator } from "../../components/accommodation_ui/separator";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/accommodation_ui/avatar";
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
} from "lucide-react";
import { ImageWithFallback } from "../../components/accommdation_figma/ImageWithFallback";
import InquirySection from "../../components/InquirySection";
import PurchaseModal from "../../components/point_payment/PurchaseModal";
import { useTransactionStore } from "../../commons/stores/transaction-store";

interface AccommodationDetailProps {
  id: string;
}

export default function AccommodationDetail({ id }: AccommodationDetailProps) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [checkInDate, setCheckInDate] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [checkOutDate, setCheckOutDate] = useState<any>(null);
  const [guests, setGuests] = useState(2);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"purchase" | "insufficient">(
    "purchase"
  );

  // Transaction 스토어에서 실제 포인트 가져오기
  const { currentBalance, usePoints } = useTransactionStore();

  const accommodation = accommodations.find((item) => item.id === id);

  if (!accommodation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2>숙소를 찾을 수 없습니다</h2>
          <Button
            onClick={() => router.push("/accommodation")}
            className="mt-4"
          >
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    return checkOutDate.diff(checkInDate, "day") as number;
  };

  const nights = calculateNights();
  const totalPrice = nights * accommodation.price;

  const handlePurchaseClick = () => {
    if (!checkInDate || !checkOutDate) return;

    // 먼저 구매 확인 모달을 표시
    setModalType("purchase");
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (modalType === "purchase") {
      // 구매 버튼을 눌렀을 때 포인트 체크
      const finalPrice = totalPrice + Math.floor(totalPrice * 0.05);

      if (currentBalance < finalPrice) {
        // 포인트 부족하면 첫 번째 모달 닫고 포인트 부족 모달 표시
        setIsModalOpen(false);
        setTimeout(() => {
          setModalType("insufficient");
          setIsModalOpen(true);
        }, 300); // 모달 전환 애니메이션을 위한 딜레이
      } else {
        // 포인트가 충분하면 구매 완료
        const description = `${accommodation.name} (${nights}박)`;
        usePoints(finalPrice, description);
        alert("구매가 완료되었습니다!");
        setIsModalOpen(false);
      }
    } else {
      // 포인트 부족 모달에서 충전 버튼 클릭 - 포인트 현황 페이지로 이동
      router.push("/mypage/point-status");
    }
  };

  return (
    <ConfigProvider locale={locale}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/accommodation")}
              >
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
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
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
                    <span className="text-gray-400">
                      ({accommodation.reviewCount}개 후기)
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Seller Info */}
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={accommodation.seller.avatar} />
                    <AvatarFallback>
                      {accommodation.seller.name[0]}
                    </AvatarFallback>
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
                <p className="text-gray-700 leading-relaxed">
                  {accommodation.description}
                </p>
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
                      <div className="text-sm">
                        {accommodation.checkIn}/{accommodation.checkOut}
                      </div>
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
              <Card className="p-6 sticky top-24 space-y-4 overflow-visible">
                <div>
                  <div className="flex items-baseline gap-2">
                    {accommodation.originalPrice && (
                      <span className="text-gray-400 line-through">
                        {accommodation.originalPrice.toLocaleString()}원
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-blue-600">
                      {accommodation.price.toLocaleString()}원
                    </span>
                    <span className="text-gray-600">/ 박</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600 mb-2 block">
                      체크인
                    </label>
                    <DatePicker
                      className="w-full h-10"
                      placeholder="날짜 선택"
                      format="YYYY년 MM월 DD일 (ddd)"
                      value={checkInDate}
                      onChange={(date) => {
                        setCheckInDate(date);
                        // 체크인 날짜가 체크아웃보다 늦으면 체크아웃 초기화
                        if (
                          date &&
                          checkOutDate &&
                          !date.isBefore(checkOutDate)
                        ) {
                          setCheckOutDate(null);
                        }
                      }}
                      disabledDate={(current) => {
                        // 오늘 이전 날짜 비활성화
                        return (
                          current && current.isBefore(current.startOf("day"))
                        );
                      }}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 mb-2 block">
                      체크아웃
                    </label>
                    <DatePicker
                      className="w-full h-10"
                      placeholder="날짜 선택"
                      format="YYYY년 MM월 DD일 (ddd)"
                      value={checkOutDate}
                      onChange={setCheckOutDate}
                      disabled={!checkInDate}
                      disabledDate={(current) => {
                        if (!checkInDate) return true;
                        // 체크인 날짜와 같거나 이전 날짜 비활성화
                        return (
                          current &&
                          (!current.isAfter(checkInDate) ||
                            current.isBefore(current.startOf("day")))
                        );
                      }}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 mb-2 block">
                      인원
                    </label>
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
                          onClick={() =>
                            setGuests(
                              Math.min(accommodation.maxGuests, guests + 1)
                            )
                          }
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
                        <span>
                          {accommodation.price.toLocaleString()}원 × {nights}박
                        </span>
                        <span>{totalPrice.toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>서비스 수수료</span>
                        <span>
                          {Math.floor(totalPrice * 0.05).toLocaleString()}원
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>총 금액</span>
                        <span className="text-blue-600">
                          {(
                            totalPrice + Math.floor(totalPrice * 0.05)
                          ).toLocaleString()}
                          원
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 pt-2">
                        <span>보유 포인트</span>
                        <span className="font-medium">
                          {currentBalance.toLocaleString()}P
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  disabled={!checkInDate || !checkOutDate}
                  onClick={handlePurchaseClick}
                >
                  구매하기
                </Button>
              </Card>
            </div>
          </div>
        </div>

        {/* Purchase Modal */}
        <PurchaseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          type={modalType}
        />
      </div>
    </ConfigProvider>
  );
}
