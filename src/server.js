import express from 'express'
import cors from 'cors'
import { connectionTest } from './config/mongoose'

const app = express()
const router = express.Router()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// routes imported
import brand from './routes/brand/route'
import car from './routes/car/route'

router.get('/ping', (req, res) => {
	return res.send('pong')
})

router.use('/car', car)
router.use('/brand', brand)

const port = process.env.PORT || 3000

app.use('/', router)

app.listen(port, async () => { 
	console.log(`Server listening on port ${ port }\n`)
	console.log('Testing DB connection')
	await connectionTest()
})
