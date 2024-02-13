import {
  installNodeBase,
  catalystHandler,
  wrapCatalystFetchHandler,
  wrapCatalystServerErrorHandler,
} from '@catalyst-monitor/sveltekit/server'
import {
  PUBLIC_CATALYST_SYSTEM_NAME,
  PUBLIC_CATALYST_VERSION,
} from '$env/static/public'
import { CATALYST_PRIVATE_KEY } from '$env/static/private'

installNodeBase({
  privateKey: CATALYST_PRIVATE_KEY,
  systemName: PUBLIC_CATALYST_SYSTEM_NAME,
  version: PUBLIC_CATALYST_VERSION,
  baseUrl: 'http://localhost:7070',
})

export const handleError = wrapCatalystServerErrorHandler(({ error }) => {
  console.error(error)
})

export const handleFetch = wrapCatalystFetchHandler(['http://localhost:5174'])

export const handle = catalystHandler
