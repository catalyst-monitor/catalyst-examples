import { Link } from 'react-router-dom'

const widgetList: { text: string; url: string }[] = [
  { text: 'Widget A', url: '/widgets/a' },
  { text: 'Widget B', url: '/widgets/b' },
  { text: 'Widget 404', url: '/widgets/not-exist' },
  { text: 'Widget error', url: '/widgets/bad' },
]

export default function WidgetRoot() {
  return (
    <div>
      <div>Click a link</div>
      {widgetList.map(({ text, url }, idx) => (
        <Link to={url} key={idx}>
          {text}
        </Link>
      ))}
    </div>
  )
}
