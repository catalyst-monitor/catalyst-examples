export async function GET() {
  return Response.json({ value: 'Hi from GET' })
}

export const PUT = () => {
  return Response.json({ value: 'Hi from PUT' })
}

function postMethod() {
  return Response.json({ value: 'Hi from POST' })
}

export { postMethod as POST }
