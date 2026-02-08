import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  // output: 'standalone', // 개발 환경에서는 비활성화
};

export default nextConfig;
