import { deleteTodo, finishTodo } from '$lib/server/todo.js'

export async function DELETE({ request, params }) {
  // BUG: Delete should use the ID from the URL params.
  const formData = await request.formData()
  const id = formData.get('id')

  deleteTodo(params.accountPass, id!.toString())
  return new Response()
}

export async function POST({ params }) {
  finishTodo(params.accountPass, params.id)
  return new Response()
}
