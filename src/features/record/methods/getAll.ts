import { Response, Request, NextFunction } from 'express'
import { successResponse } from '@/utils'
import RecordService from '@/features/record/record.service'


export default async (req: Request, res: Response, next: NextFunction) => {
  const service = new RecordService()
  const { body: filterParams } = res.locals

  const records = await service.getRecords(filterParams)
  return successResponse(res, { records })
}
