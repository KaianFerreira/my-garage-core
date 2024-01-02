import mongoose from 'mongoose'
import {	car as carSchemas } from '../schemas/car'

export const Car = mongoose.model('Car', carSchemas)