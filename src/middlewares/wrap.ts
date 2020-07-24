import { Func } from "mocha";

import { Response, Request, NextFunction } from 'express'

export const wrap = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next)
