import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../../middlewares/auth.middleware'

describe('auth middleware', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  const nextFunction: NextFunction = jest.fn()

  beforeEach(() => {
    mockRequest = {}
    mockResponse = {
      send: jest.fn()
    }
  })

  test('without headers', async () => {
    const expectedResponse = 'deauthenticate request'

    verifyToken(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.send).toBeCalledWith(expectedResponse)
  })

  test('without "authorization" header', async () => {
    const expectedResponse = 'deauthenticate request'
    mockRequest = {
      headers: { }
    }

    verifyToken(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.send).toBeCalledWith(expectedResponse)
  })

  test('with "authorization" header', () => {
    mockRequest = {
      headers: {
        authorization: 'beader eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiYyJ9.RftXrho57jXXDAMaEH4mRsOssSpqLG8VgYE_WtOz5BM'
      }
    }

    verifyToken(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(nextFunction).toBeCalledTimes(1)
  })
})
