const userToPassword: {
  [username: string]: string
} = {
  'rowan@work.com': 'pass1',
  'casey@work.com': 'pass1',
  'ali@work.com': 'pass1',
  'parker@work.com': 'pass1',
}

const userToId: {
  [username: string]: string
} = {
  'rowan@work.com': '38264463-667d-448f-a22e-1a7955c8beee',
  'casey@work.com': 'e61b87b4-5e7c-4432-ae30-08af94511873',
  'ali@work.com': '94270fd8-bb8e-4001-8c44-077102f5b33e',
  'parker@work.com': 'bb20f550-6c31-4ac8-bd7b-c7928e9566b5',
}

const sessionToId: {
  [sessionId: string]: string
} = {}

export interface User {
  name: string
  id: string
}

export function createUser(
  name: string,
  password: string
): { error: string } | { sessionId: string } {
  if (name in userToId) {
    return { error: 'User already exists' }
  }
  const id = crypto.randomUUID()
  userToId[name] = id
  userToPassword[name] = password
  const sessionId = crypto.randomUUID()
  // This potentially has conflicts.
  // Oh well, this is an example.
  sessionToId[sessionId] = id

  return { sessionId }
}

export function loginUser(
  name: string,
  password: string
): { error: string } | { sessionId: string } {
  if (!(name in userToPassword)) {
    return { error: 'User does not exist' }
  }
  if (password != userToPassword[name]) {
    return { error: 'Password does not match' }
  }

  const sessionId = crypto.randomUUID()
  // This potentially has conflicts.
  // Oh well, this is an example.
  sessionToId[sessionId] = userToId[name]

  return { sessionId }
}

export function verifySession(sessionId: string): { error: string } | User {
  if (sessionId in sessionToId) {
    const userId = sessionToId[sessionId]
    return {
      id: userId,
      name: Object.entries(userToId).find(([, id]) => id == userId)![0],
    }
  }
  return { error: "Couldn't verify session" }
}

export function logout(sessionId: string) {
  delete sessionToId[sessionId]
}
