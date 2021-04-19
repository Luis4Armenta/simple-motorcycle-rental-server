/* eslint-disable @typescript-eslint/no-floating-promises */
// import mongoose, { Document } from 'mongoose'
// import { User } from '../../models/userModel'
import mongoose, { Model, model, Schema, Document } from 'mongoose'
import { MongodbUserRepository } from '../../repositories/implementations/MongodbUserRepository'
import { ICreateUserRequestDTO } from '../../useCases/createUser/createUserDTO'

const mongodbUserRepository = new MongodbUserRepository()

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  motorcycle: {
    hasMotorcycle: { type: Boolean, default: false },
    motorcycleNumber: { type: Number, default: 0, max: 24 }
  }
})

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
let User: Model<IUser>
try {
  User = model('User', userSchema)
} catch (error) {
  User = mongoose.model('User')
}

describe('MongoDB User Repository', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/motos', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  afterEach(async () => {
    await User.deleteMany({})
  })

  describe('Register', () => {
    it('good register', async () => {
      const userData: ICreateUserRequestDTO = {
        name: 'john',
        email: 'example@email.com',
        password: 'password'
      }

      const res = await mongodbUserRepository.register(userData)
      expect(res).toBeTruthy()
    })

    it('register empty', async () => {
      const userData: ICreateUserRequestDTO = {
        name: '',
        email: '',
        password: ''
      }

      const res = await mongodbUserRepository.register(userData)
      expect(res).toBeFalsy()
    })

    it('register without name', async () => {
      const userData: ICreateUserRequestDTO = {
        name: '',
        email: 'example@email.com',
        password: 'password'
      }
      const res = await mongodbUserRepository.register(userData)
      expect(res).toBeFalsy()
    })

    it('register without email', async () => {
      const userData: ICreateUserRequestDTO = {
        name: 'john',
        email: '',
        password: 'password'
      }

      const res = await mongodbUserRepository.register(userData)
      expect(res).toBeFalsy()
    })

    it('register without password', async () => {
      const userData: ICreateUserRequestDTO = {
        name: 'john',
        email: 'example@email.com',
        password: ''
      }

      const res = await mongodbUserRepository.register(userData)
      expect(res).toBeFalsy()
    })
  })

  describe('login', () => {
    beforeEach(async () => {
      const mock = new User({
        name: 'john',
        email: 'example@email.com',
        password: 'password'
      })
      mock.save()
    })
    afterEach(async () => {
      await User.deleteMany({})
    })

    it('without email', async () => {
      const user = await mongodbUserRepository.login('')
      expect(user).toBeNull()
    })

    it('with email', async () => {
      const user = await mongodbUserRepository.login('example@email.com')
      expect(user).toBeNull()
    })
  })

  describe('hasMotorcycle', () => {
    afterEach(async () => {
      await User.deleteMany({})
    })

    it('if have', async () => {
      const user = await new User({
        name: 'john',
        email: 'example@email.com',
        password: 'password',
        motorcycle: {
          hasMotorcycle: true
        }
      }).save()
      const hasMotorcycle = await mongodbUserRepository.hasMotorcycle(user._id)
      expect(hasMotorcycle).toBeTruthy()
    })
    it('if dont have', async () => {
      const user = await new User({
        name: 'john',
        email: 'example@email.com',
        password: 'password',
        motorcycle: {
          hasMotorcycle: false
        }
      }).save()
      const hasMotorcycle = await mongodbUserRepository.hasMotorcycle(user._id)
      expect(hasMotorcycle).toBeFalsy()
    })
  })

  describe('getMotorcycleNUmber', () => {
    afterEach(async () => {
      await User.deleteMany({})
    })

    it('if have motorcycle', async () => {
      const user = await new User({
        name: 'john',
        email: 'example@email.com',
        password: 'password',
        motorcycle: {
          hasMotorcycle: true,
          motorcycleNumber: 5
        }
      }).save()

      const motorcycleNumber = await mongodbUserRepository.getMotorcycleNumber(user._id)
      expect(motorcycleNumber).toBe(5)
    })

    it('if dont have motorcycle', async () => {
      const user = await new User({
        name: 'john',
        email: 'example@email.com',
        password: 'password',
        motorcycle: {
          hasMotorcycle: false,
          motorcycleNumber: 0
        }
      }).save()

      const motorcycleNumber = await mongodbUserRepository.getMotorcycleNumber(user._id)
      expect(motorcycleNumber).toBe(0)
    })
  })

  describe('returnMotorcycle', () => {
    afterEach(async () => {
      await User.deleteMany({})
    })

    it('if have', async () => {
      const user = await new User({
        name: 'john',
        email: 'example@email.com',
        password: 'password',
        motorcycle: {
          hasMotorcycle: true,
          motorcycleNumber: 5
        }
      }).save()

      const success = await mongodbUserRepository.returnMotorcycle(user._id)
      expect(success).toBeTruthy()

      await User.findById(user._id)
        .then(user => {
          if (user !== null) {
            expect(user.motorcycle.hasMotorcycle).toBeFalsy()
            expect(user.motorcycle.motorcycleNumber).toBe(0)
          }
        })
    })

    it('if dont have', async () => {
      const user = await new User({
        name: 'john',
        email: 'example@email.com',
        password: 'password',
        motorcycle: {
          hasMotorcycle: false,
          motorcycleNumber: 0
        }
      }).save()

      const success = await mongodbUserRepository.returnMotorcycle(user._id)
      expect(success).toBeFalsy()
      await User.findById(user._id)
        .then(user => {
          if (user !== null) {
            expect(user.motorcycle.hasMotorcycle).toBeFalsy()
            expect(user.motorcycle.motorcycleNumber).toBe(0)
          }
        })
    })
  })

  describe('takeMotorcycle', () => {
    afterEach(async () => {
      await User.deleteMany({})
    })

    it('without', async () => {
      const user = await new User({
        name: 'john',
        email: 'example@email.com',
        password: 'password',
        motorcycle: {
          hasMotorcycle: false,
          motorcycleNumber: 0
        }
      }).save()

      const takeIt = await mongodbUserRepository.takeMotorcycle(user._id, 5)
      expect(takeIt).toBeTruthy()

      await User.findById(user._id)
        .then(user => {
          if (user !== null) {
            expect(user.motorcycle.hasMotorcycle).toBeTruthy()
            expect(user.motorcycle.motorcycleNumber).toBe(5)
          }
        })
    })

    it('with', async () => {
      const user = await new User({
        name: 'john',
        email: 'example@email.com',
        password: 'password',
        motorcycle: {
          hasMotorcycle: true,
          motorcycleNumber: 9
        }
      }).save()

      const takeIt = await mongodbUserRepository.takeMotorcycle(user._id, 5)
      expect(takeIt).toBeFalsy()

      await User.findById(user._id)
        .then(user => {
          if (user !== null) {
            expect(user.motorcycle.hasMotorcycle).toBeTruthy()
            expect(user.motorcycle.motorcycleNumber).toBe(9)
          }
        })
    })
  })
})

interface IUser extends Document {
  name: string
  email: string
  password: string
  motorcycle: {
    hasMotorcycle: boolean
    motorcycleNumber: number
  }
}
