'use client'

import { useState } from 'react'
import { catalystWebFetch as cFetch } from '@catalyst-monitor/nextjs'

export default function Page() {
  const [respValue, setRespValue] = useState('')
  return (
    <>
      <div>{respValue}</div>
      <div>
        <button
          onClick={async () => {
            const resp = await cFetch('/handlers/handler1', { method: 'get' })
            const respJson = await resp.json()
            setRespValue(respJson.value)
          }}
        >
          GET
        </button>
        <button
          onClick={async () => {
            const resp = await cFetch('/handlers/handler1', { method: 'put' })
            const respJson = await resp.json()
            setRespValue(respJson.value)
          }}
        >
          PUT
        </button>
        <button
          onClick={async () => {
            const resp = await cFetch('/handlers/handler1', { method: 'post' })
            const respJson = await resp.json()
            setRespValue(respJson.value)
          }}
        >
          POST
        </button>
      </div>
    </>
  )
}
