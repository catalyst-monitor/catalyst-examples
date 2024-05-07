import { listShortLinks, setShortLink } from '$lib/shortener.js'
import { error, redirect } from '@sveltejs/kit'

export const actions = {
  set: async ({ request, locals }) => {
    const user = locals.user
    if (user == null) {
      error(403, 'Not authorized')
    }
    const form = await request.formData()
    const shortLink = form.get('shortLink')!.toString()
    const fullUrl = form.get('fullUrl')!.toString()

    setShortLink(user.id, shortLink, fullUrl)
  },
}

export async function load({ locals }) {
  const user = locals.user
  if (user == null) {
    redirect(307, '/')
  }
  return {
    links: listShortLinks(user.id),
  }
}
