export async function load({ fetch, params }) {
  const resp = await fetch(`/api/todo/${params.accountPass}`)
  const respJson = await resp.json()
  return {
    password: params.accountPass,
    todos: respJson.todos,
  }
}
