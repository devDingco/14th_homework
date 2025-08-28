export type IconType = "outline" | "filled";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  type?: IconType;
  name?: string;
  color?: string;
  outline?: boolean;
  filled?: boolean;
  write?: boolean;
  search?: boolean;
  calendar?: boolean;
  white?: boolean;
  black?: boolean;
  red?: boolean;
  primary?: boolean;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  [key: string]: any;
}


