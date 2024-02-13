import { createTodo, listTodos } from '$lib/server/todo'
import { error } from '@sveltejs/kit'

export async function GET({ params }) {
  const todos = listTodos(params.accountPass)
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

export async function PUT({ request, params }) {
  const req = await request.json()

  if (typeof req['todo'] != 'string') {
    error(400, "'todo' was not populated!")
  }

  const result = createTodo(params.accountPass, req['todo'])

  return new Response(
    JSON.stringify({
      id: result.id,
      todo: result.todo,
      createdMillis: result.created.getTime(),
    })
  )
}
