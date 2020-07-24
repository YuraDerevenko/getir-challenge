import { MongoDb } from '../../database'

interface IGetAllFilter {
  startDate: Date;
  endDate: Date;
  minCount: number;
  maxCount: number;
}

export default class RecordService {
  private collectionName: string = 'records'
  private dbClient = MongoDb

  public async getRecords (filterData: IGetAllFilter) {
    const { startDate, endDate, minCount, maxCount } = filterData

    const db = this.dbClient.getDb()

    const query = [
      {
        '$project': {
          '_id': 0,
          'key': '$key',
          'createdAt': '$createdAt',
          'totalCount': {
            '$sum': '$counts'
          }
        }
      }, {
        '$match': {
          'createdAt': {
            '$gte': startDate,
            '$lte': endDate
          },
          'totalCount': {
            '$gte': minCount,
            '$lte': maxCount
          }
        }
      }
    ]

    const records = await db.collection(this.collectionName).aggregate(query).toArray()

    return records
  }
}
