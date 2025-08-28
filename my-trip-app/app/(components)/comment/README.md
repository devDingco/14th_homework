# 댓글 컴포넌트

이 폴더에는 두 가지 유형의 댓글 컴포넌트가 포함되어 있습니다.

## 1. 기존 댓글 컴포넌트 (별점 포함)

### CommentSection
별점이 있는 댓글 목록을 관리하는 메인 컴포넌트입니다.

```tsx
import { CommentSection } from '@/app/(components)/comment';

export default function MyPage() {
  return (
    <CommentSection 
      initialComments={[
        {
          id: "1",
          avatar: "/images/mobile/profile/img-1.png",
          author: "홍길동",
          date: "2024.11.11",
          rating: 5,
          content: "정말 좋은 상품이에요!"
        }
      ]} 
    />
  );
}
```

### CommentComposer
별점과 댓글을 입력하는 컴포넌트입니다.

```tsx
import { CommentComposer } from '@/app/(components)/comment';

export default function MyPage() {
  const handleSubmit = ({ rating, content }) => {
    console.log('댓글 등록:', { rating, content });
  };

  return <CommentComposer onSubmit={handleSubmit} />;
}
```

### CommentItem
개별 댓글을 표시하는 컴포넌트입니다.

```tsx
import { CommentItem } from '@/app/(components)/comment';

export default function MyPage() {
  return (
    <CommentItem
      avatar="/images/mobile/profile/img-1.png"
      author="홍길동"
      date="2024.11.11"
      rating={5}
      content="정말 좋은 상품이에요!"
      onEdit={() => console.log('수정')}
      onDelete={() => console.log('삭제')}
    />
  );
}
```

## 2. 문의하기 댓글 컴포넌트 (대댓글 기능 포함)

### InquirySection
문의하기 댓글과 대댓글을 관리하는 메인 컴포넌트입니다.

```tsx
import { InquirySection } from '@/app/(components)/comment';

export default function MyPage() {
  return (
    <InquirySection 
      initialComments={[
        {
          id: "1",
          avatar: "/images/mobile/profile/img-1.png",
          author: "홍길동",
          date: "2024.11.11",
          content: "궁금한 사항이 있습니다.",
          replies: [
            {
              id: "reply1",
              avatar: "/images/mobile/profile/img-2.png",
              author: "연재자",
              date: "2024.11.12",
              content: "답변드리겠습니다."
            }
          ]
        }
      ]} 
    />
  );
}
```

### InquiryComposer
문의하기 댓글을 입력하는 컴포넌트입니다.

```tsx
import { InquiryComposer } from '@/app/(components)/comment';

export default function MyPage() {
  const handleSubmit = ({ content }) => {
    console.log('문의하기 등록:', { content });
  };

  return <InquiryComposer onSubmit={handleSubmit} />;
}
```

### InquiryItem
개별 문의하기 댓글과 대댓글을 표시하는 컴포넌트입니다.

```tsx
import { InquiryItem } from '@/app/(components)/comment';

export default function MyPage() {
  const comment = {
    id: "1",
    avatar: "/images/mobile/profile/img-1.png",
    author: "홍길동",
    date: "2024.11.11",
    content: "궁금한 사항이 있습니다.",
    replies: []
  };

  return (
    <InquiryItem
      comment={comment}
      onEdit={(commentId) => console.log('댓글 수정:', commentId)}
      onDelete={(commentId) => console.log('댓글 삭제:', commentId)}
      onReply={(commentId, reply) => console.log('대댓글 등록:', { commentId, reply })}
      onEditReply={(commentId, replyId) => console.log('대댓글 수정:', { commentId, replyId })}
      onDeleteReply={(commentId, replyId) => console.log('대댓글 삭제:', { commentId, replyId })}
    />
  );
}
```

## 타입 정의

### 기존 댓글 타입
```tsx
interface AppComment {
  id: string;
  avatar: string;
  author: string;
  date: string;
  rating: number;
  content: string;
}

interface NewComment {
  rating: number;
  content: string;
}
```

### 문의하기 댓글 타입
```tsx
interface InquiryComment {
  id: string;
  avatar: string;
  author: string;
  date: string;
  content: string;
  replies?: InquiryReply[];
}

interface InquiryReply {
  id: string;
  avatar: string;
  author: string;
  date: string;
  content: string;
}

interface NewInquiryComment {
  content: string;
}

interface NewInquiryReply {
  content: string;
}
```

## 사용 시 주의사항

1. **아바타 이미지**: 프로필 이미지 경로를 올바르게 설정해야 합니다.
2. **날짜 형식**: YYYY.MM.DD 형식으로 표시됩니다.
3. **별점**: 1-5점 사이의 값만 유효합니다.
4. **대댓글**: 문의하기 댓글에만 대댓글 기능이 있습니다.
5. **CSS 변수**: `--gray-*`, `--black`, `--white` 등의 CSS 변수가 정의되어 있어야 합니다.
