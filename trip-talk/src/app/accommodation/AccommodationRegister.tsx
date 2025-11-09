"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DaumPostcode from "react-daum-postcode";
import { Button } from "../../components/accommodation_ui/button";
import { Input } from "../../components/accommodation_ui/input";
import { Label } from "../../components/accommodation_ui/label";
import { Textarea } from "../../components/accommodation_ui/textarea";
import { Card } from "../../components/accommodation_ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/accommodation_ui/select";
import { Badge } from "../../components/accommodation_ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/accommodation_ui/dialog";
import { Checkbox } from "../../components/accommodation_ui/checkbox";
import { ArrowLeft, Upload, X, MapPin, ImagePlus } from "lucide-react";
import { toast } from "sonner";

export default function AccommodationRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    category: "",
    postcode: "",
    address: "",
    detailAddress: "",
    price: "",
    originalPrice: "",
    discountRate: "",
    description: "",
    maxGuests: "2",
    bedrooms: "1",
    bathrooms: "1",
    size: "",
    checkIn: "15:00",
    checkOut: "11:00",
  });

  const [amenities, setAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  // 편의시설 옵션
  const amenityOptions = [
    "무료 Wi-Fi",
    "주차 가능",
    "수영장",
    "피트니스",
    "조식 포함",
    "바비큐",
    "반려동물 동반",
    "금연",
    "에어컨",
    "난방",
    "주방",
    "세탁기",
    "욕조",
    "발코니",
    "오션뷰",
    "시티뷰",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // 할인율 자동 계산
    if (name === "price" || name === "originalPrice") {
      const price =
        name === "price" ? parseFloat(value) : parseFloat(formData.price);
      const originalPrice =
        name === "originalPrice"
          ? parseFloat(value)
          : parseFloat(formData.originalPrice);

      if (price && originalPrice && originalPrice > price) {
        const discount = Math.round(
          ((originalPrice - price) / originalPrice) * 100
        );
        setFormData((prev: typeof formData) => ({
          ...prev,
          discountRate: discount.toString(),
        }));
      } else {
        setFormData((prev: typeof formData) => ({ ...prev, discountRate: "" }));
      }
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a: string) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handlePostcodeComplete = (data: any) => {
    setFormData({
      ...formData,
      postcode: data.zonecode,
      address: data.address,
    });
    setIsPostcodeOpen(false);
  };

  const handleImageUpload = () => {
    // Mock image upload - in real app, this would handle file selection
    const mockImages = [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1594873604892-b599f847e859?w=800",
      "https://images.unsplash.com/photo-1660321398531-489358ea488f?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
    ];
    const randomImage =
      mockImages[Math.floor(Math.random() * mockImages.length)];
    setImages([...images, randomImage]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_: string, i: number) => i !== index));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setImages(newImages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.shortDescription ||
      !formData.address ||
      !formData.price
    ) {
      toast.error("필수 항목을 모두 입력해주세요");
      return;
    }

    if (images.length === 0) {
      toast.error("최소 1개의 이미지를 업로드해주세요");
      return;
    }

    // Mock submission
    toast.success("숙소가 성공적으로 등록되었습니다!");
    setTimeout(() => {
      router.push("/accommodation");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/accommodation")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl">숙박권 판매 등록</h1>
                <p className="text-sm text-gray-500">
                  숙소 정보를 입력해주세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 기본 정보 */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="mb-1">기본 정보</h2>
              <p className="text-sm text-gray-500">
                숙소의 기본 정보를 입력해주세요
              </p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">숙소명 *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="숙소 이름을 입력하세요"
                  className="border border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">숙소 한줄 설명 *</Label>
                <Input
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  placeholder="숙소의 특징을 한 줄로 간단히 표현해주세요"
                  className="border border-gray-300"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  최대 50자 이내로 작성해주세요
                </p>
              </div>

              <div className="space-y-2">
                <Label>주소 *</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={formData.postcode}
                      placeholder="우편번호"
                      readOnly
                      className="max-w-[150px] border border-gray-300"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsPostcodeOpen(true)}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      주소 검색
                    </Button>
                  </div>
                  <Input
                    value={formData.address}
                    placeholder="주소"
                    readOnly
                    className="border border-gray-300"
                  />
                  <Input
                    name="detailAddress"
                    value={formData.detailAddress}
                    onChange={handleInputChange}
                    placeholder="상세 주소를 입력하세요"
                    className="border border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">숙소 설명 *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="숙소에 대한 상세한 설명을 입력하세요"
                  rows={5}
                  className="border border-gray-300"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  최소 50자 이상 작성해주세요
                </p>
              </div>
            </div>
          </Card>

          {/* 가격 정보 */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="mb-1">가격 정보</h2>
              <p className="text-sm text-gray-500">
                1박 기준 가격을 입력해주세요
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">판매 가격 (원) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="180000"
                  className="border border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="originalPrice">정상 가격 (원)</Label>
                <Input
                  id="originalPrice"
                  name="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="250000"
                  className="border border-gray-300"
                />
                <p className="text-xs text-gray-500 mt-1">할인 표시시 입력</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountRate">할인율 (%)</Label>
                <Input
                  id="discountRate"
                  name="discountRate"
                  value={formData.discountRate}
                  readOnly
                  placeholder="자동 계산"
                  className="bg-gray-50 border border-gray-300"
                />
                <p className="text-xs text-gray-500 mt-1">
                  자동으로 계산됩니다
                </p>
              </div>
            </div>
          </Card>

          {/* 객실 정보 */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="mb-1">객실 정보</h2>
              <p className="text-sm text-gray-500">
                객실의 상세 정보를 입력해주세요
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="space-y-2">
                <Label htmlFor="maxGuests">최대 인원 *</Label>
                <Select
                  value={formData.maxGuests}
                  onValueChange={(value: string) =>
                    handleSelectChange("maxGuests", value)
                  }
                >
                  <SelectTrigger className="border border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}명
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedrooms">침실 수 *</Label>
                <Select
                  value={formData.bedrooms}
                  onValueChange={(value: string) =>
                    handleSelectChange("bedrooms", value)
                  }
                >
                  <SelectTrigger className="border border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}개
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">욕실 수 *</Label>
                <Select
                  value={formData.bathrooms}
                  onValueChange={(value: string) =>
                    handleSelectChange("bathrooms", value)
                  }
                >
                  <SelectTrigger className="border border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}개
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkIn">체크인</Label>
                <Input
                  id="checkIn"
                  name="checkIn"
                  type="time"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkOut">체크아웃</Label>
                <Input
                  id="checkOut"
                  name="checkOut"
                  type="time"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
            </div>
          </Card>

          {/* 편의시설 */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="mb-1">편의시설</h2>
              <p className="text-sm text-gray-500">
                제공되는 편의시설을 선택해주세요
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {amenityOptions.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={amenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <label
                    htmlFor={amenity}
                    className="text-sm cursor-pointer select-none"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
            {amenities.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">선택된 편의시설:</p>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity: string) => (
                    <Badge key={amenity} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* 이미지 등록 */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="mb-1">이미지 등록 *</h2>
              <p className="text-sm text-gray-500">
                최소 1장 이상의 이미지를 등록해주세요 (최대 10장)
              </p>
            </div>

            <div className="space-y-4">
              {/* 이미지 업로드 버튼 */}
              <Button
                type="button"
                variant="outline"
                onClick={handleImageUpload}
                disabled={images.length >= 10}
                className="w-full h-32 border-2 border-dashed"
              >
                <div className="text-center">
                  <ImagePlus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <div className="text-sm">이미지 업로드</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {images.length}/10
                  </div>
                </div>
              </Button>

              {/* 이미지 미리보기 */}
              {images.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    등록된 이미지 ({images.length}개)
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {images.map((image: string, index: number) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden group bg-gray-100"
                      >
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />

                        {/* 대표 이미지 배지 */}
                        {index === 0 && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-blue-600 text-white">
                              대표
                            </Badge>
                          </div>
                        )}

                        {/* 삭제 버튼 */}
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>

                        {/* 순서 표시 */}
                        <div className="absolute bottom-2 left-2">
                          <Badge variant="secondary" className="text-xs">
                            {index + 1}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    * 첫 번째 이미지가 대표 이미지로 표시됩니다
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* 주의사항 */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="text-sm mb-2">등록 전 확인사항</h3>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>모든 정보는 정확하게 입력해주세요</li>
              <li>허위 정보 기재 시 등록이 취소될 수 있습니다</li>
              <li>이미지는 실제 숙소 사진을 사용해주세요</li>
              <li>등록 후 관리자 승인까지 1-2일 소요될 수 있습니다</li>
            </ul>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-3 sticky bottom-0 bg-white p-4 border-t -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="max-w-5xl w-full mx-auto flex gap-3">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => router.push("/accommodation")}
              >
                취소
              </Button>
              <Button type="submit" size="lg" className="flex-1">
                등록하기
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* 주소 검색 다이얼로그 */}
      <Dialog open={isPostcodeOpen} onOpenChange={setIsPostcodeOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>주소 검색</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <DaumPostcode
              onComplete={handlePostcodeComplete}
              autoClose={false}
              style={{ height: "450px" }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
