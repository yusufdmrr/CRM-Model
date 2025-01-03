const { update } = require('lodash')
const mongoose = require('mongoose')
const { Schema } = mongoose

const AuthoritySchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Number, required: true },
  updateAt: { type: Number, required: true },
})

const Authority = mongoose.model('Authorities', AuthoritySchema)

module.exports = { Authority }
