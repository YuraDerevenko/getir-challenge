import { INTERNAL_SERVER_ERROR } from 'http-status'
import { Response, Request, NextFunction } from 'express'
import { logger, responseSender } from '../utils'
import { CODES, DEFAULT_MESSAGES } from '../constants'

const { NODE_ENV } = process.env

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err)
  const defaultErrorMessage = DEFAULT_MESSAGES[CODES.SERVER_ERROR]
  let {
    statusCode = INTERNAL_SERVER_ERROR,
    message: msg = defaultErrorMessage,
    code = CODES.SERVER_ERROR
  } = err as any

  if (
    statusCode === INTERNAL_SERVER_ERROR &&
    NODE_ENV === 'production'
  ) {
    msg = defaultErrorMessage
  }

  return responseSender(res, { code, msg }, statusCode)
}
