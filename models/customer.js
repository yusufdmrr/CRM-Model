const mongoose = require('mongoose')

const authorizedPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/, // E-posta formatı doğrulaması
  },
})

const customerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyType: {
    type: String,
    required: true,
  },
  taxNumber: {
    type: String,
    required: true,
  },
  taxOffice: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/, // E-posta formatı doğrulaması
  },
  phone: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  workingLanguage: {
    type: String,
    required: true,
  },
  customerStatus: {
    type: String,
    required: true,
  },
  customerNotes: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  totalDebt: {
    type: Number,
    default: 0,
  },
  paymentHistory: [
    {
      paymentAmount: { type: Number, required: true }, 
      paymentMethod: { type: String, required: true }, 
      createdAt: { type: Number, default: Date.now },
    },
  ],
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  authorizedPerson: authorizedPersonSchema,
})

const Customer = mongoose.model('Customer', customerSchema)
const authorizedPerson = mongoose.model('authorizedPerson',authorizedPersonSchema,)

module.exports = {
  Customer,
  authorizedPerson,
}
