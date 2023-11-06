import express from 'express'
import { catalystHandler } from './catalyst'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors(), catalystHandler)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/widget/:slug', (req, res) => {
  const { slug } = req.params
  if (slug == 'fake-error') {
    throw new Error('Fake error')
  }
  res.send(`Hello ${slug}`)
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
