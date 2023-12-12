/**
 * This file shows how to properly install Catalyst on a React app
 * using React Router.
 *
 * There are 3 steps:
 *
 * 1. Install Catalyst, as soon as possible.
 * 2. Wrap your existing React Router routes with Catalyst, to report
 *    errors and capture page changes.
 * 3. (see lib/api.ts) Replace calls to `fetch` with the provided `catalystWebFetch` function.
 */

import App from './components/Root.tsx'
import './index.css'
import {
  Outlet,
  useLocation,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import WidgetRoot from './components/WidgetRoot.tsx'
import WidgetContainer from './components/WidgetContainer.tsx'
import Widget from './components/Widget.tsx'
import GuaranteedError from './components/GauranteedError.tsx'
import { createRoot } from 'react-dom/client'
import Parent from './components/Parent.tsx'
import Counter from './components/Counter.tsx'
import { wrapRoutes } from '@catalyst-monitor/react-router'
import { installWebBase } from '@catalyst-monitor/core/web'

// Install Catalyst ASAP.
installWebBase({
  version: import.meta.env.VITE_CATALYST_VERSION,
  systemName: 'catalyst-js-react-example',
  userAgent: navigator.userAgent,
  publicKey: import.meta.env.VITE_CATALYST_PUBLIC_KEY,
})

const router = createBrowserRouter(
  // Wrap your React Router routes with Catalyst.
  wrapRoutes(
    [
      {
        path: '/',
        element: <App />,
      },
      { path: '/counter', element: <Counter /> },
      {
        path: '/widgets',
        element: <WidgetContainer />,
        children: [
          {
            index: true,
            element: <WidgetRoot />,
          },
          {
            path: ':id',
            element: <Widget />,
          },
        ],
      },
      {
        path: '/parent/:id',
        element: <Parent />,
      },
      {
        path: '/error',
        element: <GuaranteedError />,
      },
    ],
    {
      Outlet,
      useLocation,
    }
  )
)

createRoot(document.getElementById('root')!).render(
  // React strict mode will run effects twice, which can cause
  // events to be recorded twice in Catalyst.
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
)
