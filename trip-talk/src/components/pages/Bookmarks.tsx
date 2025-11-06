import { Card } from '../mypage_ui/card';
import { Heart, Bookmark } from 'lucide-react';

export function Bookmarks() {
  const bookmarks = [
    {
      id: 1,
      product: '애플 맥북 프로 M3',
      price: 2500000,
      image: 'laptop',
      seller: '테크상점',
      likes: 45,
    },
    {
      id: 2,
      product: '다이슨 청소기 V15',
      price: 890000,
      image: 'vacuum',
      seller: '홈가전마켓',
      likes: 32,
    },
    {
      id: 3,
      product: '소니 WH-1000XM5',
      price: 420000,
      image: 'headphones',
      seller: '오디오프라자',
      likes: 28,
    },
  ];

  return (
    <div>
      <h1 className="text-gray-900 mb-6">북마크</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
              <Bookmark className="w-12 h-12 text-gray-400" />
              <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-gray-900 mb-2">{item.product}</h3>
              <p className="text-gray-900 mb-3">{item.price.toLocaleString()}원</p>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">{item.seller}</p>
                <div className="flex items-center gap-1 text-gray-500">
                  <Heart className="w-4 h-4" />
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
