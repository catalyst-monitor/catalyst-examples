import {
  catalystClientErrorHandler,
  installWebBase,
} from '@catalyst-monitor/sveltekit/client'
import {
  PUBLIC_CATALYST_SYSTEM_NAME,
  PUBLIC_CATALYST_VERSION,
  PUBLIC_CATALYST_PUBLIC_KEY,
} from '$env/static/public'

installWebBase({
  systemName: `${PUBLIC_CATALYST_SYSTEM_NAME}-fe`,
  version: PUBLIC_CATALYST_VERSION,
  publicKey: PUBLIC_CATALYST_PUBLIC_KEY,
  userAgent: window.navigator.userAgent,
})

export const handleError = catalystClientErrorHandler(() => {})
