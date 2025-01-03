const mongoose = require('mongoose')
const { Schema, Types } = mongoose

const ProjectSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  isAdvance: { type: Boolean, required: true },
  advance: { type: Number, required: false },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  description: { type: String, required: false },
  percentageCompletion: { type: Number, default: 0, min: 0, max: 100 },
  actions: { type: [String], default: [] },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
})

const Project = mongoose.model('Projects', ProjectSchema)

module.exports = { Project }
