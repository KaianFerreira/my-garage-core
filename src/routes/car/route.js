import express from 'express'
import Joi from 'joi'
import { getAll, create } from './model'

const router = express.Router()

router.get('/', async (req, res) => {
	try {
		console.log('GET /car')

		const cars = await getAll()

		return res.json(cars)
	} catch (error) {
		console.log(error)
		return res.status(400).send({ error: 'internal error' })
	}
})

router.post('/', async (req, res) => {
	try {
		console.log('POST /car')

		const schema = Joi.object({
			brand: Joi.string().required(),
			model: Joi.string().required(),
			color: Joi.string().required(),
			specs: Joi.string().required()
		})

		const { value, error } = schema.validate(req.body)

		if (error) {
			console.log(error)
			return res.status(400).json({
				error: 'Validation error',
				fields: [...error.details.map(detail => detail.path[0])]
			})
		}

		const car = await create(
			value.brand,
			value.model,
			value.color,
			value.specs
		)

		return res.status(201).json(car)
	} catch (error) {
		console.log(error)
		return res.status(400).send({ error: 'internal error' })
	}
})

export default router