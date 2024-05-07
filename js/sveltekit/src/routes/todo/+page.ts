export async function load({ fetch }) {
  const resp = await fetch(`/api/todo`)
  const respJson = await resp.json()
  return {
    todos: respJson.todos,
  }
}
