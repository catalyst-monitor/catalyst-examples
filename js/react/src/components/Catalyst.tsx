import { DoctorClient } from '@doctor/javascript-core'
import { useLayoutEffect } from 'react'
import { Outlet, RouteObject, matchRoutes, useLocation } from 'react-router'

export default function Catalyst({ routes }: { routes: RouteObject[] }) {
  const location = useLocation()
  useLayoutEffect(() => {
    const matches = matchRoutes(routes, location.pathname)
    if (matches != null && matches.length != 0) {
      const params = matches[matches.length - 1].params

      // Filter out undefineds.
      const definedParams = Object.fromEntries(
        Object.entries(params)
          .filter((e) => e[1] != null)
          .map((e) => [e[0], e[1]!])
      )

      const builtPath = matches.map((m) => m.route.path).join('/')

      DoctorClient.get().recordPageView(builtPath, definedParams)
    }
  }, [location.pathname, routes])

  return <Outlet />
}
