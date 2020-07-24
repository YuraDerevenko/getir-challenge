import express from 'express'

import * as bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

import ApiRouter from '@/router'
import { notFoundHandler, errorHandler } from '@/middlewares'

import { common } from 'config'

class App {
  public app: express.Express

  constructor () {
    this.app = express()
    this.mountMiddlewares()
    this.mountRoutes()
    this.mountErrorHandlers()
  }

  private mountMiddlewares (): void {
    // mount global middlewares
    this.app.set('etag', false)
    this.app.use(cors())
    this.app.use(morgan('dev', {
      skip: req => common.NODE_ENV === 'test' || req.url === '/'
    }))
    this.app.use(helmet())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({
      extended: true
    }))
  }
  private mountRoutes (): void {
    this.app.use('/', ApiRouter)
  }
  private mountErrorHandlers (): void {
    this.app.use(notFoundHandler)
    this.app.use(errorHandler)
  }
}

export default new App().app
