import mongoose from 'mongoose'

// ensure to use { collection: false } to not create automatically collections while creating models
export const upgradeSchema = new mongoose.Schema({
	name: String,
	dateApplied: {
		type: Date,
		default: Date.now
	}
}, { collection: false })
