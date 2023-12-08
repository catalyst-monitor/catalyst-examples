import * as catalyst from '@catalyst-monitor/nextjs/config'

console.log(catalyst)

/** @type {import('next').NextConfig} */
export default catalyst.withCatalystConfig(
  {
    reactStrictMode: false,
  },
  {
    systemName: 'catalyst-nextjs-example',
    publicKey: 'UsHtftJZKdkF9WZ7DT4HSWQk08QHwZiUwEwab8wd',
    privateKey: 'CqZNUYrUBaqcsacZCfSO/e4afBQ98WOqFdHQT7N6',
    version: '0.0.1',
    baseUrl: 'http://localhost:7070',
  }
)
