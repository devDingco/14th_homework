export type TypographyPlatform = "mobile" | "desktop";
export type TypographyLanguage = "default" | "en";

export type TypographyStyle = {
  fontSize: string;
  lineHeight: string | number;
  fontWeight: number;
  letterSpacing: string;
};

export type TypographyToken =
  | "display2xl"
  | "displayXl"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "bodyLg"
  | "bodyMd"
  | "bodySm"
  | "caption";

type TypographyScale = Record<
  TypographyToken,
  {
    mobile: TypographyStyle;
    desktop: TypographyStyle;
    // optional per-language overrides (only define differences)
    langOverrides?: Partial<Record<TypographyLanguage, Partial<Record<TypographyPlatform, Partial<TypographyStyle>>>>>
  }
>;

export const TYPOGRAPHY_SCALE: TypographyScale = {
  display2xl: {
    mobile: { fontSize: "3rem", lineHeight: 1.1, fontWeight: 700, letterSpacing: "-0.01em" },
    desktop: { fontSize: "3.75rem", lineHeight: 1.1, fontWeight: 700, letterSpacing: "-0.0125em" },
    langOverrides: {
      en: {
        mobile: { letterSpacing: "-0.015em" },
        desktop: { letterSpacing: "-0.02em" },
      },
    },
  },
  displayXl: {
    mobile: { fontSize: "2.5rem", lineHeight: 1.15, fontWeight: 700, letterSpacing: "-0.01em" },
    desktop: { fontSize: "3rem", lineHeight: 1.15, fontWeight: 700, letterSpacing: "-0.015em" },
    langOverrides: {
      en: { desktop: { letterSpacing: "-0.02em" } },
    },
  },
  h1: {
    mobile: { fontSize: "2rem", lineHeight: 1.2, fontWeight: 700, letterSpacing: "-0.005em" },
    desktop: { fontSize: "2.5rem", lineHeight: 1.2, fontWeight: 700, letterSpacing: "-0.01em" },
    langOverrides: { en: { desktop: { letterSpacing: "-0.0125em" } } },
  },
  h2: {
    mobile: { fontSize: "1.5rem", lineHeight: 1.3, fontWeight: 700, letterSpacing: "-0.005em" },
    desktop: { fontSize: "2rem", lineHeight: 1.3, fontWeight: 700, letterSpacing: "-0.01em" },
  },
  h3: {
    mobile: { fontSize: "1.25rem", lineHeight: 1.35, fontWeight: 600, letterSpacing: "-0.003em" },
    desktop: { fontSize: "1.5rem", lineHeight: 1.35, fontWeight: 600, letterSpacing: "-0.006em" },
  },
  h4: {
    mobile: { fontSize: "1.125rem", lineHeight: 1.4, fontWeight: 600, letterSpacing: "0em" },
    desktop: { fontSize: "1.25rem", lineHeight: 1.4, fontWeight: 600, letterSpacing: "0em" },
  },
  h5: {
    mobile: { fontSize: "1rem", lineHeight: 1.45, fontWeight: 600, letterSpacing: "0em" },
    desktop: { fontSize: "1.125rem", lineHeight: 1.45, fontWeight: 600, letterSpacing: "0em" },
  },
  h6: {
    mobile: { fontSize: "0.875rem", lineHeight: 1.4, fontWeight: 600, letterSpacing: "0.005em" },
    desktop: { fontSize: "1rem", lineHeight: 1.4, fontWeight: 600, letterSpacing: "0.0025em" },
  },
  bodyLg: {
    mobile: { fontSize: "1rem", lineHeight: 1.6, fontWeight: 400, letterSpacing: "0em" },
    desktop: { fontSize: "1.0625rem", lineHeight: 1.65, fontWeight: 400, letterSpacing: "0em" },
  },
  bodyMd: {
    mobile: { fontSize: "0.9375rem", lineHeight: 1.6, fontWeight: 400, letterSpacing: "0em" },
    desktop: { fontSize: "1rem", lineHeight: 1.6, fontWeight: 400, letterSpacing: "0em" },
  },
  bodySm: {
    mobile: { fontSize: "0.875rem", lineHeight: 1.6, fontWeight: 400, letterSpacing: "0.003em" },
    desktop: { fontSize: "0.9375rem", lineHeight: 1.6, fontWeight: 400, letterSpacing: "0.002em" },
  },
  caption: {
    mobile: { fontSize: "0.75rem", lineHeight: 1.4, fontWeight: 400, letterSpacing: "0.01em" },
    desktop: { fontSize: "0.75rem", lineHeight: 1.4, fontWeight: 400, letterSpacing: "0.008em" },
  },
};

export const FONT_FAMILY_SANS_VAR = "var(--font-geist-sans)";
export const FONT_FAMILY_MONO_VAR = "var(--font-geist-mono)";

export function getTypographyStyles(
  token: TypographyToken,
  options?: { platform?: TypographyPlatform; lang?: TypographyLanguage }
): TypographyStyle & { fontFamily: string } {
  const platform: TypographyPlatform = options?.platform ?? "mobile";
  const lang: TypographyLanguage = options?.lang ?? "default";
  const base = TYPOGRAPHY_SCALE[token][platform];
  const overrides = TYPOGRAPHY_SCALE[token].langOverrides?.[lang]?.[platform] ?? {};
  const merged: TypographyStyle = { ...base, ...overrides };
  return { ...merged, fontFamily: FONT_FAMILY_SANS_VAR };
}

export const TYPO_TOKENS: TypographyToken[] = [
  "display2xl",
  "displayXl",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "bodyLg",
  "bodyMd",
  "bodySm",
  "caption",
];


