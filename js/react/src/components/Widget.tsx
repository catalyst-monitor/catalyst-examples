import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import api from '../lib/api'
import useAsync from '../lib/async'

export default function Widget() {
  const params = useParams()
  const id = params.id

  const { status, value } = useAsync(
    useCallback(async () => {
      if (id == null) {
        return ''
      }
      return api.fetchWidget(id)
    }, [id])
  )

  if (status == 'loading') {
    return <div>Loading</div>
  } else if (status == 'error') {
    return <div>Error!</div>
  }

  return <div>You got widget: {value}</div>
}
