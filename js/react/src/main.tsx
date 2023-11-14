import React from 'react'
import App from './components/Root.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import WidgetRoot from './components/WidgetRoot.tsx'
import WidgetContainer from './components/WidgetContainer.tsx'
import Widget from './components/Widget.tsx'
import GuaranteedError from './components/GauranteedError.tsx'
import { createRoot } from 'react-dom/client'
import wrapRoutes from './lib/catalyst.tsx'
import Parent from './components/Parent.tsx'

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
      path: '/parent/:id',
      element: <Parent />,
    },
    {
      path: '/error',
      element: <GuaranteedError />,
    },
  ])
)

createRoot(document.getElementById('root')!).render(
  // React strict mode will run effects twice, which can cause
  // events to be recorded twice in Catalyst.
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
)
