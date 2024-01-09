import { Brand } from '../../models/brand'

export const getAll = async () => {
	const products = await Brand.find({}, { __v: 0 })
	return products
}

export const create = async (name) => {
	const product = new Brand({ name })
	await product.save()

}