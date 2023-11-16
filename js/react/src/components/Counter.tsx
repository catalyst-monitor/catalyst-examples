import { useState } from 'react'
import api from '../lib/api'

export default function Counter() {
  const [counterVal, setCounterVal] = useState('')
  const [isError, setError] = useState(false)

  return (
    <div>
      <button
        onClick={async () => {
          try {
            setError(false)
            setCounterVal(await api.counter())
          } catch (e) {
            setError(true)
            throw e
          }
        }}
      >
        Click me
      </button>
      {isError ? <div>Got an error!</div> : null}
      <div>{counterVal}</div>
    </div>
  )
}
