const { z, optional } = require('zod')

const setSaleInput = z.object({
  customerId: z.string(),
  saleProducts: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().positive(),
      salePrice: z.number().positive(),
      costPrice: z.number().positive(),
      totalPrice: z.number().positive(), 
    })
  ),
  paymentPlan: z.enum([
    'Tek Seferde Ödeme',
    'İş Başlangıcı %40 / İş Bitiminde %60',
    'İş Başlangıcı %30 / İş Bitiminde %70',
  ]),
  paymentStatus: z.enum([
    'Ödeme Bekleniyor',
    'Kısmen Ödendi',
    'Tamamlandı',
  ]), 
  additionalCostsDescription: z.string().optional(),
  additionalCostsPrice: z.number().nonnegative().optional(),
  description: z.string(),
  netPrice: z.number().positive(),
  salePayment: z.number().positive().optional(),
})

const getSaleInput = z.object({
  saleId: z.string().optional(),
})

const deleteSaleInput = z.object({
  saleId: z.string(),
})

const updateSaleInput = z.object({
  saleId: z.string().optional(),  
  customerId: z.string(),  
  saleProducts: z.array(
    z.object({
      productId: z.string(),  
      quantity: z.number().positive(),  
      salePrice: z.number().positive(),  
      costPrice: z.number().positive(),  
      totalPrice: z.number().positive(),  
    })
  ).optional(),
  paymentPlan: z.enum([ 
    'Tek Seferde Ödeme',
    'İş Başlangıcı %40 / İş Bitiminde %60',
    'İş Başlangıcı %30 / İş Bitiminde %70',
  ]).optional(),
  paymentStatus: z.enum([  
    'Ödeme Bekleniyor',
    'Kısmen Ödendi',
    'Tamamlandı',
    // 'Ödeme Alınamadı',
  ]).optional(),
  additionalCostsDescription: z.string().optional(),  
  additionalCostsPrice: z.number().nonnegative().optional(),  
  description: z.string().optional(),  
  netPrice: z.number().positive().optional(), 
  salePayment: z.number().positive().optional(),  
});

const calculateProfitAndLossInput = z.object({
  saleId: z.string().optional(),
})

const getCustomerDebtInput = z.object({
  customerId: z.string().optional(),
});

const makePaymentInput = z.object({
  customerId: z.string(),
  paymentAmount: z.number().positive(), 
  paymentMethod: z.string(),
});



module.exports = {
  setSaleInput,
  getSaleInput,
  deleteSaleInput,
  calculateProfitAndLossInput,
  getCustomerDebtInput,
  makePaymentInput,
  updateSaleInput
}
