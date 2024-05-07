import { createUser, loginUser, logout } from '$lib/server/user.js'

export const actions = {
  login: async ({ request, cookies }) => {
    const form = await request.formData()
    const userName = form.get('userName')!.toString()
    const password = form.get('password')!.toString()

    const result = loginUser(userName, password)
    if ('error' in result) {
      return {
        loginResult: result.error,
      }
    }
    const newSessionId = result.sessionId
    cookies.set('example_session_id', newSessionId, {
      path: '/',
      httpOnly: false,
      sameSite: 'strict',
    })
    return { refresh: true }
  },
  logout: ({ cookies }) => {
    const sessionId = cookies.get('example_session_id')
    if (sessionId != null) {
      cookies.delete('example_session_id', {
        path: '/',
        httpOnly: false,
        sameSite: 'strict',
      })
      logout(sessionId)
    }
    return { refresh: true }
  },
  create: async ({ request, cookies }) => {
    const form = await request.formData()
    const userName = form.get('userName')!.toString()
    const password = form.get('password')!.toString()

    const result = createUser(userName, password)
    if ('error' in result) {
      return {
        loginResult: result.error,
      }
    }
    const newSessionId = result.sessionId
    cookies.set('example_session_id', newSessionId, {
      path: '/',
      httpOnly: false,
      sameSite: 'strict',
    })
    return { refresh: true }
  },
}

export function load({ locals }) {
  return {
    isAuthed: locals.user != null,
  }
}
