import mongoose from 'mongoose'
import { upgradeSchema } from '../schemas/upgrade'

export const Upgrade = mongoose.model('Upgrade', upgradeSchema)