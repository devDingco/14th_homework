/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    async rewrites() {
        return [
          {
            source: "/graphql", // 브라우저에서 호출할 경로
            destination: 'http://main-practice.codebootcamp.co.kr/graphql', // 실제 GraphQL 서버
          },
        ]
      },
};

export default nextConfig;
