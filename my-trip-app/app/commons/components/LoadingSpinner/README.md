# LoadingSpinner Component

재사용 가능한 로딩 스피너 컴포넌트입니다.

## 사용법

### 기본 사용법
```tsx
import LoadingSpinner from '@/commons/components/LoadingSpinner';

<LoadingSpinner />
```

### 크기 조정
```tsx
<LoadingSpinner size="small" />
<LoadingSpinner size="medium" />
<LoadingSpinner size="large" />
```

### 텍스트 커스터마이징
```tsx
<LoadingSpinner text="데이터를 불러오는 중..." />
<LoadingSpinner showText={false} /> // 텍스트 숨기기
```

### 테마 변경
```tsx
<LoadingSpinner theme="primary" />   // 기본 메인 컬러
<LoadingSpinner theme="secondary" /> // 회색 테마
<LoadingSpinner theme="white" />     // 흰색 테마 (어두운 배경용)
```

### 무한스크롤에서 사용
```tsx
<LoadingSpinner 
  size="medium" 
  text="더 많은 상품을 불러오는 중..." 
  theme="primary"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 스피너 크기 |
| `text` | `string` | `'로딩 중...'` | 로딩 텍스트 |
| `showText` | `boolean` | `true` | 텍스트 표시 여부 |
| `className` | `string` | `''` | 추가 CSS 클래스 |
| `theme` | `'primary' \| 'secondary' \| 'white'` | `'primary'` | 색상 테마 |

## 접근성

- `prefers-reduced-motion` 미디어 쿼리를 지원하여 애니메이션 감소 설정을 존중합니다.
- 고대비 모드를 지원합니다.
- 다크 모드를 자동으로 감지하여 적절한 색상을 적용합니다.

## 스타일링

컴포넌트는 CSS 변수를 사용하여 테마에 맞게 색상이 자동 조정됩니다:

- `--main-color`: 메인 컬러
- `--gray-60`, `--gray-70`: 회색 계열
- `--main-color-light`: 다크 모드용 밝은 메인 컬러
