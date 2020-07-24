import { OK } from 'http-status'
import { Response } from 'express'

import { CODES, DEFAULT_MESSAGES } from '@/constants'

export const responseSender = (res: Response, payload: {}, statusCode: number = OK): Response =>
  res.status(statusCode).send(payload)

export const successResponse = (res: Response, payload: {}, statusCode: number = OK): Response =>
  responseSender(res, {
    code: CODES.SUCCESS,
    msg: DEFAULT_MESSAGES[CODES.SUCCESS],
    ...payload
  })
