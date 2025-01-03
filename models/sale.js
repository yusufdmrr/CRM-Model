const mongoose = require('mongoose')

const saleProductSchema = new mongoose.Schema({

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  
})

const saleSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  saleProducts: [saleProductSchema],
  description: { type: String, required: true },

  paymentPlan: {
    type: String,
    enum: [
      'Tek Seferde Ödeme',
      'İş Başlangıcı %40 / İş Bitiminde %60',
      'İş Başlangıcı %30 / İş Bitiminde %70',
    ],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: [
      'Ödeme Bekleniyor',
      'Kısmen Ödendi',
      'Tamamlandı',
      // 'Ödeme Alınamadı',
    ],
    required: true,
  },
  salePayment: {
    type: Number,
    required: false,  // salePayment alanını opsiyonel hale getirin
    default: 0,       // Eğer değer verilmezse varsayılan olarak 0 kullanın
  },
  additionalCostsDescription: { type: String },
  additionalCostsPrice: { type: Number, default: 0 },
  netPrice: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
})

const Sale = mongoose.model('Sale', saleSchema)

module.exports = { Sale }
