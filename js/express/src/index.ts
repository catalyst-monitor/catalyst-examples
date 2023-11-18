import 'dotenv/config'
import express from 'express'
import { catalystErrorHandler, catalystHandler } from './catalyst'
import cors from 'cors'
import { catalystNodeFetch as cFetch } from '@catalyst-monitor/core'

const app = express()
const port = 3000

app.use(catalystHandler, cors())

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

app.get('/parent/:parentId', async (req, res) => {
  const { parentId } = req.params

  if (parentId == 'a') {
    console.log('Parent is "a"!')
  }

  const resp = await cFetch(`http://localhost:${port}/child/${parentId}`)
  if (!resp.ok) {
    res.sendStatus(500)
    return
  }

  const childText = await resp.text()
  res.send(`Got child text: ${childText}`)
})

app.get('/child/:childId', (req, res) => {
  const { childId } = req.params

  if (childId == 'bad-child') {
    throw new Error('We got a bad child')
  }

  res.send(`Hello from child: ${childId}!`)
})

let counter = 0

app.post('/counter', (req, res) => {
  counter++

  if (counter % 5 == 0) {
    throw new Error('Counter is a multiple of 5!')
  }

  res.send(`Got count: ${counter}`)
})

app.use(catalystErrorHandler)

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
