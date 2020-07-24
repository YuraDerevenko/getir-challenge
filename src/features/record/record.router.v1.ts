import { Router, RequestHandler } from 'express'

import { requestValidate } from '@/middlewares'
import { getAllSchema } from '@/features/record/record.schema'

import { getAllHandler } from '@/features/record/methods'

class RecordRouterV1 {
  public router: Router

  constructor () {
    this.router = Router()
    this.init()
  }

  private init () {
    this.router.post('/', this.getAllMiddlewares)

  }

  get getAllMiddlewares (): RequestHandler[] {
    return [requestValidate(getAllSchema), getAllHandler]
  }

}

export default new RecordRouterV1().router
