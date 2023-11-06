import { useEffect, useState } from 'react'

export type AsyncStatus = 'loading' | 'finished' | 'error'

export default function useAsync<T>(cb: () => Promise<T>): {
  value: T | null
  status: AsyncStatus
} {
  const [value, setValue] = useState<T | null>(null)
  const [status, setStatus] = useState<AsyncStatus>('loading')
  useEffect(() => {
    cb().then(
      (v) => {
        setValue(v)
        setStatus('finished')
      },
      (e) => {
        setStatus('error')
        throw e
      }
    )
  }, [cb])

  return { value, status }
}
