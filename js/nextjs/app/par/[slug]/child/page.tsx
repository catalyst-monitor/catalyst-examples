export const dynamic = 'force-dynamic'

const Page = ({ params }: { params: { slug: string } }) => {
  return <div>Child from {params.slug}</div>
}
export default Page
