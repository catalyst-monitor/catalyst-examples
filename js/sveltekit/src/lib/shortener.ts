const links: {
  [shortLink: string]:
    | { createdMillis: number; userId: string; fullUrl: string }
    | undefined
} = {}

export function setShortLink(
  userId: string,
  shortLink: string,
  fullUrl: string
) {
  if (shortLink.length < 1) {
    throw new Error('Short link is too short!')
  }
  const existing = links[shortLink]
  if (existing != null && existing.userId != userId) {
    throw new Error('Not authorized to change!')
  }

  links[shortLink] = {
    createdMillis: new Date().getTime(),
    userId,
    fullUrl,
  }
}

export function listShortLinks(userId: string): {
  shortLink: string
  createdMillis: number
  fullUrl: string
}[] {
  return Object.entries(links)
    .filter((e) => e[1] != undefined)
    .filter(([, link]) => link!.userId == userId)
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
