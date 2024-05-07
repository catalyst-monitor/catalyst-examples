import { createTodo, listTodos } from '$lib/server/todo.js'
import { error } from '@sveltejs/kit'

export async function GET({ locals }) {
  const user = locals.user

  if (user == null) {
    error(403, 'Not authorized')
  }

  const todos = listTodos(user.id)
  return new Response(
    JSON.stringify({
      todos: todos.map((t) => ({
        id: t.id,
        todo: t.todo,
        createdMillis: t.created.getTime(),
        finishedMillis: t.finished?.getTime(),
      })),
    })
  )
}

export async function PUT({ request, locals }) {
  const user = locals.user

  if (user == null) {
    error(403, 'Not authorized')
  }

  const req = await request.json()

  if (typeof req['todo'] != 'string') {
    error(400, "'todo' was not populated!")
  }

  const result = createTodo(user.id, req['todo'])

  return new Response(
    JSON.stringify({
      id: result.id,
      todo: result.todo,
      createdMillis: result.created.getTime(),
    })
  )
}
