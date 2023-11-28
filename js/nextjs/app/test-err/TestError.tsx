export default function TestError(): React.ReactNode {
  console.log('ERROR!')
  throw new Error('Test error')
}
