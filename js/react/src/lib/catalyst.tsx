import { installWebBase } from '@doctor/javascript-core'
import { RouteObject } from 'react-router'
import Catalyst from '../components/Catalyst'

installWebBase({
  baseUrl: 'http://localhost:7070',
  version: '0.0.1',
  systemName: 'catalyst-js-react-example',
  userAgent: navigator.userAgent,
  publicKey: 'UsHtftJZKdkF9WZ7DT4HSWQk08QHwZiUwEwab8wd',
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
