const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    if (!isServer) {
      return config
    }
    config.module.rules.unshift({
      test: /(?:page|default)\.(tsx|jsx)$/,
      include: [
        path.resolve(__dirname, 'app'),
        path.resolve(__dirname, 'src', 'app'),
      ],
      use: [
        {
          loader: '@catalyst-monitor/nextjs/dist/page-loader',
          options: {
            originalPath: __dirname,
          },
        },
      ],
    })
    config.module.rules.unshift({
      test: /\/(?!page|loading|not-found|error|global-error|template).+\.(tsx|jsx)$/,
      include: [
        path.resolve(__dirname, 'app'),
        path.resolve(__dirname, 'src', 'app'),
      ],
      use: [
        {
          loader: '@catalyst-monitor/nextjs/dist/component-loader',
        },
      ],
    })
    return config
  },
}

module.exports = nextConfig
