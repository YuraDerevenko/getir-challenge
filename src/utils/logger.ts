import * as winston from 'winston'
const { combine, timestamp, printf, colorize } = winston.format

const customLevels = {
  colors: {
    trace: 'magenta',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    debug: 'blue',
    info: 'blue',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red'
  }
}
winston.addColors(customLevels.colors)
const myFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`
})

export const logger = winston.createLogger({
  format: combine(
    colorize(),
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.Console({
      silent: process.env.NODE_ENV === 'test'
    })
  ]
})

logger.on('error', err => console.log('Logger error', err))
