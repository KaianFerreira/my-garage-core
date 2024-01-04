import { Brand } from '../../models/brand'
import { connect, disconnect } from '../../config/mongoose'


export const getAll = async () => {
	await connect()

	const products = await Brand.find({}, { __v: 0 })

	await disconnect()
	return products
}

export const create = async (name) => {
	await connect()

	const product = new Brand({ name })
	await product.save()

	await disconnect()

}