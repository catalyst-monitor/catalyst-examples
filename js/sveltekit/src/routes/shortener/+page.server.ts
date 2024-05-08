import {
  deleteShortLink,
  listShortLinks,
  setShortLink,
} from '$lib/shortener.js'
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

  delete: async ({ request, locals }) => {
    const user = locals.user
    if (user == null) {
      error(403, 'Not authorized')
    }
    const formData = await request.formData()
    const shortLink = formData.get('shortLink')!.toString()

    deleteShortLink(user.id, shortLink)
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
