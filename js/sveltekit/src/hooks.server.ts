import {
  installNodeBase,
  catalystHandler,
  wrapCatalystFetchHandler,
  wrapCatalystServerErrorHandler,
  updateCatalystUserInfoContext,
} from '@catalyst-monitor/sveltekit/server'
import {
  PUBLIC_CATALYST_SYSTEM_NAME,
  PUBLIC_CATALYST_VERSION,
} from '$env/static/public'
import { CATALYST_PRIVATE_KEY } from '$env/static/private'
import { sequence } from '@sveltejs/kit/hooks'
import { verifySession } from '$lib/server/user'

installNodeBase({
  privateKey: CATALYST_PRIVATE_KEY,
  systemName: PUBLIC_CATALYST_SYSTEM_NAME,
  version: PUBLIC_CATALYST_VERSION,
})

export const handleError = wrapCatalystServerErrorHandler(({ error }) => {
  if ('__catalystOldError' in console && console.__catalystOldError != null) {
    console.__catalystOldError(error)
  }
})

export const handleFetch = wrapCatalystFetchHandler(['http://localhost:5174'])

export const handle = sequence(catalystHandler, ({ event, resolve }) => {
  const sessionId = event.cookies.get('example_session_id')
  if (sessionId != null) {
    const result = verifySession(sessionId)
    if ('id' in result) {
      event.locals.user = result
      updateCatalystUserInfoContext({
        loggedInId: result.id,
        loggedInUserName: result.name,
      })
    }
  }

  return resolve(event)
})
