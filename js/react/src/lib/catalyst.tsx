import { installWebBase } from '@catalyst-monitor/core'
import { RouteObject } from 'react-router'
import Catalyst from '../components/Catalyst'

installWebBase({
  version: import.meta.env.VITE_CATALYST_VERSION,
  systemName: 'catalyst-js-react-example',
  userAgent: navigator.userAgent,
  publicKey: import.meta.env.VITE_CATALYST_PUBLIC_KEY,
})

export default function wrapRoutes(routes: RouteObject[]): RouteObject[] {
  const routeCopy = [...routes]
  const previousRoot = routeCopy.find((r) => r.path == '/')
  if (previousRoot != null) {
    previousRoot.path = undefined
    previousRoot.index = true
  }
  return [
    {
      path: '/',
      element: <Catalyst routes={routeCopy} />,
      children: routeCopy,
    },
  ]
}
