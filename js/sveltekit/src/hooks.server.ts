import {
  catalystHandler,
  wrapCatalystFetchHandler,
  wrapCatalystServerErrorHandler,
  Catalyst,
} from '@catalyst-monitor/sveltekit/server'
import {
  PUBLIC_CATALYST_SYSTEM_NAME,
  PUBLIC_CATALYST_VERSION,
  PUBLIC_CATALYST_SERVER_BASE_URL,
} from '$env/static/public'
import { CATALYST_PRIVATE_KEY } from '$env/static/private'
import { sequence } from '@sveltejs/kit/hooks'
import { verifySession } from '$lib/server/user'

Catalyst.start({
  privateKey: CATALYST_PRIVATE_KEY,
  systemName: PUBLIC_CATALYST_SYSTEM_NAME,
  version: PUBLIC_CATALYST_VERSION,
  propagatePathOnly: true,
  baseUrl:
    PUBLIC_CATALYST_SERVER_BASE_URL != ''
      ? PUBLIC_CATALYST_SERVER_BASE_URL
      : undefined,
})

export const handleError = wrapCatalystServerErrorHandler(({ error }) => {
  if (
    '__catalystOldError' in console &&
    console.__catalystOldError != null &&
    typeof console.__catalystOldError == 'function'
  ) {
    console.__catalystOldError(error)
  }
})

export const handleFetch = wrapCatalystFetchHandler()

export const handle = sequence(catalystHandler, ({ event, resolve }) => {
  const sessionId = event.cookies.get('example_session_id')
  if (sessionId != null) {
    const result = verifySession(sessionId)
    if ('id' in result) {
      event.locals.user = result
      Catalyst.getReporter().setLoggedInUserInfo({
        loggedInId: result.id,
        loggedInName: result.name,
      })
    }
  }

  return resolve(event)
})
