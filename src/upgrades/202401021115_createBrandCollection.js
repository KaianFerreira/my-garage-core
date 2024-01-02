import { Brand } from '../models/brand'

export default async function () {
	await Brand.createCollection()
}