import { expect } from 'chai'
import { MongoDb } from '../../database'

import RecordService from './record.service'

describe('record.service', () => {
  let sampleQuery
  before(async () => {
    sampleQuery = {
      startDate: new Date('2016-01-26'),
      endDate: new Date('2018-02-02'),
      minCount: 2700,
      maxCount: 3000
    }
  })

  it('should successfully fetch records', async function () {
    const sampleResponse = [{
      createdAt: new Date('2016-01-26'),
      key: 'HmsYvNTB',
      totalCount: 2917
    }]
    const aggregationStub = this.sandbox.stub().returns({
      toArray: async () => sampleResponse
    })
    const dbStub = this.sandbox.stub(MongoDb, 'getDb').returns({
      collection: (collName: string) => {
        expect(collName).eql('records')
        return {
          aggregate: aggregationStub
        }
      }
    })

    const service = new RecordService()

    const query = [
      {
        '$project': {
          _id: 0,
          key: '$key',
          createdAt: '$createdAt',
          totalCount: { '$sum': '$counts' }
        }
      },
      {
        '$match': {
          createdAt: {
            $gte: sampleQuery.startDate,
            $lte: sampleQuery.endDate
          },
          totalCount: {
            $gte: sampleQuery.minCount,
            $lte: sampleQuery.maxCount
          }
        }
      }
    ]
    const records = await service.getRecords(sampleQuery)
    expect(records).to.be.an('array').eqls(sampleResponse)
    aggregationStub.calledOnceWith(query)
  })
})
