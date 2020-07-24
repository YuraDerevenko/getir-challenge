import * as sinon from 'sinon'
import * as request from 'supertest'

import app from '../app'
import { MongoDb } from '../database'


before('create server', function () {
  this.agent = request.agent(app)
})

before('initialize database connection', async function () {
  await MongoDb.init()
})

beforeEach(function () {
  this.sandbox = sinon.createSandbox()
})

afterEach(function () {
  this.sandbox.restore()
})

before('close database connection', async function () {
  await MongoDb.close()
})
