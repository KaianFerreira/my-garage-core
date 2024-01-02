import mongoose from 'mongoose'
import { brand as brandSchemas } from '../schemas/car'

export const Brand = mongoose.model('Brand', brandSchemas)
