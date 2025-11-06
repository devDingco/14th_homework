'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { accommodations } from '../../data/accommodations';
import { Button } from '../../components/accommodation_ui/button';
import { Input } from '../../components/accommodation_ui/input';
import { Badge } from '../../components/accommodation_ui/badge';
import { Card } from '../../components/accommodation_ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/accommodation_ui/select';
import { Search, MapPin, Star, Plus } from 'lucide-react';
import { ImageWithFallback } from '../../components/accommdation_figma/ImageWithFallback';

export default function AccommodationList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredAccommodations = accommodations.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedAccommodations = [...filteredAccommodations].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewCount - a.reviewCount; // popular
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-blue-600">숙박예약</h1>
            <Button onClick={() => router.push('/accommodation/register')} className="gap-2">
              <Plus className="w-4 h-4" />
              판매 등록
            </Button>
          </div>
        </div>
      </header>

      {/* Search & Filter Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="숙소명 또는 지역으로 검색하세요"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex gap-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  전체
                </Button>
                <Button
                  variant={selectedCategory === '호텔' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('호텔')}
                >
                  호텔
                </Button>
                <Button
                  variant={selectedCategory === '펜션' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('펜션')}
                >
                  펜션
                </Button>
                <Button
                  variant={selectedCategory === '리조트' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('리조트')}
                >
                  리조트
                </Button>
                <Button
                  variant={selectedCategory === '아파트' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('아파트')}
                >
                  아파트
                </Button>
              </div>

              <div className="ml-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">인기순</SelectItem>
                    <SelectItem value="price-low">낮은 가격순</SelectItem>
                    <SelectItem value="price-high">높은 가격순</SelectItem>
                    <SelectItem value="rating">평점순</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 text-gray-600">
          총 <span className="text-gray-900">{sortedAccommodations.length}개</span>의 숙소
        </div>

        {/* Accommodation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAccommodations.map((accommodation) => (
            <Card
              key={accommodation.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push(`/accommodation/${accommodation.id}`)}
            >
              <div className="relative aspect-[4/3]">
                <ImageWithFallback
                  src={accommodation.imageUrl}
                  alt={accommodation.name}
                  className="w-full h-full object-cover"
                />
                {accommodation.discount && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-500">{accommodation.discount}% 할인</Badge>
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  {accommodation.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-white/90">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline">{accommodation.category}</Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{accommodation.rating}</span>
                      <span className="text-gray-400">({accommodation.reviewCount})</span>
                    </div>
                  </div>
                  <h3 className="mt-2">{accommodation.name}</h3>
                </div>

                <div className="flex items-center gap-1 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{accommodation.location}</span>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex items-end justify-between">
                    <div>
                      {accommodation.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">
                          {accommodation.originalPrice.toLocaleString()}원
                        </div>
                      )}
                      <div className="text-blue-600">
                        {accommodation.price.toLocaleString()}원
                        <span className="text-sm text-gray-600"> / 박</span>
                      </div>
                    </div>
                    <Button size="sm">예약하기</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
