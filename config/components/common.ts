import { Schema, object, number, string } from '@hapi/joi'

const validEnvs = ['development', 'production', 'test', 'acceptance', 'staging']

const envVarsSchema: Schema = object({
  PORT: number().default(5000),
  NODE_ENV: string()
    .valid(...validEnvs)
    .required(),
  MONGO_URI: string().required(),
  DB_NAME: string().required()
}).unknown()
  .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
  throw new Error(`Server config validation error: ${error.message}`)
}

export const common = {
  APP_PORT: envVars.PORT,
  NODE_ENV: envVars.NODE_ENV,
  MONGO_URI: envVars.MONGO_URI,
  DB_NAME: envVars.DB_NAME
}
