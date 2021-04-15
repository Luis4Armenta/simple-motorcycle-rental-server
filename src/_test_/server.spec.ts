/* eslint-disable @typescript-eslint/no-floating-promises */
import request from 'supertest'
import { Server as IServer } from 'node:http'
import { httpServer as myServer } from '../server'

describe('loading express', () => {
  let server: IServer
  beforeEach(() => {
    server = myServer
  })
  afterEach(() => {
    server.close()
  })
  it('responds to /', function testSlash (done) {
    request(server)
      .get('/')
      .expect(200, done)
  })
  it('404 everything else', function testPath (done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done)
  })
})
