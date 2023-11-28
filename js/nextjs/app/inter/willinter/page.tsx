import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <div>This page will intercept!</div>
      <Link href="./tointer">Intercept me!</Link>
    </div>
  )
}
