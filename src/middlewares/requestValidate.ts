import { Response, Request, NextFunction } from 'express'

import { Schema } from '@hapi/joi'
import { CODES } from '@/constants'

export const requestValidate = (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const options = {
      stripUnknown: {
        arrays: false,
        objects: true
      },
      convert: true,
      abortEarly: true
    }
    const data: any = await schema.validateAsync(req, options)
    res.locals = Object.assign({}, res.locals, data)
    return next()
  } catch (err) {
    err.message = err.details[0].message
    err.statusCode = 400
    err.code = CODES.BAD_REQUEST

    return next(err)
  }
}
