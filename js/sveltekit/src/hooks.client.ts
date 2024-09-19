import {
  Catalyst,
  catalystClientErrorHandler,
} from '@catalyst-monitor/sveltekit/client'
import {
  PUBLIC_CATALYST_SYSTEM_NAME,
  PUBLIC_CATALYST_VERSION,
  PUBLIC_CATALYST_PUBLIC_KEY,
  PUBLIC_CATALYST_CLIENT_BASE_URL,
} from '$env/static/public'

Catalyst.start({
  systemName: `${PUBLIC_CATALYST_SYSTEM_NAME}-fe`,
  version: PUBLIC_CATALYST_VERSION,
  publicKey: PUBLIC_CATALYST_PUBLIC_KEY,
  userAgent: window.navigator.userAgent,
  baseUrl:
    PUBLIC_CATALYST_CLIENT_BASE_URL != ''
      ? PUBLIC_CATALYST_CLIENT_BASE_URL
      : undefined,
})

export const handleError = catalystClientErrorHandler(() => {})
