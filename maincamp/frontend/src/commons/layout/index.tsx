"use client";

import { usePathname } from "next/navigation";
import LayoutBanner from "./banner";
import LayoutNavigation from "./navigation";
import { LayoutConfig } from "./type";
import Image from "next/image";
import styles from "./style.module.css";

const defaultConfig: LayoutConfig = {
  navigation: true,
  banner: true,
  hero: undefined,
};

const layoutConfig: Record<string, LayoutConfig> = {
  "/login": { navigation: false, banner: false, hero: "/images/hero.jpg" },
  "/signup": { navigation: false, banner: false, hero: "/images/hero.jpg" },
  "/boards": { navigation: true, banner: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const config = layoutConfig[pathname] ?? defaultConfig;

  const showNavigation = config.navigation !== false;
  const showBanner = config.banner !== false;
  const hero = config.hero;

  return (
    <>
      {showNavigation && <LayoutNavigation />}
      {showBanner && <LayoutBanner />}
      <div className={hero && styles.heroLayout}>
        {children}
        {hero && (
          <Image
            src={hero}
            alt="트립트립 대표이미지"
            width={0}
            height={0}
            sizes="100%"
            className={styles.heroImage}
          />
        )}
      </div>
    </>
  );
}
