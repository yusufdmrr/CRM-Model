const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
})

const currencySchema = new mongoose.Schema({
  name: { type: String, required: true },
})

const taxRateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true },
})

const paymentTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
})

const stockActionSchema = new mongoose.Schema({
  actionId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['purchase', 'expense'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastNumber: {
    type: Number,
    default: 0, 
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
})

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  stockActions: { type: [stockActionSchema], default: [] },
  currency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Currency',
    required: true,
  },
  taxRate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaxRate',
    required: true,
  },
  taxIncluded: { type: Boolean, required: true },
  paymentType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentType',
    required: true,
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
})

const Category = mongoose.model('Category', categorySchema)
const Currency = mongoose.model('Currency', currencySchema)
const TaxRate = mongoose.model('TaxRate', taxRateSchema)
const PaymentType = mongoose.model('PaymentType', paymentTypeSchema)
const Product = mongoose.model('Product', productSchema)
const StockAction = mongoose.model('StockAction', stockActionSchema)

module.exports = {
  Category,
  Currency,
  TaxRate,
  PaymentType,
  Product,
  StockAction,
}
