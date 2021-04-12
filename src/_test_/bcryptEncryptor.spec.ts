import { BcryptEncryptor } from '../providers/implementations/BcryptEncryptor'

describe('Encryptor', () => {
  const encryper = new BcryptEncryptor()

  test('encrypt', () => {
    const sut = encryper.encrypt('hello')
    expect(encryper.compare('hello', sut)).toBeTruthy()
  }
  )
})
