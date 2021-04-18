import { BcryptEncryptor } from '../providers/implementations/BcryptEncryptor'

describe('Encryptor', () => {
  const encryper = new BcryptEncryptor()

  test('An encrypted text should give true if it is compared with an equal one', () => {
    const sut = encryper.encrypt('hello')
    expect(encryper.compare('hello', sut)).toBeTruthy()
  }
  )
})
