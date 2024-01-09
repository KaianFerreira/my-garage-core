import { Car } from '../../models/car'

export const getAll = async () => {
	const cars = await Car.find({}, { __v: 0 }).populate({
		path: 'brand',
		select: 'name _id',
		options: { lean: true }
	})

	return cars
}

export const create = async (brand, model, color, specs) => {

	const newCar = new Car({
		brand,
		model,
		color,
		specs
	})

	await newCar.save()
}