/**
 * This example shows how to properly initialize Catalyst for Express.
 *
 * There are 4 steps:
 *
 * 1. Install Catalyst, as soon as possible.
 * 2. Install the Catalyst middleware first.
 * 3. Install the Catalyst error handler middleware last.
 * 4. Replace calls to `fetch` with the provided `catalystNodefetch` function.
 */

import 'dotenv/config'
import express from 'express'
import {
  catalystErrorHandler,
  catalystHandler,
} from '@catalyst-monitor/express'
import cors from 'cors'
import {
  catalystNodeFetch as cFetch,
  installNodeBase,
} from '@catalyst-monitor/core/node'

// Initialize Catalyst ASAP.
const sdf = installNodeBase({
  privateKey: process.env.CATALYST_PRIVATE_KEY ?? '',
  systemName: 'catalyst-js-express-example',
  version: process.env.CATALYST_VERSION ?? '',
})

const app = express()
const port = 3000

// Use the Catalyst middleware to properly propagate sessions.
app.use(catalystHandler)

app.use(cors())

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

  // Use the provided Catalyst fetch function, to propagate sessions.
  // The interface is the same as the regular fetch function.
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

// Use the Catalyst error handler to send all errors to Catalyst.
// IMPORTANT: Note the order of installation. The error handler should be
// the last middleware installed, to properly catch all errors.
app.use(catalystErrorHandler)

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
