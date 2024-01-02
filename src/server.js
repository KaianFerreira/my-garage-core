import express from 'express'
import { connectionTest } from './config/mongoose'

const app = express()
const router = express.Router()

app.use('/', router)

// routes imported
// import car from './routes/car/route'

router.get('/ping', (req, res) => {
	return res.send('pong')
})

// router.use('/car', car)

const port = process.env.PORT || 3000

app.listen(port, async () => { 
	console.log(`Server listening on port ${ port }\n`)
	console.log('Testing DB connection')
	await connectionTest()
})
