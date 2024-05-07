import { deleteTodo, finishTodo } from '$lib/server/todo.js'
import { error } from '@sveltejs/kit'

export async function DELETE({ request, locals }) {
  const user = locals.user
  if (user == null) {
    error(403, 'Not authorized')
  }

  // BUG: Delete should use the ID from the URL params.
  const formData = await request.formData()
  const id = formData.get('id')

  deleteTodo(user.id, id!.toString())
  return new Response()
}

export async function POST({ locals, params }) {
  const user = locals.user
  if (user == null) {
    error(403, 'Not authorized')
  }

  if (Math.random() * 7 <= 1) {
    throw new Error('Unlucky!')
  }

  finishTodo(user.id, params.id)
  return new Response()
}
