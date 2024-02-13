import { getShortLink } from '$lib/shortener.js'
import { redirect } from '@sveltejs/kit'

// BUG: There's a fun bug related to where the data is stored here.
export async function load({ params }) {
  const link = getShortLink(params.shortLink)
  if (link != undefined) {
    redirect(307, link)
  }
}
