import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <div>Hello {params.slug}</div>
      <Link href={`${params.slug}/child`}>To Child</Link>
    </div>
  )
}
