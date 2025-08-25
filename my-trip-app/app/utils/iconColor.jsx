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

// 6) 중앙 Icon 컴포넌트: 축약 토글/명시형 props를 모두 지원
export default function Icon(props) {
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
  const src = `/icons/${resolvedType}/${resolvedName}.svg`;
  const baseSize = 20;
  const mergedStyle = {
    display: "inline-block",
    width: width ?? (style && style.width) ?? baseSize,
    height: height ?? (style && style.height) ?? baseSize,
    backgroundColor: resolvedColor || "currentColor",
    WebkitMaskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    WebkitMaskSize: "contain",
    maskImage: `url(${src})`,
    maskRepeat: "no-repeat",
    maskPosition: "center",
    maskSize: "contain",
    ...(style || {}),
  };
  return <span {...rest} style={mergedStyle} aria-hidden="true" />;
}

// 7) 요청하신 아이콘들을 각각 변수(컴포넌트)로 제공 (public URL 기반)
// - Filled 계열
export const BookmarkFilled = (p) => <Icon filled name="bookmark" {...p} />;
export const ChargeFilled = (p) => <Icon filled name="charge" {...p} />;
export const CheckFilled = (p) => <Icon filled name="check" {...p} />;
export const DownArrowFilled = (p) => <Icon filled name="down_arrow" {...p} />;
export const MyPageFilled = (p) => <Icon filled name="mypage" {...p} />;
export const StarFilled = (p) => <Icon filled name="star" {...p} />;
export const StoreFilled = (p) => <Icon filled name="store" {...p} />;
export const TriptalkFilled = (p) => <Icon filled name="triptalk" {...p} />;
export const UpArrowFilled = (p) => <Icon filled name="up_arrow" {...p} />;
export const VisibilityFilled = (p) => <Icon filled name="visibility" {...p} />;

// - Outline 계열
export const SpaOutline = (p) => <Icon outline name="_spa" {...p} />;
export const AddOutline = (p) => <Icon outline name="add" {...p} />;
export const ApartmentOutline = (p) => <Icon outline name="apartment" {...p} />;
export const BadOutline = (p) => <Icon outline name="bad" {...p} />;
export const BookmarkOutline = (p) => <Icon outline name="bookmark" {...p} />;
export const CalendarOutline = (p) => <Icon outline name="calendar" {...p} />;
export const CampOutline = (p) => <Icon outline name="camp" {...p} />;
export const ChatOutline = (p) => <Icon outline name="chat" {...p} />;
export const CloseOutline = (p) => <Icon outline name="close" {...p} />;
export const EditOutline = (p) => <Icon outline name="edit" {...p} />;
export const FireOutline = (p) => <Icon outline name="fire" {...p} />;
export const GoodOutline = (p) => <Icon outline name="good" {...p} />;
export const HotelOutline = (p) => <Icon outline name="hotel" {...p} />;
export const HouseOnTheSeaOutline = (p) => <Icon outline name="house_on_the_sea" {...p} />;
export const LeftArrowOutline = (p) => <Icon outline name="left_arrow" {...p} />;
export const LinkOutline = (p) => <Icon outline name="link" {...p} />;
export const LocationOutline = (p) => <Icon outline name="location" {...p} />;
export const LoginOutline = (p) => <Icon outline name="login" {...p} />;
export const LogoutOutline = (p) => <Icon outline name="logout" {...p} />;
export const MenuOutline = (p) => <Icon outline name="menu" {...p} />;
export const RightArrowOutline = (p) => <Icon outline name="right_arrow" {...p} />;
export const RoomServiceOutline = (p) => <Icon outline name="room_service" {...p} />;
export const SearchOutline = (p) => <Icon outline name="search" {...p} />;
export const WriteOutline = (p) => <Icon outline name="write" {...p} />;

// 8) 사용 예시
// - 중앙 Icon 컴포넌트
//   <Icon outline name="search" white width={20} height={20} />
//   <Icon filled name="bookmark" color="#10b981" />
// - 직접 가져와서 사용
//   import { BookmarkFilled, SearchOutline } from "@utils/iconColor";
//   <BookmarkFilled style={{ color: "#ff0" }} />
//   <SearchOutline className="search_icon" />
