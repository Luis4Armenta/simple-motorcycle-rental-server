import { BcryptEncryptor } from '../providers/implementations/BcryptEncryptor'
import { JsonWebToken } from '../providers/implementations/JsonWebToken'
import { MongodbUserRepository } from '../repositories/implementations/MongodbUserRepository'

describe('mongodb user repository', () => {
  const sut = new MongodbUserRepository(new BcryptEncryptor(), new JsonWebToken())
  test('register method', () => {
    expect(sut.register('example', 'example@email.com', 'password')).toBeTruthy()
  })
  test('login method', () => {
    expect(sut.login('example@email.com', 'password')).toBeTruthy()
  })

  // test('hasMotorcycle', () => {
  //   expect(sut.hasMotorcycle()).toBeTruthy()
  // })
})
