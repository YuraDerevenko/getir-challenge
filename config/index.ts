import * as path from 'path'
import * as dotenv from 'dotenv'

const { PWD: projectDirectory } = process.env

if (!process.env.NODE_ENV) {
  dotenv.config({
    path: path.join(projectDirectory, '.env').normalize()
  })
}
if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: path.join(projectDirectory, '.env.test').normalize()
  })
}
if (process.env.NODE_ENV === 'development') {
  dotenv.config({
    path: path.join(projectDirectory, '.env.development').normalize()
  })
}

export * from './components'
