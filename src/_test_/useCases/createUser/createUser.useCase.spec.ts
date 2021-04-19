import { CreateUserUseCase } from '../../../useCases/createUser/createUser.useCase'
import { encryptor } from '../utils/encryptor.mocks'
import { userRepository } from '../utils/user.mocks'

const useCase = new CreateUserUseCase(userRepository, encryptor)

describe('execute', () => {
  it('was created', async () => {
    const created = await useCase.execute({ email: 'example@email.com', name: 'John', password: 'password' })

    expect(created).toBeTruthy()
  })
  it('was not created', async () => {
    const created = await useCase.execute({ email: '', name: '', password: '' })

    expect(created).toBeFalsy()
  })
})
