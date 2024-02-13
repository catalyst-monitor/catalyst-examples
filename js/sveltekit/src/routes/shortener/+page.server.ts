import { listRecentShortLinks, setShortLink } from '$lib/shortener.js'

export const actions = {
  set: async ({ request }) => {
    const form = await request.formData()
    const shortLink = form.get('shortLink')!.toString()
    const password = form.get('password')!.toString()
    const fullUrl = form.get('fullUrl')!.toString()

    setShortLink(shortLink, password, fullUrl)
  },
}

export async function load() {
  return {
    links: listRecentShortLinks(),
  }
}
