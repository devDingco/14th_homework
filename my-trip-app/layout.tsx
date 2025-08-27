import "./global.css";
import AppFrame from "@components/layout/AppFrame";
import React from "react";

export const metadata = {
  title: "My Trip App",
  description: "My Trip App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <AppFrame>
          <main>{children}</main>
        </AppFrame>
        <footer style={{ display: "none" }}>footer</footer>
      </body>
    </html>
  );
}
