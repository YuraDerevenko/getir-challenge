import { MongoClient } from 'mongodb'
import { logger } from '@/utils'
import { common } from 'config'

const { MONGO_URI, DB_NAME } = common

class Client {
  client: MongoClient
  uri: string = MONGO_URI
  defaultDbName: string = DB_NAME

  public async init (): Promise<void> {
    // added "useUnifiedTopology" option regarding to DeprecationWarning
    const options = { useUnifiedTopology: true, loggerLevel: 'info' }

    this.client = await MongoClient.connect(this.uri, options)
    logger.info('Connected to database')
  }

  public getConnection () {
    return this.client
  }

  public getDb (dbName: string = this.defaultDbName) {
    return this.client.db(dbName)
  }

  public async close (): Promise<void> {
    if (!this.client) await this.client.close()
  }
}

export const MongoDb = new Client()


