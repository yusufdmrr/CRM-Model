const mongoose = require('mongoose')
const { Schema } = mongoose

const taskGroupSchema = new Schema({
  userId: { type: String, required: true },
  projectId: { type: String, required: true },
  name: { type: String, required: true },
  tasks: { type: Array, default: [] },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
})

const TaskGroup = mongoose.model('taskGroups', taskGroupSchema)

module.exports = { TaskGroup }
