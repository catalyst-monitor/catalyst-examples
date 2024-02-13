const links: {
  [shortLink: string]:
    | { createdMillis: number; password: string; fullUrl: string }
    | undefined
} = {}

export function setShortLink(
  shortLink: string,
  password: string,
  fullUrl: string
) {
  if (shortLink.length < 1) {
    throw new Error('Short link is too short!')
  }
  const existing = links[shortLink]
  if (existing != null && existing.password != password) {
    throw new Error('Not authorized to change!')
  }

  links[shortLink] = {
    createdMillis: new Date().getTime(),
    password,
    fullUrl,
  }
}

export function listRecentShortLinks(): {
  shortLink: string
  createdMillis: number
  fullUrl: string
}[] {
  return Object.entries(links)
    .filter((e) => e[1] != undefined)
    .map(([k, v]) => {
      return {
        shortLink: k,
        createdMillis: v!.createdMillis,
        fullUrl: v!.fullUrl,
      }
    })
    .sort((a, b) => b.createdMillis - a.createdMillis)
    .slice(0, 100)
}

export function getShortLink(shortLink: string): string | undefined {
  const existing = links[shortLink]
  if (existing == null) {
    return undefined
  }
  return existing.fullUrl
}
