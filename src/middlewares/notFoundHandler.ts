import { Response, Request, NextFunction } from 'express'
import { NotFound } from 'http-errors'
import { CODES, DEFAULT_MESSAGES } from '../constants'

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const notFound = new NotFound(DEFAULT_MESSAGES[CODES.NOT_FOUND])
  notFound.code = CODES.NOT_FOUND

  return next(notFound)
}
