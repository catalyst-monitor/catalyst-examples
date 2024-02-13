import { createAccount } from '$lib/server/todo.js'

export async function PUT() {
  const arr = new Uint8Array(12)
  crypto.getRandomValues(arr)
  const newPass = [...arr].map((d) => d.toString(16).padStart(2, '0')).join('')

  createAccount(newPass)
  return new Response(
    JSON.stringify({
      password: newPass,
    })
  )
}
