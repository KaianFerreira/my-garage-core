import mongoose from 'mongoose'

const {
	MONGO_HOST,
	MONGO_PORT,
	MONGO_DB_NAME,
	MONGO_USER,
	MONGO_PASS
} = process.env

export async function connect() {
	try {
		await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}`, {
			user: MONGO_USER,
			pass: MONGO_PASS,
			dbName: MONGO_DB_NAME
		})

	} catch (error) {
		console.log('Failed to start connection with MongoDB\n')
	}
}

export async function connectionTest() {
	console.log('Connecting to MongoDB')
	await connect()
	console.log('connection completed successfully\n')
	return true
}

export async function disconnect() {
	mongoose.connection.close()
}