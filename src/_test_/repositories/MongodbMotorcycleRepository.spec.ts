/* eslint-disable @typescript-eslint/no-misused-promises */
import mongoose, { Model, model, Schema, Document } from 'mongoose'
import { MongodbMotorcycleRepository } from '../../repositories/implementations/MongodbMotorcycleRepository'

const mongodbMotorcycleRepository = new MongodbMotorcycleRepository()

const motorcycleSchema = new Schema({
  scheduleNumber: { type: Number, max: 24, min: 0, unique: true },
  quantity: { type: Number, default: 8 },
  available: { type: Number, default: 8 }
})

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
let Motorcycle: Model<IMotorcycle>
try {
  Motorcycle = model('Motorcycle', motorcycleSchema)
} catch (error) {
  Motorcycle = mongoose.model('Motorcycle')
}

describe('MongoDB Motorcycle Repository', () => {
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
    await Motorcycle.deleteMany({})
  })

  describe('getAllMotorcycles', () => {
    afterEach(async () => {
      await Motorcycle.deleteMany({})
    })
    it('get a array', async () => {
      const array = await mongodbMotorcycleRepository.getAllMotorcycles()
      expect(array.length).toBe(0)
    })
    it('get a array of 2 elements', async () => {
      await new Motorcycle({
        scheduleNumber: 1,
        quantity: 8,
        available: 8
      }).save()
      await new Motorcycle({
        scheduleNumber: 2,
        quantity: 8,
        available: 8
      }).save()

      const array = await mongodbMotorcycleRepository.getAllMotorcycles()
      expect(array.length).toBe(2)
    })
  })

  describe('getQuantityMotorcycles', () => {
    it('quantity', async () => {
      await new Motorcycle({
        scheduleNumber: 1,
        quantity: 8,
        available: 8
      }).save()

      const quantity = await mongodbMotorcycleRepository.getQuantityMotorcycles(1)
      expect(quantity).toBe(8)
    })
  })

  describe('getAvailableMotorcycles', () => {
    it('getAvailableMotorcycles', async () => {
      await new Motorcycle({
        scheduleNumber: 1,
        quantity: 8,
        available: 8
      }).save()

      const quantity = await mongodbMotorcycleRepository.getAvailableMotorcycles(1)
      expect(quantity).toBe(8)
    })
  })

  describe('reduceAvailability', () => {
    it('with 8 available', async () => {
      const motorcycle = await new Motorcycle({
        scheduleNumber: 1,
        quantity: 8,
        available: 8
      }).save()

      const quantity = await mongodbMotorcycleRepository.reduceAvailability(1)
      expect(quantity).toBeTruthy()

      await Motorcycle.findById(motorcycle._id)
        .then(motorcycleRes => {
          if (motorcycleRes !== null) {
            expect(motorcycleRes.available).toBe(motorcycle.available - 1)
          }
        })
    })

    it('with 0 available', async () => {
      const motorcycle = await new Motorcycle({
        scheduleNumber: 1,
        quantity: 8,
        available: 0
      }).save()

      const quantity = await mongodbMotorcycleRepository.reduceAvailability(1)
      expect(quantity).toBeFalsy()

      await Motorcycle.findById(motorcycle._id)
        .then(motorcycleRes => {
          if (motorcycleRes !== null) {
            expect(motorcycleRes.available).toBe(motorcycle.available)
          }
        })
    })
  })

  describe('increaseAvailability', () => {
    it('with 8 available', async () => {
      const motorcycle = await new Motorcycle({
        scheduleNumber: 1,
        quantity: 8,
        available: 8
      }).save()

      const quantity = await mongodbMotorcycleRepository.increaseAvailability(1)
      expect(quantity).toBeFalsy()

      await Motorcycle.findById(motorcycle._id)
        .then(motorcycleRes => {
          if (motorcycleRes !== null) {
            expect(motorcycleRes.available).toBe(8)
          }
        })
    })

    it('with 0 available', async () => {
      const motorcycle = await new Motorcycle({
        scheduleNumber: 1,
        quantity: 8,
        available: 0
      }).save()

      const quantity = await mongodbMotorcycleRepository.increaseAvailability(1)
      expect(quantity).toBeTruthy()

      await Motorcycle.findById(motorcycle._id)
        .then(motorcycleRes => {
          if (motorcycleRes !== null) {
            expect(motorcycleRes.available).toBe(motorcycle.available + 1)
          }
        })
    })
  })
})

export interface IMotorcycle extends Document {
  scheduleNumber: number
  quantity: number
  available: number
}
