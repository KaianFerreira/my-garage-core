import mongoose from 'mongoose'

const { Types } = mongoose.Schema

export const brand = new mongoose.Schema({
	name: Types.String,
}, { collection: false })

export const car = new mongoose.Schema({
	brand: { type: Types.ObjectId, ref: 'Brand' },
	model: Types.String,
	color: Types.String,
	year: Types.Number,
	specs: Types.String
}, { collection: false })