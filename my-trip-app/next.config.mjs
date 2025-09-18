// ESM configuration

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... 다른 설정들
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  // types 폴더를 라우팅에서 제외
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config) => {
    // SVG를 React 컴포넌트로 임포트할 수 있게 설정
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts|jsx|tsx)$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: { overrides: { removeViewBox: false } },
                },
                {
                  name: "removeAttrs",
                  params: { attrs: "(fill|stroke)" },
                },
              ],
            },
            titleProp: true,
            ref: true,
            // 루트 svg에 기본 색 바인딩을 걸어 currentColor를 사용하게 함
            svgProps: {
              fill: "currentColor",
              stroke: "currentColor",
            },
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
