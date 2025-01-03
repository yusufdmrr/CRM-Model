const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  taskNo: { type: String, required: true },
  taskName: { type: String, required: true },
  taskGroupId: { type: String, required: true },
  count: { type: Number, required: true },
  completionCount: { type: Number, default: 0 },
  brand: { type: String, required: false },
  unitMaterialPrice: { type: Number, required: true },
  materialPrice: { type: Number, required: true },
  unitLaborPrice: { type: Number, required: true },
  laborPrice: { type: Number, required: true },
  totalUnitPrice: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  deservedAmount: { type: Number, default: 0 },
  projectName: { type: String, required: false },
  mainTaskName: { type: String, required: false },
  details: { type: [String], default: [] },
  children: { type: [Object], default: [] },
  actions: { type: [Object], default: [] },
})

const Task = mongoose.model('Task', taskSchema)

module.exports = { Task }
