import * as sinon from 'sinon'

beforeEach('create sandbox', function () {
  this.sandbox = sinon.createSandbox()
})

afterEach('remove sandbox', function () {
  this.sandbox.restore()
})
