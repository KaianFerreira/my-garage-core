import { Car } from '../models/car'

export default async function () {
	await Car.createCollection()
}