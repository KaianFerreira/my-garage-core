import { Car } from '../../models/car'
import { connect, disconnect } from '../../config/mongoose'


export const getAll = async () => {
	await connect()

	const cars = await Car.find({}, { __v: 0 }).populate({
		path: 'brand',
		select: 'name _id',
		options: { lean: true }
	})

	await disconnect()
	return cars
}

export const create = async (brand, model, color, specs) => {
	await connect()

	const newCar = new Car({
		brand,
		model,
		color,
		specs
	})

	await newCar.save()

	await disconnect()

}