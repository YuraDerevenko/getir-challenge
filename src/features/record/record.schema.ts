import { ObjectSchema, object, date, number, ref } from '@hapi/joi'

export const getAllSchema: ObjectSchema = object().keys({
  body: object().keys({
    startDate: date().required(),
    endDate: date().min(ref('startDate')).required(),
    maxCount: number().positive().required(),
    minCount: number().positive().required()
  })
})
