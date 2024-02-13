interface Todo {
  id: string
  todo: string
  created: Date
  finished?: Date
}

const todoAccounts: {
  [password: string]: {
    todos: Todo[]
  }
} = {}

export function createAccount(password: string) {
  todoAccounts[password] = { todos: [] }
}

export function deleteAccount(password: string) {
  delete todoAccounts[password]
}

export function listTodos(password: string): Todo[] {
  return todoAccounts[password].todos
}

export function createTodo(password: string, todoText: string): Todo {
  const newTodo = {
    id: crypto.randomUUID(),
    todo: todoText,
    created: new Date(),
  }
  todoAccounts[password].todos.push(newTodo)
  return newTodo
}

export function finishTodo(password: string, id: string) {
  const finishedIdx = todoAccounts[password].todos.findIndex((t) => t.id == id)
  todoAccounts[password].todos[finishedIdx].finished = new Date()
}

export function deleteTodo(password: string, id: string) {
  todoAccounts[password].todos = todoAccounts[password].todos.filter(
    (t) => t.id != id
  )
}
