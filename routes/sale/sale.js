const express = require('express')
const router = express.Router()
const {
  inputControllerMiddleware,
} = require('../../middleware/inputController')
const { upload } = require('../../helpers/multer')
const {
  setSaleInput,
  deleteSaleInput,
  getSaleInput,
  calculateProfitAndLossInput,
  getCustomerDebtInput,
  makePaymentInput,
  updateSaleInput,
} = require('../../controllers/Sale/types')
const {
  setSale,
  deleteSale,
  getSale,
  calculateProfitAndLoss,
  getCustomerDebt,
  makePayment,
  updateSale,
} = require('../../controllers/Sale/sale')

router
  .route('/setSale')
  .post(inputControllerMiddleware(setSaleInput, setSale, 'post', true))
router
  .route('/deleteSale')
  .post(inputControllerMiddleware(deleteSaleInput, deleteSale, 'post', true))
router
  .route('/getSale')
  .post(inputControllerMiddleware(getSaleInput, getSale, 'post', true))

router
  .route('/calculateProfitAndLoss')
  .post(inputControllerMiddleware(calculateProfitAndLossInput, calculateProfitAndLoss, 'post', true))

router
  .route('/getCustomerDebt')
  .post(inputControllerMiddleware(getCustomerDebtInput, getCustomerDebt, 'post', true))

router
  .route('/makePayment')
  .post(inputControllerMiddleware(makePaymentInput, makePayment, 'post', true))

router
  .route('/updateSale')
  .post(inputControllerMiddleware(updateSaleInput, updateSale, 'post', true))


module.exports = router
