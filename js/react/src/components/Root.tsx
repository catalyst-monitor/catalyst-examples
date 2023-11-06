import { Link } from 'react-router-dom'
import styles from './Root.module.css'

const links: { url: string; text: string }[] = [
  {
    url: '/widgets/a',
    text: 'Example widget',
  },
  { url: '/widgets', text: 'See more widgets here' },
  {
    url: '/widgets/error',
    text: 'Get a guaranteed error here.',
  },
  {
    url: '/bye',
    text: 'Really not found',
  },
]

export default function Root() {
  return (
    <div className={styles.root}>
      <p>Welcome to the Catalyst example app!</p>
      <p>
        This is a toy example meant to showcase the monitoring features of
        Catalyst.
      </p>

      <div>Links:</div>
      {links.map(({ url, text }, idx) => (
        <Link to={url} key={idx}>
          {text}
        </Link>
      ))}
    </div>
  )
}
