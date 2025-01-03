const mongoose = require('mongoose')

const projectExpenseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  costTypeId: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tasks: {
    type: Array,
    default: [],
  },
  amount: {
    type: Number,
    required: false,
  },
  date: {
    type: Number,
  },
  currency: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
  updatedAt: {
    type: Number,
    default: Date.now,
  },
})

const projectExpenseTypesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
  updatedAt: {
    type: Number,
    default: Date.now,
  },
})

const projectExpense = mongoose.model('projectExpenses', projectExpenseSchema)
const projectExpenseType = mongoose.model(
  'projectExpenseTypes',
  projectExpenseTypesSchema,
)

module.exports = {
  projectExpense,
  projectExpenseType,
}
