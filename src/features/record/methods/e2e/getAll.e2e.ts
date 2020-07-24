import { expect } from 'chai'

import { CODES, DEFAULT_MESSAGES } from '../../../../constants'

describe('POST api/v1/record', () => {
  let sampleQuery: { [key: string]: string | number }
  before(async () => {
    sampleQuery = {
      startDate: '2016-01-26',
      endDate: '2018-02-02',
      minCount: 2700,
      maxCount: 3000
    }
  })

  it('should successfully return data with sample query', async function () {
    const { body } = await this.agent
      .post('/api/v1/record')
      .send(sampleQuery)
      .expect(200)

    expect(body).to.be.an('Object')
    expect(body).to.have.all.keys('code', 'msg', 'records')

    const { code, msg, records } = body
    expect(code).to.be.a('number').eql(CODES.SUCCESS)
    expect(msg).to.be.a('string').eql(DEFAULT_MESSAGES[CODES.SUCCESS])
    expect(records).to.be.an('array').that.is.not.empty

    const [sampleRecord] = records

    expect(sampleRecord).to.be.an('Object')
    expect(sampleRecord).to.have.all.keys('key', 'createdAt', 'totalCount')
  })

  it('should fails when body is empty', async function () {
    const { body } = await this.agent
      .post('/api/v1/record')
      .send({})
      .expect(400)

    expect(body).to.be.an('Object')
    expect(body).to.have.all.keys('code', 'msg')

    const { code, msg } = body
    expect(code).to.be.a('number').eql(CODES.BAD_REQUEST)
    expect(msg).to.be.a('string').to.match(/is required$/)
  })

  it('should fails when at least one of the fields in query is missing', async function () {
    const { startDate, wrongQuery } = sampleQuery
    const { body } = await this.agent
      .post('/api/v1/record')
      .send(wrongQuery)
      .expect(400)

    expect(body).to.be.an('Object')
    expect(body).to.have.all.keys('code', 'msg')

    const { code, msg } = body
    expect(code).to.be.a('number').eql(CODES.BAD_REQUEST)
    expect(msg).to.be.a('string').to.match(/"body.startDate" is required$/)
  })

  it('should fails when counts in a query are not valid numbers', async function () {
    const { body } = await this.agent
      .post('/api/v1/record')
      .send({ ...sampleQuery, minCount: -1 })
      .expect(400)

    expect(body).to.be.an('Object')
    expect(body).to.have.all.keys('code', 'msg')

    const { code, msg } = body
    expect(code).to.be.a('number').eql(CODES.BAD_REQUEST)
    expect(msg).to.be.a('string').to.match(/"body.minCount" must be a positive number$/)
  })
})
