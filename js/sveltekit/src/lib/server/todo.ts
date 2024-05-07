interface Todo {
  id: string
  todo: string
  created: Date
  finished?: Date
}

const todoAccounts: {
  [userId: string]: {
    todos: Todo[]
  }
} = {}

export function listTodos(userId: string): Todo[] {
  prepareTodos(userId)
  return todoAccounts[userId].todos
}

export function createTodo(userId: string, todoText: string): Todo {
  prepareTodos(userId)
  const newTodo = {
    id: crypto.randomUUID(),
    todo: todoText,
    created: new Date(),
  }
  todoAccounts[userId].todos.push(newTodo)
  return newTodo
}

export function finishTodo(userId: string, id: string) {
  const finishedIdx = todoAccounts[userId].todos.findIndex((t) => t.id == id)
  todoAccounts[userId].todos[finishedIdx].finished = new Date()
}

export function deleteTodo(userId: string, id: string) {
  todoAccounts[userId].todos = todoAccounts[userId].todos.filter(
    (t) => t.id != id
  )
}

function prepareTodos(userId: string) {
  if (!(userId in todoAccounts)) {
    todoAccounts[userId] = {
      todos: [],
    }
  }
}
