import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'

import upgrades from '../upgrades'
import { Upgrade } from '../models/upgrade'
import {
	connect as connectMongo,
	disconnect as disconnectMongo
} from '../config/mongoose'

// given command
const command = process.argv[2]

async function startUpgrade() {
	console.log('Connectig to database')
	await connectMongo()
	console.log('Connection completed successfully \n')
	
	// checking if upgrade collection exists
	const collections = await mongoose.connection.db.listCollections().toArray()
	const upgradeCollectionExists = collections.some(collection => collection.name === 'upgrades')
	
	if (!upgradeCollectionExists) {
		await Upgrade.createCollection()
	}
	
	const appliedUpgrades = (await Upgrade.find()).map(upgrade => upgrade.name)
	
	const upgradeList = Object.keys(upgrades).filter(upgrade => {
		if (appliedUpgrades.includes(upgrade)) return false
		else return true
	})
	
	if (upgradeList.length === 0) {
		console.log('Nothing to upgrade')
	} else {
		for (const currentUpgrade of upgradeList) {
			await runUpgrade(currentUpgrade)
		}
		console.log('\nUpgrade completed')
	}
	
	console.log('Disconnecting from database')
	await disconnectMongo()
	process.exit()
}

async function runUpgrade(upgradeName) {
	const mongoConnectionState = mongoose.connection.readyState

	const executeUpgrade = async () => {
		console.log(`Running upgrade: ${upgradeName}`)
		await upgrades[upgradeName].default()
		
		// saving upgrade or updating upgrade
		const upgradeAlreadyExists = await Upgrade.findOne({ name: upgradeName })
		
		if (!upgradeAlreadyExists) {
			await new Upgrade({ name: upgradeName }).save()
		} else {
			upgradeAlreadyExists.dateApplied = new Date()
			await upgradeAlreadyExists.save()
		}
	}

	if (!mongoConnectionState) {
		await connectMongo()
		await executeUpgrade()
		await disconnectMongo()
	} else {
		await executeUpgrade()
	}
}

function createNewMigrationFile() {

	const givenName = process.argv[3]

	const now = new Date()
	const year = now.getFullYear()
	const month = (now.getMonth() + 1).toString().padStart(2, '0')
	const day = now.getDate().toString().padStart(2, '0')
	const hours = now.getHours().toString().padStart(2, '0')
	const minutes = now.getMinutes().toString().padStart(2, '0')

	const migrationName = `${year}${month}${day}${hours}${minutes}_${givenName}.js`

	const filePath = path.join('./src/upgrades', migrationName)

	fs.writeFileSync(filePath, 'export default async function () {\r\r}\r')
	console.log(`File ${migrationName} created successfully`)
}

const commands = {
	start: startUpgrade,
	new: createNewMigrationFile,
	run: runUpgrade
}

commands[command](process.argv[3] || null)
