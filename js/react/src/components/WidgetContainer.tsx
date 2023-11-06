import { Outlet } from 'react-router-dom'

export default function WidgetContainer() {
  return (
    <div>
      <div>Widgets!</div>
      <Outlet />
    </div>
  )
}
