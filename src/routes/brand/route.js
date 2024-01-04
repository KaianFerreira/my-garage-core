import express from 'express'
import Joi from 'joi'
import { getAll, create } from './model'

const router = express.Router()

router.get('/', async (req, res) => {
	try {
		console.log('GET /brand')

		const brands = await getAll()
		return res.json(brands)
	} catch (error) {
		return res.status(400).send({ error: 'internal error' })
	}
})

router.post('/', async (req, res) => {
	try {
		console.log('POST /brand')

		const schema = Joi.object({
			name: Joi.string()
		})

		const { value, error } = schema.validate(req.body)

		if (error) {
			console.log(error)
			return res.status(400).json({ error: 'Validation error', fields: [...error.details.map(detail => detail.path[0])] })
		}

		const brand = await create(value.name)

		return res.status(201).json(brand)

	} catch (error) {
		console.log(error)
		return res.status(400).json({ error: 'internal error' })	
	}
})

export default router