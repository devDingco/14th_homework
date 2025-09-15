export interface NavigationItem {
  href: string;
  label: string;
  exact: boolean;
  icon?: string;
  children?: NavigationItem[];
}

export interface NavigationProps {
  className?: string;
  showLogo?: boolean;
  items?: NavigationItem[];
  user?: UserInfo;
}

export interface UserInfo {
  _id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface NavigationState {
  isMenuOpen: boolean;
  isScrolled: boolean;
  currentUser?: UserInfo;
}

export interface TabItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

export interface ProfileAreaProps {
  user?: UserInfo;
  onProfileClick?: () => void;
}
