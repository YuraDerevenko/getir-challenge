import { Server } from 'http'
import { AddressInfo } from 'net'
import app from '@/app'

import { MongoDb } from '@/database'
import { logger } from '@/utils'
import { common } from 'config'

const { APP_PORT } = common

async function bootstrap () {
  const listener: Server = app.listen(APP_PORT)

  await MongoDb.init()

  const { address, port } = listener.address() as AddressInfo

  logger.info(`Server listening at http://${address}:${port}`)

  // end function handle proper server shutdown
  const end = async (e: any) => {
    process.stdout.write('\n')

    await MongoDb.close()
    listener.close()
    logger.error(e)
    logger.info('Server stopped')
  }

  // close server correctly in case of critical errors or os signals
  process.once('SIGTERM', end)
  process.once('SIGINT', end)
  process.on('unhandledRejection', end)
  process.on('uncaughtException', end)
}

bootstrap()
