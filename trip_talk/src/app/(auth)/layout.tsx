import './layout.css';
import { ReactNode } from 'react';

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="login_container">
      <div className="login_form_wrapper">{children}</div>
      <div className="login_banner_wrapper"></div>
    </div>
  );
}
