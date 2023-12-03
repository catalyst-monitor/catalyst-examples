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
    const catalystInit = {
      systemName: 'catalyst-nextjs-example',
      publicKey: 'UsHtftJZKdkF9WZ7DT4HSWQk08QHwZiUwEwab8wd',
      privateKey: 'CqZNUYrUBaqcsacZCfSO/e4afBQ98WOqFdHQT7N6',
      version: '0.0.1',
      baseUrl: 'http://localhost:7070',
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
            catalystInit,
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
          options: {
            catalystInit,
          },
        },
      ],
    })
    config.module.rules.unshift({
      test: /\/route.(ts|js)$/,
      include: [
        path.resolve(__dirname, 'app'),
        path.resolve(__dirname, 'src', 'app'),
      ],
      use: [
        {
          loader: '@catalyst-monitor/nextjs/dist/route-handler-loader',
          options: {
            catalystInit,
            originalPath: __dirname,
          },
        },
      ],
    })
    config.module.rules.unshift({
      test: (p) => {
        if (p.startsWith(__dirname)) {
          return (
            p == path.resolve(__dirname, 'middleware.ts') ||
            p == path.resolve(__dirname, 'middleware.js')
          )
        }
        return p == 'middlware.ts' || p == 'middleware.js'
      },
      use: [
        {
          loader: '@catalyst-monitor/nextjs/dist/middleware-loader',
          options: {
            catalystInit,
            originalPath: __dirname,
          },
        },
      ],
    })

    return config
  },
}

module.exports = nextConfig
