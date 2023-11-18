import { ErrorRequestHandler, RequestHandler } from 'express'
import {
  CatalystServer,
  createCatalystContext,
  ServerRequestContext,
  SESSION_ID_HEADER,
  PAGE_VIEW_ID_HEADER,
  PARENT_FETCH_ID_HEADER,
  installNodeBase,
} from '@catalyst-monitor/core'
import crypto from 'crypto'

installNodeBase({
  privateKey: process.env.CATALYST_PRIVATE_KEY ?? '',
  systemName: 'catalyst-js-express-example',
  version: process.env.CATALYST_VERSION ?? '',
})

export const catalystErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  next
) => {
  console.error(err)
  if (res.headersSent) {
    return next(err)
  }
  res.sendStatus(500)
}

export const catalystHandler: RequestHandler = (req, res, next) => {
  const start = new Date()

  const sessionId = req.headers[SESSION_ID_HEADER.toLowerCase()]
  const pageViewId = req.headers[PAGE_VIEW_ID_HEADER.toLowerCase()]
  const parentFetchId = req.headers[PARENT_FETCH_ID_HEADER.toLowerCase()]

  const context: ServerRequestContext = {
    fetchId: crypto.randomUUID(),
    sessionId: getHeader(sessionId) ?? crypto.randomUUID(),
    pageViewId: getHeader(pageViewId),
    parentFetchId: getHeader(parentFetchId),
  }
  createCatalystContext(context, () => {
    try {
      res.on('finish', () => {
        CatalystServer.get().recordFetch(
          req.method,
          req.route?.path ?? 'Unknown',
          req.params ?? {},
          res.statusCode,
          {
            seconds: (new Date().getTime() - start.getTime()) / 1000,
            nanos: 0,
          },
          context
        )
      })
      next()
    } catch (e) {
      CatalystServer.get().recordLog('error', e, {}, context)
      throw e
    }
  })
}

function getHeader(val: string | string[] | undefined): string | undefined {
  if (Array.isArray(val) && val.length > 0) {
    return val[0]
  } else if (typeof val == 'string') {
    return val
  }
}
