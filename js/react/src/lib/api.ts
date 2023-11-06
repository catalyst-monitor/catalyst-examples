import { catalystWebFetch as cFetch } from '@doctor/javascript-core'

const baseUrl = 'http://localhost:3000'

export interface ResponseType {
  value: string
  status: number
}

async function fetchInternal(url: string): Promise<string> {
  const resp = await cFetch(url)
  if (resp.status > 299) {
    throw Error(`Fetch to ${url} failed with code: ${resp.status}`)
  }
  return resp.text()
}

const api = {
  fetchWidget(widgetId: string): Promise<string> {
    return fetchInternal(`${baseUrl}/widget/${widgetId}`)
  },
  fetchParent(parentId: string): Promise<string> {
    return fetchInternal(`${baseUrl}/parent/${parentId}`)
  },
}
export default api
