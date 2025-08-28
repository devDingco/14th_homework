"use client";

// 이 파일의 목적
// - public/icons/filled, public/icons/outline의 모든 SVG를 자동으로 React 컴포넌트로 로드
// - 중앙 Icon 컴포넌트에서 type/name, 축약 토글(outline, write 등), color 토큰을 사용해 렌더링
// - 자주 쓰는 아이콘은 이름 있는 컴포넌트(변수)로도 export 하여 직접 import 가능하게 제공

// public 디렉토리의 SVG는 번들 대상이 아니므로 모듈 임포트를 사용하지 않습니다.
// 대신 URL 마스크 방식으로 렌더링합니다.
export const iconRegistry = {
  outline: {},
  filled: {},
};

// 5) 색상 토큰: style.color에 currentColor로 반영됨(next.config의 svgProps 설정 활용)
export const colorTokens = {
  white: "#fff",
  black: "#000",
  default: "var(--gray-50)",
  red: "var(--red)",
  primary: "var(--main-color)",
};

// 파일명 alias: export명 ↔ 실제 파일명(공백/하이픈 등)
const iconFileAlias = {
  house_on_the_sea: "house on the sea",
  room_service: "room service",
  radio_enabled: "radio-enabled",
  radio_selected: "radio-selected",
  single_person_accommodation: "Single person accommodation",
};

// 6) 중앙 Icon 컴포넌트: 축약 토글/명시형 props를 모두 지원
import type { IconProps } from "@/types/icon";

export default function Icon(props: IconProps) {
  const {
    // 명시형 props
    type,
    name,
    color,
    outline,
    filled,
    write,
    search,
    calendar,
    white,
    black,
    red,
    primary,
    style,
    width,
    height,
    ...rest
  } = props || {};

  const resolvedType = type || (outline ? "outline" : filled ? "filled" : "outline");
  const resolvedName = name || (write ? "write" : search ? "search" : calendar ? "calendar" : undefined);
  if (!resolvedName) return null;

  const resolvedColor =
    color ||
    (white
      ? colorTokens.white
      : black
      ? colorTokens.black
      : primary
      ? colorTokens.primary
      : red
      ? colorTokens.red
      : undefined);
  const fileName = iconFileAlias[resolvedName as keyof typeof iconFileAlias] || resolvedName;
  const src = `/icons/${resolvedType}/${fileName}.svg`;
  const encodedSrc = encodeURI(src);
  const baseSize = 20;
  const mergedStyle: React.CSSProperties = {
    display: "inline-block",
    width: width ?? (style && style.width) ?? baseSize,
    height: height ?? (style && style.height) ?? baseSize,
    backgroundColor: resolvedColor || "currentColor",
    WebkitMaskImage: `url("${encodedSrc}")`,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    WebkitMaskSize: "contain",
    maskImage: `url("${encodedSrc}")`,
    maskRepeat: "no-repeat",
    maskPosition: "center",
    maskSize: "contain",
    ...(style || {}),
  };
  return <span {...rest} style={mergedStyle} aria-hidden="true" />;
}

// 7) 요청하신 아이콘들을 각각 변수(컴포넌트)로 제공 (public URL 기반)
// - Filled 계열
export const BookmarkFilled = (p: IconProps) => <Icon filled name="bookmark" {...p} />;
export const ChargeFilled = (p: IconProps) => <Icon filled name="charge" {...p} />;
export const CheckFilled = (p: IconProps) => <Icon filled name="check" {...p} />;
export const DownArrowFilled = (p: IconProps) => <Icon filled name="down_arrow" {...p} />;
export const MyPageFilled = (p: IconProps) => <Icon filled name="mypage" {...p} />;
export const StarFilled = (p: IconProps) => <Icon filled name="star" {...p} />;
export const StoreFilled = (p: IconProps) => <Icon filled name="store" {...p} />;
export const TriptalkFilled = (p: IconProps) => <Icon filled name="triptalk" {...p} />;
export const UpArrowFilled = (p: IconProps) => <Icon filled name="up_arrow" {...p} />;
export const VisibilityFilled = (p: IconProps) => <Icon filled name="visibility" {...p} />;

// - Outline 계열
export const SpaOutline = (p: IconProps) => <Icon outline name="_spa" {...p} />;
export const AddOutline = (p: IconProps) => <Icon outline name="add" {...p} />;
export const ApartmentOutline = (p: IconProps) => <Icon outline name="apartment" {...p} />;
export const BadOutline = (p: IconProps) => <Icon outline name="bad" {...p} />;
export const BookmarkOutline = (p: IconProps) => <Icon outline name="bookmark" {...p} />;
export const CalendarOutline = (p: IconProps) => <Icon outline name="calendar" {...p} />;
export const CampOutline = (p: IconProps) => <Icon outline name="camp" {...p} />;
export const ChatOutline = (p: IconProps) => <Icon outline name="chat" {...p} />;
export const CloseOutline = (p: IconProps) => <Icon outline name="close" {...p} />;
export const EditOutline = (p: IconProps) => <Icon outline name="edit" {...p} />;
export const FireOutline = (p: IconProps) => <Icon outline name="fire" {...p} />;
export const GoodOutline = (p: IconProps) => <Icon outline name="good" {...p} />;
export const HotelOutline = (p: IconProps) => <Icon outline name="hotel" {...p} />;
export const HouseOnTheSeaOutline = (p: IconProps) => <Icon outline name="house_on_the_sea" {...p} />;
export const LeftArrowOutline = (p: IconProps) => <Icon outline name="left_arrow" {...p} />;
export const LinkOutline = (p: IconProps) => <Icon outline name="link" {...p} />;
export const LocationOutline = (p: IconProps) => <Icon outline name="location" {...p} />;
export const LoginOutline = (p: IconProps) => <Icon outline name="login" {...p} />;
export const LogoutOutline = (p: IconProps) => <Icon outline name="logout" {...p} />;
export const MenuOutline = (p: IconProps) => <Icon outline name="menu" {...p} />;
export const RightArrowOutline = (p: IconProps) => <Icon outline name="right_arrow" {...p} />;
export const RoomServiceOutline = (p: IconProps) => <Icon outline name="room_service" {...p} />;
export const SearchOutline = (p: IconProps) => <Icon outline name="search" {...p} />;
export const WriteOutline = (p: IconProps) => <Icon outline name="write" {...p} />;

// - 추가된 Outline 컴포넌트들
export const PersonOutline = (p: any) => <Icon outline name="person" {...p} />;
export const PlanteriorOutline = (p: any) => <Icon outline name="planterior" {...p} />;
export const PointOutline = (p: any) => <Icon outline name="point" {...p} />;
export const RadioEnabledOutline = (p: any) => <Icon outline name="radio_enabled" {...p} />;
export const RadioSelectedOutline = (p: any) => <Icon outline name="radio_selected" {...p} />;
export const ReplyOutline = (p: any) => <Icon outline name="reply" {...p} />;
export const ReturnOutline = (p: any) => <Icon outline name="return" {...p} />;
export const SinglePersonAccommodationOutline = (p: any) => (
  <Icon outline name="single_person_accommodation" {...p} />
);

// 8) 사용 예시
// - 중앙 Icon 컴포넌트
//   <Icon outline name="search" white width={20} height={20} />
//   <Icon filled name="bookmark" color="#10b981" />
// - 직접 가져와서 사용
//   import { BookmarkFilled, SearchOutline } from "@utils/iconColor";
//   <BookmarkFilled style={{ color: "#ff0" }} />
//   <SearchOutline className="search_icon" />
