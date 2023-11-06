import React from 'react'
import App from './components/Root.tsx'
import './index.css'
import { installWebBase } from '@doctor/javascript-core'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import WidgetRoot from './components/WidgetRoot.tsx'
import WidgetContainer from './components/WidgetContainer.tsx'
import Widget from './components/Widget.tsx'
import GuaranteedError from './components/GauranteedError.tsx'
import createCatalystRouter from './lib/catalyst.tsx'
import { createRoot } from 'react-dom/client'
import wrapRoutes from './lib/catalyst.tsx'

installWebBase({
  baseUrl: 'http://localhost:7070',
  version: '0.0.1',
  systemName: 'catalyst-js-react-example',
  userAgent: navigator.userAgent,
  publicKey: 'UsHtftJZKdkF9WZ7DT4HSWQk08QHwZiUwEwab8wd',
})

const router = createBrowserRouter(
  wrapRoutes([
    {
      path: '/',
      element: <App />,
    },
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
      path: '/error',
      element: <GuaranteedError />,
    },
  ])
)

createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
)
