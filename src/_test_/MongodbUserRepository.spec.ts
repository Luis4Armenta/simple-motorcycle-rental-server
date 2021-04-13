import { BcryptEncryptor } from '../providers/implementations/BcryptEncryptor'
import { JsonWebToken } from '../providers/implementations/JsonWebToken'
import { MongodbUserRepository } from '../repositories/implementations/MongodbUserRepository'

describe('mongodb user respository - register method', () => {
  const random = Math.random() * 1000
  const newEmail = random.toString() + '@email.com'
  const newName = random.toString()

  const sut = new MongodbUserRepository(new BcryptEncryptor(), new JsonWebToken())
  it('register method resolve', async () => {
    expect.assertions(1)
    return await expect(sut.register({ name: newName, email: newEmail, password: 'password' })).resolves.toBeTruthy()
  })
  it('register method reject', async () => {
    // expect.assertions(1)
    try {
      await sut.register({ name: 'example', email: 'example@email.com', password: 'password' })
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })
})

// describe('mongodb user respository - login method', () => {
//   test('login method', () => {
//     expect(sut.login('example@email.com', 'password')).toBeTruthy()
//   })
// })

// describe('mongodb user repository - hasMotorcycle method', () => {
//   test('hasMotorcycle', () => {
//     expect(sut.hasMotorcycle()).toBeTruthy()
//   })
// })
