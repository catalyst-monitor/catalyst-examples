import { catalystWebFetch as cFetch } from '@catalyst-monitor/core'

const baseUrl = 'http://localhost:3000'

export interface ResponseType {
  value: string
  status: number
}

async function fetchInternal(method: string, url: string): Promise<string> {
  const resp = await cFetch(url, {
    method: method,
  })
  if (resp.status > 299) {
    throw Error(`Fetch to ${url} failed with code: ${resp.status}`)
  }
  return resp.text()
}

const api = {
  fetchWidget(widgetId: string): Promise<string> {
    return fetchInternal('get', `${baseUrl}/widget/${widgetId}`)
  },
  fetchParent(parentId: string): Promise<string> {
    return fetchInternal('get', `${baseUrl}/parent/${parentId}`)
  },
  counter(): Promise<string> {
    return fetchInternal('post', `${baseUrl}/counter`)
  },
}
export default api
