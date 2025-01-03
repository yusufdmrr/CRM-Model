const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Number,
    default: Date.now, // Bildirim oluşturulma tarihi
  },
  isRead: {
    type: Boolean,
    default: false, // Bildirimin okunup okunmadığını belirtir
  },
  notifyAt: {
    type: Number, // Bildirimin gönderileceği tarih
    required: true,
  },
})

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = { Notification }
