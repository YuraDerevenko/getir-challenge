import { Router } from 'express'
import RecordRouterV1 from '../features/record/record.router.v1'

class RouterV1 {
  public router: Router

  constructor () {
    this.router = Router()
    this.init()
  }

  private init (): void {
    this.router.use('/record', RecordRouterV1)
  }
}

export default new RouterV1().router
