import type { NextConfig } from 'next';

const { NEXT_PUBLIC_USE_API_MOCKING } = process.env;

const NextFunctionConfig = async (phase: any) => {
  console.info(`phase = ${phase}`);

  const useMocking =
    NEXT_PUBLIC_USE_API_MOCKING === 'true' &&
    (phase === 'phase-production-server' ||
      phase === 'phase-development-server');
  console.info(`useMocking = ${useMocking}`);

  /** @type {import('next').NextConfig} */
  const nextConfig: NextConfig = {
    transpilePackages: ['@repo/ui'],
    webpack: (config, { isServer }: { isServer: boolean }) => {
      if (isServer) {
        config.resolve.alias['msw/browser'] = false;
      } else {
        config.resolve.alias['msw/node'] = false;
      }

      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
          port: '',
          pathname: '/**',
        },
      ], // 외부 이미지 도메인 추가 //TODO: 나중에 실제 데이터 받으면 변경
    },
    // API 프록시 설정 추가
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_SERVICE_API_URL}/:path*`,
        },
      ];
    },
  };

  return nextConfig;
};

export default NextFunctionConfig;
