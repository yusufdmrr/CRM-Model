const { z, optional } = require('zod')

const setProductInput = z.object({
  productName: z.string(),
  category: z.string(),
  // stock: z.number(),
  description: z.string(),
  unitPrice: z.number().positive(),
  currency: z.string(),
  taxRate: z.string(),
  taxIncluded: z.boolean(),
  paymentType: z.string(),
})

const getProductInput = z.object({
  productId: z.string().optional(),
})

const deleteProductInput = z.object({
  productId: z.string(),
})

const updateProductInput = z.object({
  productId: z.string(),
  productName: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  unitPrice: z.number().positive().optional(),
  currency: z.string().optional(),
  taxRate: z.string().optional(),
  taxIncluded: z.boolean().optional(),
  paymentType: z.string().optional(),
})

/////////////////////////////////////////////////////7

const setStockInput = z.object({
  productId: z.string(),
  quantity: z.number(),
  type: z.enum(['purchase', 'expense']),
})
const deleteStockInput = z.object({
  productId: z.string(),
  actionId: z.string(),
})
const getStockHistoryInput = z.object({
  productId: z.string(),
})

/////////////////////////////////////////////////////7

const setCategoryInput = z.object({
  name: z.string(),
})

const getCategoryInput = z.object({
  categoryId: z.string().optional(),
})

const deleteCategoryInput = z.object({
  categoryId: z.string(),
})

const setCurrencyInput = z.object({
  name: z.string(),
})

const getCurrencyInput = z.object({
  currencyId: z.string().optional(),
})

const deleteCurrencyInput = z.object({
  currencyId: z.string(),
})

const setTaxRateInput = z.object({
  name: z.string(),
  rate: z.number().positive(),
})

const getTaxRateInput = z.object({
  taxRateId: z.string().optional(),
})

const deleteTaxRateInput = z.object({
  taxRateId: z.string(),
})

const setPaymentTypeInput = z.object({
  name: z.string(),
})

const getPaymentTypeInput = z.object({
  paymentTypeId: z.string().optional(),
})

const deletePaymentTypeInput = z.object({
  paymentTypeId: z.string(),
})

module.exports = {
  setProductInput,
  getProductInput,
  deleteProductInput,
  updateProductInput,
  setCategoryInput,
  setCurrencyInput,
  setTaxRateInput,
  setPaymentTypeInput,
  getCategoryInput,
  getCurrencyInput,
  getTaxRateInput,
  getPaymentTypeInput,
  deleteCategoryInput,
  deleteCurrencyInput,
  deleteTaxRateInput,
  deletePaymentTypeInput,
  setStockInput,
  deleteStockInput,
  getStockHistoryInput,
}
